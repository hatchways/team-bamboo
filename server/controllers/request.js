const Request = require("../models/Request");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

// @route GET /requests/sitter
// @desc get requests for logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res) => {
  const { isSitter } = await Profile.findOne(
    { userId: req.user.id },
    "isSitter -_id"
  );
  const currentUserType = isSitter ? "sitter" : "owner";
  const otherUserType = isSitter ? "owner" : "sitter";
  const queryResults = await Request.find(
    {
      [currentUserType]: req.user.id,
    },
    `-${currentUserType}`
  )
    .populate(otherUserType)
    .sort("start")
    .exec();

  const requests = queryResults.map((r) => {
    const request = r.toJSON();
    request.otherUser = request[otherUserType];
    delete request[otherUserType];
    return request;
  });

  res.status(200).json({
    success: { requests },
  });
});

// @route POST /requests
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res) => {
  const { sitter, start, end } = req.body;

  const propertyIsMissing = !sitter || !start || !end;

  if (propertyIsMissing || !Types.ObjectId.isValid(sitter)) {
    res.status(400);
    throw new Error("Bad request");
  }

  const request = await Request.create({
    owner: req.user.id,
    sitter,
    start: start,
    end: end,
    status: "pending",
  });

  if (!request) {
    res.status(500);
    throw new Error("Internal server error");
  }

  res.status(201).json({
    success: { request },
  });
});

// @route PATCH /requests/
// @desc Update request status
// @access Private
exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["declined", "accepted"];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Bad request");
  }

  const { requestId } = req.params;
  const request = await Request.findById(requestId);

  if (!Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Bad request");
  }

  if (!request) {
    throw new Error("Bad request");
  }

  const { sitter } = request;
  if (req.user.id !== sitter.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  request.status = status;
  const updatedRequest = await request.save();

  res.status(200).json({
    success: { request: updatedRequest },
  });
});

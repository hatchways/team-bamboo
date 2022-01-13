const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /requests
// @desc get requests for logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    sitterId: req.user.id,
  });

  res.status(200).json({
    success: { requests },
  });
});

// @route POST /requests
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res) => {
  const { sitterId, start, end } = req.body;
  const request = await Request.create({
    userId: req.user.id,
    sitterId,
    start: start,
    end: end,
    status: "pending",
  });

  if (!request) {
    res.status(400);
    throw new Error("Bad request");
  }

  res.status(201).json({
    success: { request },
  });
});

// @route PUT /requests/
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

  if (!request) {
    throw new Error("Bad request");
  }

  const { sitterId } = request;
  if (req.user.id !== sitterId.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  request.status = status;
  const updatedRequest = await request.save();

  res.status(200).json({
    success: { request: updatedRequest },
  });
});

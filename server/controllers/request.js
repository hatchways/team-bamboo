const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /requests/sitter
// @desc get requests for logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res) => {
  const { isSitter } = req.query ?? "false";
  if (!["true", "false"].includes(isSitter ?? "false")) {
    res.status(400);
    throw new Error("Bad Request");
  }

  const selectedUserType = isSitter === "true" ? "sitter" : "owner";
  const requests = await Request.find({
    [selectedUserType]: req.user.id,
  })
    .populate("sitter")
    .populate("owner")
    .sort("start")
    .exec();

  res.status(200).json({
    success: { requests },
  });
});

// @route POST /requests
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res) => {
  const { sitter, start, end } = req.body;

  const request = await Request.create({
    owner: req.user.id,
    sitter,
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

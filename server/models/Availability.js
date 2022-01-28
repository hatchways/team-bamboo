const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  availableTime: [
    {
      day: {
        type: Date,
        required: true
      },
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true,
        validate: {
          validator: function (endTime) {
            return endTime > this.start;
          }
        }
      }
    }
  ]
});

availabilitySchema.virtual("weekDay").get(function () {
  return this.availableTime.map((item) => {
    const preFormat = new Date(item.day);
    const formattedDay = preFormat.toLocaleString(navigator.language, {
      weekday: "short"
    });
    return formattedDay;
  });
});

availabilitySchema.virtual("startTime").get(function () {
  this.availabil;
  const preFormat = new Date(parseInt(this.availableTime.start));
  return preFormat.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
});

availabilitySchema.virtual("endTime").get(function () {
  const preFormat = new Date(parseInt(this.availableTime.end));
  return preFormat.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
});

module.exports = Avalability = mongoose.model(
  "Availability",
  availabilitySchema
);

const Availability = require("./models/Availability");
const colors = require("colors");
const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://sunmengyue:709098807s@cluster0.uo5qv.mongodb.net/dogsitter?retryWrites=true&w=majority"
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

connectDB();
run();

async function run() {
  try {
    const availability = await Availability.create({
      sitterId: "61ec895c1a354a286acc58b7",
      availableTime: [
        {
          day: new Date(),
          start: new Date(
            "Fri Jan 28 2022 12:00:24 GMT-0500 (Eastern Standard Time)"
          ),
          end: new Date()
        }
      ]
    });

    console.log(availability.availableTime[0]["weekDay"]);
  } catch (e) {
    console.log(e.message);
  }
}

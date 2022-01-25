require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;

const s3 = new AWS.S3({
  accessKey,
  secretKey,
  region,
});

// upload files to s3
exports.uploadImages = (files) => {
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    const fileStream = fs.createReadStream(files[i].path);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: files[i].filename,
    };
    const uploadPromise = s3
      .upload(uploadParams, (error, data) => {
        if (error) {
          console.error(error);
        }
        console.log(`File uploaded successfully at ${data.Location}`);
        resolve(data.Location);
      })
      .promise();
    uploadPromises.push(uploadPromise);
  }
  return uploadPromises;
};

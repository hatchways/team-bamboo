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
  region
});

const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    ContentType: file.mimetype,
    Key: file.filename
  };
  return s3.upload(uploadParams).promise();
};

const deleteFile = (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  return s3.deleteObject(deleteParams).promise();
};

const uploadImages = (files) => {
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    uploadPromises.push(uploadFileToS3(files[i]));
  }
  return uploadPromises;
};

module.exports = { uploadFileToS3, uploadImages, deleteFile };

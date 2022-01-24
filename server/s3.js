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

// upload one file to S3
const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  };
  return s3
    .upload(uploadParams, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log(`File uploaded successfully at ${data.Location}`);
      resolve(data.Location);
    })
    .promise();
};

// delete a file from s3
const deleteFile = (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  return s3.deleteObject(deleteParams).promise();
};

// upload files to s3
const uploadImages = (files) => {
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    uploadPromises.push(uploadFileToS3(files[i]));
  }
  return uploadPromises;
};

// download a file from s3
const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  return s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFileToS3, uploadImages, getFileStream, deleteFile };

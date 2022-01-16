require('dotenv').config();
const AWS = require("aws-sdk");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME; 
const secretKey =  process.env.AWS_SECRET_KEY;
const region = process.env.AWS_BUCKET_REGION; 
const accessKey = process.env.AWS_ACCESS_KEY; 

const s3 = new AWS.S3({
  accessKey, 
  secretKey,
  region
});

exports.uploadImages = (files) => {
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    const fileStream = fs.createReadStream(files[i].path);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: files[i].filename,
    };
    const uploadPromise = s3.upload(uploadParams, (error, data) => {
      if (error) {
        console.error(error);
      };
      console.log(`File uploaded successfully at ${data.Location}`);
      resolve(data.Location);
    }).promise();
    uploadPromises.push(uploadPromise);
  }
  return uploadPromises;
};

// exports.uploadImage = (file) => {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.filename
//   };
//   return s3.upload(uploadParams).promise();
// };




// download files from s3
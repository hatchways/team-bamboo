exports.uploadImages = (files) => {
  s3.createBucket(() => {
    const ResponseData = [];

    files.map(file => {
      const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: file.originalname,
        ACL: 'public-read'
      };

      s3.upload(uploadParams, (err, data) => {
        if (err) {
         res.json({ "error": true, "Message": err});
        } else {
          ResponseData.push(data);
          if(ResponseData.length == files.length){
            res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData});
          }
        }
       });
    });
  });
};

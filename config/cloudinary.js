const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadOnCloudinary =  (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload failed:", err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = {cloudinary , fileUploadOnCloudinary};

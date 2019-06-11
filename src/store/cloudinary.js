import cloudinary from "cloudinary-core";

var cl = new cloudinary.Cloudinary({ cloud_name: "viroidgames", secure: false });
cl.window.cl = cl;
window.cloudinary = cloudinary;
export default {
  state: {}
};

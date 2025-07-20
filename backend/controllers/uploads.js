//const cloudinary = require('../utils/cloudinary');
const User = require('../models/UserModel');
const cloudinary = require("cloudinary").v2;
// exports.uploadProfilePic = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const userId = req.body.userId;
//     await User.findByIdAndUpdate(userId, {
//       profilePicUrl: result.secure_url,
//     });
//     res.status(200).json({ imageUrl: result.secure_url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// };
exports.uploadProfilePic = async (req, res) => {
  try {
    const file = req.file;
   // const userId = req.body.userId;
   const userId = req.user._id;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    //const imageUrl = `http://localhost:5000/uploads/${file.filename}`;
  // const imageUrl = `https://expense-tracker-yurd.onrender.com/uploads/${file.filename}`;
  const imageUpload = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    
  //   // ✅ Save imageUrl to DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicUrl: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const uploadURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const uploadImageOnCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(uploadURL, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default uploadImageOnCloudinary;

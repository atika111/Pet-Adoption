import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function UploadImage({ setAvatarImage }) {
  const [avatarImageUrl, setAvatarImageUrl] = useState(null);

  const defaultImageUrl =
    "https://res.cloudinary.com/dwiiz8ilo/image/upload/t_rounded_image/cld-sample.jpg";
  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const handleAvatarUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      setAvatarImage(defaultImageUrl);
    }
    console.log("selectedImage: ", selectedImage);
    setAvatarImageUrl(URL.createObjectURL(selectedImage));
    setAvatarImage(selectedImage);
  };

  return (
    <div>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          bgcolor: "deepOrange[500]",
          margin: "auto",
          cursor: "pointer",
        }}
        alt="User"
        src={avatarImageUrl}
        onClick={handleAvatarClick}
      />

      <input
        type="file"
        id="avatar-upload"
        name="avatarImage"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleAvatarUpload}
      />
    </div>
  );
}

export default UploadImage;

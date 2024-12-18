import { useState } from "react";

interface UploadImgProps {
  userId: string;
  apiUrl: string;
  token: string | null;
  onSuccess: (url: string) => void;
  onError: (error: string) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({
  apiUrl,
  token,
  onSuccess,
  onError,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!selectedImage) {
        reject("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("profile", selectedImage); // 'profile' as per the API requirements

      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            reject("Failed to upload image");
            return;
          }
          return response.json();
        })
        .then((data) => {
          resolve();
          onSuccess(data.imageUrl); 
        })
        .catch((error) => {
          reject(error.message || "An error occurred");
        });
    });
  };

  return (
    <div>
      <label htmlFor="uploadImg">Upload Image:</label>
      <input
        id="uploadImg"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
      <button
        type="button"
        onClick={() => {
          handleUpload()
            .then(() => {
              console.log("Upload successful");
            })
            .catch((error) => {
              onError(error);
            });
        }}
        disabled={!selectedImage}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadImg;

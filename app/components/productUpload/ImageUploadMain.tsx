"use client";
import api from "@/libs/api";
import { useState } from "react";

const ImageUploadMain = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPrview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPrview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', file)

    api.post(`/api/product/image/upload/${}`)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="w-10 h-10 border rounded-xl"
          type="file"
        />
        {preview && <img src={preview} alt="preview image" width={200} />}
        <button>Upload Product Image</button>
      </form>
    </div>
  );
};

export default ImageUploadMain;

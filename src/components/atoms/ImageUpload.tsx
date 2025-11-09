// src/components/atoms/ImageUpload.tsx
import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";

type Props = {
  onUploadComplete?: (url: string | null) => void;
  accept?: string;
  buttonLabel?: string;
  maxSizeMB?: number;
};

export const ImageUpload: React.FC<Props> = ({
  onUploadComplete,
  accept = "image/*",
  buttonLabel = "Upload",
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPreview(null);
      setUploadedUrl(null);
      onUploadComplete?.(null);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File too large. Max ${maxSizeMB} MB`);
      e.currentTarget.value = ""; 
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary not configured (VITE_CLOUDINARY_* env vars missing)");
      }

      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);

      const res = await fetch(endpoint, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed: " + res.statusText);
      const json = await res.json();
      const secureUrl: string | undefined = json.secure_url;
      if (!secureUrl) throw new Error("No secure_url returned");
      setUploadedUrl(secureUrl);
      onUploadComplete?.(secureUrl);
      return secureUrl;
    } catch (err) {
        if(err instanceof Error){
            alert(err)
        }
      onUploadComplete?.(null);
      return null;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-sm font-medium">Product Image</label>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
          disabled={uploading}
        >
          <Upload className="w-5 h-5" />
          <span className="text-sm">{uploading ? "Uploading..." : buttonLabel}</span>
        </button>

        {preview ? (
          <div className="flex items-center gap-3">
            <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded border" />
            <div className="text-xs">

              {uploadedUrl ? (
                <p className="text-green-600">Uploaded</p>
              ) : (
                <p className="text-gray-500">Preview (not uploaded)</p>
              )}

              {uploadedUrl && (
                <a className="text-blue-600 break-all" href={uploadedUrl} target="_blank" rel="noreferrer">
                  View
                </a>
              )}
            </div>
          </div>
        ) : (
          <span className="text-xs text-gray-500">No photo selected</span>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

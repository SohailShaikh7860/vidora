"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ShowToast } from '@/components/toast';


const page = () => {
   
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const handleSubmit = async (event: React.FormEvent)=>{
       event.preventDefault();

       if(!file){
          ShowToast("Please select a file", "error");
          return;
       }

       if(file.size > MAX_FILE_SIZE){
          ShowToast("File size exceeds 100MB limit", "error");
          return;
       }

       setIsUploading(true);

        try {
         const signatureResponse = await axios.post('/api/cloudinary-signature');
         const { signature, timestamp, cloudName, apiKey, folder, transformation } = signatureResponse.data;

         const formData = new FormData();
         formData.append("file", file);
         formData.append("signature", signature);
         formData.append("timestamp", timestamp.toString());
         formData.append("api_key", apiKey);
         formData.append("folder", folder);
         formData.append("transformation", transformation);

         const cloudinaryResponse = await axios.post(
           `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
           formData
         );

         const videoData = {
           title,
           description,
           publicId: cloudinaryResponse.data.public_id,
           originalSize: file.size.toString(),
           compressedSize: cloudinaryResponse.data.bytes.toString(),
           duration: (cloudinaryResponse.data.duration || 0).toString(),
         };

         const res = await axios.post('/api/video-upload', videoData, {
           headers: { 'Content-Type': 'application/json' }
         });

          if(res.status === 200){
             ShowToast("Video uploaded successfully", "success");
             router.push('/home');
          }else{
              ShowToast("Video upload failed", "error");
          }

        } catch (error) {
          const errorMessage = axios.isAxiosError(error) && error.response?.data?.error 
              ? error.response.data.error 
              : 'Failed to upload video. Please try again.';
          ShowToast(errorMessage, "error");
        }finally{
          setIsUploading(false);
        }
}

  return (
     <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              Upload Video
            </h1>
            <p className="text-sm sm:text-base text-base-content/70">Share your content with Vidora</p>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto sm:btn-wide text-base sm:text-lg"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Uploading...
                </>
              ) : (
                "Upload Video"
              )}
            </button>
          </form>
          </div>
          </div>
        </div>
  )
}

export default page

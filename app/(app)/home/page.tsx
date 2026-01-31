"use client"
import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios'
import VideoCard from '@/components/videoCard'
import {Video} from '@/types/index'
const HomePage = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [generatingSubtitlesId, setGeneratingSubtitlesId] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
      try {
       const response = await axios.get(('/api/video'));
       if(Array.isArray(response.data)){
          setVideos(response.data);
       }else{
          throw new Error("Unexpected response format");
       }
      } catch (error) {
         console.log(error);
         setError(error instanceof Error ? error.message : String(error));
      } finally {
         setLoading(false);
      }
  },[])
  
  useEffect(()=>{
     fetchVideos();
  },[fetchVideos])

   const handleDownload = useCallback(async (url: string, title: string, subtitles?: string | null) => {
        console.log('📥 Download clicked - Opening video in new tab + downloading subtitles');
        
        try {
            window.open(url, '_blank');
            
            if (subtitles) {
               
                setTimeout(async () => {
                    try {
                        if (subtitles.startsWith('http')) {
                            
                            const subResponse = await fetch(subtitles);
                            const subBlob = await subResponse.blob();
                            const subBlobUrl = window.URL.createObjectURL(subBlob);
                            
                            const link = document.createElement("a");
                            link.href = subBlobUrl;
                            link.download = `${title}-subtitles.vtt`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(subBlobUrl);
                           
                        } else {
                            
                            const blob = new Blob([subtitles], { type: 'text/vtt' });
                            const blobUrl = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = `${title}-subtitles.vtt`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(blobUrl);
                        
                        }
                    } catch (err) {
                        console.error('❌ Subtitle download error:', err);
                    }
                }, 500);
            }
        } catch (error) {
            console.error('❌ Error:', error);
        }
    }, [])

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm('Are you sure you want to delete this video?')) {
            return;
        }

        setDeletingId(id);

        try {
            const response = await axios.delete(`/api/video-delete?id=${id}`);
            
            if (response.data.success) {
                setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
                alert('Video deleted successfully!');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete video. Please try again.');
        } finally {
            setDeletingId(null);
        }
    }, [])

    const handleGenerateSubtitles = useCallback(async (videoId: string, publicId: string) => {
        if (!confirm('Generate subtitles for this video? This may take a few minutes.')) {
            return;
        }

        setGeneratingSubtitlesId(videoId);

        try {
            const response = await axios.post('/api/subtitle-generator', {
                videoId,
                publicId
            });

            if (response.data.success) {
                
                setVideos(prevVideos => 
                    prevVideos.map(video => 
                        video.id === videoId 
                            ? { ...video, hasSubtitles: true, subtitles: response.data.subtitles }
                            : video
                    )
                );

                alert('Subtitles generated successfully!');
            }
        } catch (error) {
            console.error('Subtitle generation error:', error);
            alert('Failed to generate subtitles. Please try again.');
        } finally {
            setGeneratingSubtitlesId(null);
        }
    }, [])

    if(loading){
        return <div>Loading...</div>
    }
  return (
     <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        publicId={video.publicId}
                        video={video}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                        onGenerateSubtitles={handleGenerateSubtitles}
                        isDeleting={deletingId === video.id}
                        isGeneratingSubtitles={generatingSubtitlesId === video.id}
                    />
                ))
              }
            </div>
          )}
        </div>
  )
}

export default HomePage

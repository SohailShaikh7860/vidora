import React,{ useState, useEffect, useCallback} from 'react'
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary'
import {Download, Clock, FileUp, FileDown, Trash2, Subtitles, Play} from 'lucide-react'
import dayjs from 'dayjs'
import realtivetime from 'dayjs/plugin/relativeTime'
import {filesize} from 'filesize'
import { Video } from '@/types'
import VideoPlayer from './VideoPlayer'

dayjs.extend(realtivetime)

interface VideoCardProps {
    publicId: string
    video: Video;
    onDownload: (url: string, title: string, subtitles?: string | null) => void;
    onDelete: (id: string) => void;
    onGenerateSubtitles: (videoId: string, publicId: string) => void;
    isDeleting?: boolean;
    isGeneratingSubtitles?: boolean;
}


const videoCard : React.FC<VideoCardProps> = ({video, onDownload, onDelete, onGenerateSubtitles, isDeleting = false, isGeneratingSubtitles = false})  => {
   
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const getThumbnailUrl = useCallback((publicId: string) =>{
          return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: 'fill',
            gravity: 'auto',
            format: "jpg",
            quality: "auto",
            assetType: 'video'
          })
    },[])

    const getFullVideoUrl = useCallback((publicId: string, filename?: string) =>{
          return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
          })
    },[])

    const getPreviewUrl = useCallback((publicId: string) =>{
         return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
        })
    },[])

    const formatSize = useCallback((size: number)=>{
         return filesize(size)
    },[])

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
      }, []);

      const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.OriginalSize)) * 100
      );

      useEffect(() => {
        setPreviewError(false);
      }, [isHovered]);

      const handlePreviewError = () => {
        setPreviewError(true);
      };

  return (
      <>
      <div
          className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <figure className="aspect-video relative">
            {isHovered ? (
              previewError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-sm text-red-500">Preview not available</p>
                </div>
              ) : (
                <video
                  src={getPreviewUrl(video.publicId)}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                  onError={handlePreviewError}
                />
              )
            ) : (
              <img
                src={getThumbnailUrl(video.publicId)}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-80 backdrop-blur-sm px-2 py-1 rounded-lg text-sm flex items-center">
              <Clock size={16} className="mr-1" />
              {formatDuration(Number(video.duration))}
            </div>
          </figure>
          <div className="card-body p-4 flex-1 flex flex-col">
            <h2 className="card-title text-base lg:text-lg font-bold line-clamp-2 mb-2">{video.title}</h2>
            <p className="text-sm text-base-content opacity-70 mb-2 line-clamp-2">
              {video.description}
            </p>
            <p className="text-xs text-base-content opacity-60 mb-3">
              Uploaded {dayjs(video.createdAt).fromNow()}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3 pb-3 border-b border-base-300">
              <div className="flex items-center gap-2">
                <FileUp size={18} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-xs opacity-70">Original</div>
                  <div className="font-medium text-xs">{formatSize(Number(video.OriginalSize))}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileDown size={18} className="text-secondary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-xs opacity-70">Compressed</div>
                  <div className="font-medium text-xs">{formatSize(Number(video.compressedSize))}</div>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold">
                  Compression:{" "}
                  <span className="text-accent text-sm">{compressionPercentage}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                {video.hasSubtitles && (
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setShowVideoModal(true)}
                    title="Watch with subtitles"
                  >
                    <Play size={16} />
                  </button>
                )}
                <button
                  className="btn btn-primary btn-sm flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDownload(getFullVideoUrl(video.publicId, video.title), video.title, video.subtitles);
                  }}
                  disabled={isDeleting || isGeneratingSubtitles}
                  title={video.hasSubtitles ? "Open video + download subtitles" : "Open video"}
                >
                  <Download size={16} />
                  {video.hasSubtitles && <span className="text-xs ml-1">+Sub</span>}
                </button>
                {!video.hasSubtitles && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onGenerateSubtitles(video.id, video.publicId)}
                  disabled={isDeleting || isGeneratingSubtitles}
                  title="Generate subtitles"
                >
                  {isGeneratingSubtitles ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Subtitles size={16} />
                  )}
                </button>
                )}
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete(video.id)}
                  disabled={isDeleting || isGeneratingSubtitles}
                  title="Delete video"
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showVideoModal && (
          <div className="modal modal-open" onClick={() => setShowVideoModal(false)}>
            <div className="modal-box w-11/12 max-w-4xl p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-lg lg:text-xl mb-4 line-clamp-1">{video.title}</h3>
              <VideoPlayer
                publicId={video.publicId}
                title={video.title}
                subtitleUrl={video.subtitles}
                autoPlay={true}
              />
              <div className="modal-action mt-4">
                <button className="btn btn-md" onClick={() => setShowVideoModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
  )
}

export default videoCard

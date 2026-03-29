import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imageSrc, setImageSrc] = useState(props.image);

  useEffect(() => {
    setImageSrc(props.image);
  }, [props.image]);

  useEffect(() => {
    return () => {
      if (video) {
        URL.revokeObjectURL(video);
      }
    };
  }, [video]);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      if (video) {
        URL.revokeObjectURL(video);
      }
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noreferrer"
        data-cursor={"disable"}
      >
        <div className="work-image-frame" aria-hidden="true" />
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <div className="work-image-media">
          <img
            src={imageSrc}
            alt={props.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageSrc("/images/placeholder.webp")}
          />
        </div>
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;

import { ImageType } from "../App/App";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

type Props = {
  images: ImageType[];
  onImageClick: (url: string) => void;
};

const ImageGallery = ({ images, onImageClick }: Props) => {
  return (
    <ul className={styles.gallery}>
      {images.map((item) => (
        <li key={item.id} onClick={() => onImageClick(item.urls.regular)}>
          <ImageCard image={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

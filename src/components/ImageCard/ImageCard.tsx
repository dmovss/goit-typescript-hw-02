import { ImageType } from "../App/App";
import styles from "./ImageCard.module.css";

type Props = {
  image: ImageType;
};

const ImageCard = ({ image }: Props) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash image"}
      />
      <h2 className={styles.text}>{image.user.name}</h2>
    </div>
  );
};

export default ImageCard;

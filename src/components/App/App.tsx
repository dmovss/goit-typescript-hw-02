import { useEffect, useState } from "react";
import styles from "./App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../services/api";

export type ImageType = {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
};

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [query, setQuery] = useState<string>("Cat");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async () => {
      setError(false);
      try {
        setLoading(true);
        const data = await fetchImages<{ results: ImageType[] }>(
          query,
          page,
          abortController.signal
        );
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (err: any) {
        if (err.name === "CanceledError") {
          return;
        }
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
    return () => abortController.abort();
  }, [query, page]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSubmit} />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader loading={loading} />}
      {images.length > 0 && !error && (
        <LoadMoreBtn page={page} setPage={setPage} />
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}

export default App;

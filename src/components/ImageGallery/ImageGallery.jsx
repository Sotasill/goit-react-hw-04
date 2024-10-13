import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.galleryList}>
        {images.map((image) => (
          <li key={image.id} className={css.galleryItem}>
            <ImageCard
              urls={image.urls}
              altDescription={image.alt_description}
              onModalOpen={onModalOpen}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, currentIndex, onModalOpen }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.galleryList}>
        {images.map((image, index) => (
          <li key={image.id} className={css.galleryItem}>
            <ImageCard
              urls={image.urls}
              altDescription={image.alt_description}
              onModalOpen={onModalOpen}
              isActive={index === currentIndex}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

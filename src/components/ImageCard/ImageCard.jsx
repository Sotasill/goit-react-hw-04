import css from "./ImageCard.module.css";

function ImageCard({ urls: { small, regular }, altDescription, onModalOpen }) {
  return (
    <li className={css.imageItem}>
      <div className={css.imageWrapper}>
        <img
          src={small}
          alt={altDescription}
          className={css.image}
          onClick={() => onModalOpen(regular, altDescription)}
        />
      </div>
    </li>
  );
}

export default ImageCard;

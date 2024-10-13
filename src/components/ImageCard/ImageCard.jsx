import css from "./ImageCard.module.css";

function ImageCard({ urls: { small, regular }, altDescription, onModalOpen }) {
  return (
    <li className={css.imageItem}>
      <div
        className={css.imageWrapper}
        onClick={() => onModalOpen(regular, altDescription)}
      >
        <img src={small} alt={altDescription} className={css.image} />
      </div>
    </li>
  );
}

export default ImageCard;

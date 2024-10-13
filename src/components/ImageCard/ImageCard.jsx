import css from "./ImageCard.module.css";

function ImageCard({ urls: { small, regular }, altDescription, onModalOpen }) {
    return (
      <ul className={css.imageList}>
        <li className={css.imageItem}>
          <div className={css.imageWrapper} onClick={onModalOpen}>
            <img
              src={small}
              alt={altDescription}
              className={css.image}
              onClick={() => onModalOpen(regular, altDescription)}
            />
          </div>
        </li>
      </ul>
    );
}

export default ImageCard;

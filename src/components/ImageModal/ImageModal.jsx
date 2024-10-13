import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalImage,
  modalAlt,
  modalAuthor,
  modalDescription,
  modalRating,
  
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={{
        base: css.backdrop,
        afterOpen: css.backdropOpen,
        beforeClose: css.backdropClose,
      }}
      closeTimeoutMS={600}
    >
      <img src={modalImage} alt={modalAlt} className={css.image} />
      <div className={css.info}>
        <h3>Author: {modalAuthor}</h3>
        <p>Description: {modalDescription}</p>
        <p>Rating: {modalRating}</p>
        <button className={css.closeButton} onClick={closeModal}>
          Dissmiss
        </button>
       
      </div>
    </Modal>
  );
}



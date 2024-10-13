import css from './ImageModal.module.css'

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalImage,
  modalAlt,
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
      bodyOpenClassName={css.body}
      closeTimeoutMS={500}
    >
      <img src={modalImage} alt={modalAlt} className={css.image} />;
    </Modal>
  );
}
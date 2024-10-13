import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ loadMoreImages }) {
  return (
    <button className={css.button} onClick={loadMoreImages}>
     
      Load more
    </button>
  );
}

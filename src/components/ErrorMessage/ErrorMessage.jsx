import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ errorMessage }) {
  return <p className={css.message}>{errorMessage}</p>;
}

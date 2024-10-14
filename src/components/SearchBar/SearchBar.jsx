import toast from "react-hot-toast";
import css from "./SearchBar.module.css";


export default function SearchBar({ reset, setQuery, inputRef }) {
  function submitHandler(e) {
    e.preventDefault();
    const query = e.target.elements.input.value.trim();
    if (!query) {
      toast.error("Please enter your search", { position: "top-right" });
    } else {
      reset();
      setQuery(query);
      e.target.reset();
    }
  }

  return (
    <div className={css.wrapper}>
      <form onSubmit={submitHandler} className={css.form}>
        <input
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter to Search Images"
          className={css.input}
          ref={inputRef}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
}

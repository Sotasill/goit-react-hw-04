import css from "./Loader.module.css";
import { Audio } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

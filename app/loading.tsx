import css from "./Loader.module.css";
import { PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.loader}>
      <PulseLoader color="#dc3545" />
    </div>
  );
}

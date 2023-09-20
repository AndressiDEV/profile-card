import clsx from "clsx";
import styles from "./Chip.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Chip(props) {

  const handleRemoveChip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //execute fn from parent component
    props.onRemoveChip(e);
  };

  return (
    <div
      className={clsx(styles.chip)}
      //also avoid focusing on the input when having righClick event
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <span>{props.data}</span>
      {/* disable tab event on button */}
      <button onClick={handleRemoveChip} tabIndex={-1}>
        <FontAwesomeIcon icon={faXmark} size="2xs" />
      </button>
    </div>
  );
}

export default Chip;

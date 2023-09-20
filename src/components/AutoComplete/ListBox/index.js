import clsx from "clsx";
import styles from "./ListBox.module.scss";
function ListBox(props) {
  const { listOptions, getOptionLabel, onSelectOption, width} = props;
  return (
    <div
      //The 'width' prop is required
      style={{ width: width }}
      className={clsx(styles.wrapper)}
      //To stop blur on the input tag
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <ul>
        {listOptions.length !== 0 ? (
          listOptions.map((opt) => {
            return (
              <li
                key={opt.id}
                onClick={(e) => {
                  onSelectOption(e, opt);
                }}
              >
                {getOptionLabel(opt)}
              </li>
            );
          })
        ) : (
          <li className={clsx(styles.emptyList)}>No data</li>
        )}
      </ul>
    </div>
  );
}

export default ListBox;

import { useState } from 'react';
import clsx from 'clsx';
import styles from './StandardInput.module.scss';
function StandardInput({props}) {
    const {label, focused, value, inputProps} = props;
  const [focus, setFocus] = useState(focused);
  const [filled, setFilled] = useState(focused);
  const handleFocusInput = () => {
    setFocus(true);
    setFilled(true);
  };
  const handleBlurInput = () => {
    if (value.length === 0) {
        setFilled(false);
    }
    setFocus(false);
  };
  return (
    <div className={styles.textFieldGroup}>
      <div
        className={styles.textFieldControl}
        onFocus={focused ? null : handleFocusInput}
        onBlur={focused ? null : handleBlurInput}
      >
        <label
          className={clsx(
            styles.textFieldLabel,
            { [styles.filled]: filled },
            { [styles.focus]: focus }
          )}
        >
          {label}
        </label>
        <div
          className={clsx(
            styles.standardInput,
            { [styles.focus]: focus },
            { [styles.filled]: filled }
          )}
        >
          <input value={value} text="input" onChange={props.onChange} maxLength={inputProps ?inputProps.maxLength : 12} />
        </div>
      </div>
    </div>
  );
}
export default StandardInput;
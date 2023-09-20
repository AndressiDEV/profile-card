import React, { useRef } from "react";
//using Tippy to show/hide a listbox
import Tippy from "@tippyjs/react/headless";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AutoComplete.module.scss";
import ListBox from "./ListBox";
import { useState } from "react";
import Chip from "./Chip";
function AutoComplete(props) {
  const {
    label = "FilterOptions",
    getOptionLabel,
    placeholder = "",
    options,
  } = props;
  //To check whether the input is focused or not
  const [isFocus, setIsFocus] = useState(false);
  //To show/hide a listbox
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState("");//keywords for filtering
  const [list_selected_options, setList_selected_options] = useState([]);  //The list contains selected options
  //Add a (key,value) pair to initial list of options for handling some cases
  //Using "useRef" hook to declare a variable as global state
  const list_options = useRef(
    options.map((option) => ({ ...option, selected: false }))
  );
  //The list contains filtered options when searching(by keyword) or picking an option,... 
  //The initial value is a list  
  const [list_filtered_options, setList_filtered_options] = useState(
    list_options.current || []
  );
  //Using 'useRef' hook to focus the 'input' element
  const inputRef = useRef();
  //This ref is used to get width of form 
  const formControl_Ref = useRef();


  //'onMouseDown' event
  //This always focuses on the input tag when having any 'mousedown' event on form 
  const handleMouseDownForm = (e) => {
    e.preventDefault();//To stop blur/focus event 
    inputRef.current.focus();
    //Only can show/hide the listbox in case of not having any keyword search
    if (keyword === "") {
      setIsShow((prev) => !prev);
    }
  };

  const handleFocusInput = (e) => {
    e.stopPropagation();//To prevent the function from the double execution when focus method is fired  
    setIsFocus(true);
  };

  //The behaviour of this function can be reused for case: blur or user types on the input
  //Only one diff is whenever user enter data, then the listbox always opens. Otherwise is not
  const handleChangeInput = (keyword_search, shouldOpenPopup = true) => {
    //filter unselected options
    const filtered_list = list_options.current.filter(
      (option) =>
        !option.selected &&
        getOptionLabel(option).toLowerCase().indexOf(keyword_search.toLowerCase()) !== -1
    );
    //for entering data 
    if (shouldOpenPopup) {
      setIsShow(true);
    }
    setKeyword(keyword_search);
    setList_filtered_options(filtered_list);
  };
  
  //handle blur the input
  const handleBlurInput = () => {
    setIsFocus(false);
    setIsShow(false);
    handleChangeInput("", false);//set keyword with empty
  };

  //onClick 'popup/close' button
  const handleClickOpenPopup = (e) => {
    e.preventDefault();//optional?
    e.stopPropagation();//To stop bubble up click event
    //always focus on the input when this event fired
    inputRef.current.focus();
    setIsShow((prev) => !prev);
  };

  //onClick event
  //The input will be focused when clear all selected options
  const handleClearIndicator = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current.focus();
    list_options.current.forEach((option) => (option.selected = false));
    setList_filtered_options(list_options.current);//update list to initial list
    setList_selected_options([]);//update to empty array
    setKeyword("");//update to empty keyword 
  };


  //onClick event
  //To select an option from listbox, then state of option will be updated to selected {..., selected:true} 
  //After picking => listbox closed => keyword = ""
  const handleSelectOption = (e, option) => {
    setList_selected_options((prev) => [...prev, option]);
    const index = list_options.current.findIndex((opt) => option.id === opt.id);
    list_options.current[index].selected = true;
    const filtered_list = list_options.current.filter((opt) => !opt.selected);
    setList_filtered_options(filtered_list);
    setKeyword("");
    setIsShow(false);
  };

  //onClick event on an selected option('delete' butt on chip)
  //delete the option from selected list => update 'selected' state of option to false => keyword = ""
  const handleRemoveOption = (e, option, index) => {
    const find_index = list_options.current.findIndex(
      (opt) => opt.id === option.id
    );
    list_selected_options.splice(index, 1);
    list_options.current[find_index].selected = false;
    const filtered_options = list_options.current.filter(
      (opt) => !opt.selected
    );
    setList_filtered_options(filtered_options);
    setList_selected_options([...list_selected_options]);
    setKeyword("");
  };

  return (
    <div className={clsx(styles.root, props.className)} ref={formControl_Ref}>
      <Tippy
        visible={isShow} //render two times when visible true
        interactive={true}
        placement="bottom-start"
        offset={[0, 1]}
        render={(attrs) => {
          return (
            <ListBox
              // to set width of listbox equal to width of form 
              width={formControl_Ref.current.getBoundingClientRect().width}
              {...attrs}
              getOptionLabel={getOptionLabel}
              onSelectOption={handleSelectOption}
              listOptions={list_filtered_options}
              tabIndex="-1"
            />
          );
        }}
      >
        <div
          className={clsx(
            styles.FormControl,
            { [styles.focus]: isFocus },
            { [styles.filledInput]: list_selected_options.length > 0 }
          )}
          onMouseDown={handleMouseDownForm}
        >
          <label
            className={clsx({
              [styles.focusedLabel]:
                isFocus || list_selected_options.length > 0,
            })}
          >
            {label}
          </label>
          <div className={clsx(styles.textFieldGroup)}>
            {list_selected_options &&
              list_selected_options.map((option, index) => {
                return (
                  <Chip
                    onRemoveChip={(e) => handleRemoveOption(e, option, index)}
                    key={index}
                    data={getOptionLabel(option)}
                  />
                );
              })}
            <input
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
              onChange={(e) => handleChangeInput(e.target.value)}
              ref={inputRef}
              value={keyword}
              className={clsx(styles.textField_Input)}
              placeholder={
                isFocus || list_selected_options.length > 0
                  ? placeholder
                  : null
              }
            />
          </div>
          <div className={clsx(styles.iconGroup)}>
            {list_selected_options.length !== 0 ? (
              <button
                tabIndex={-1}
                className={clsx(styles.deleteIcon)}
                //also avoid focusing on the input when having righClick event
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={handleClearIndicator}
                title="Clear"
              >
                <FontAwesomeIcon icon={faXmark} size="2xs" />
              </button>
            ) : null}
            <button
              tabIndex={-1}
              //also avoid focusing on the input when having righClick event 
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={handleClickOpenPopup}
              title={isShow ? "Close" : "Open"}
              className="Popup-Icon"
            >
              {isShow ? (
                <FontAwesomeIcon icon={faCaretUp} size="2xs" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} size="2xs" />
              )}
            </button>
          </div>
          <fieldset className={clsx(styles.outLinedInput)}>
            {isFocus || keyword !== "" || list_selected_options.length > 0 ? (
              <legend>
                <span>{label}</span>
              </legend>
            ) : null}
          </fieldset>
        </div>
      </Tippy>
    </div>
  );
}

export default AutoComplete;

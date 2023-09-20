import OutlinedInput from "./components/OutlinedInput";
import StandardInput from "./components/StandardInput";
function TextField(props) {
    const { variant } = props;
    if(variant === "outlined") {
        return <OutlinedInput props={props}/>
    } else return <StandardInput  props={props}/>
}

export default TextField;

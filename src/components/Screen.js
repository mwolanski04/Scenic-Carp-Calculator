import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value, value2, isFt}) => {
  if (isFt === true) {
    return (
    <>
    <Textfit className="selected" mode="single" max={70}>
        {value}'
    </Textfit>
    <Textfit className="screen" mode="single" max={70}>
       {value2}"
    </Textfit>
    </>
  );
}
  else if (isFt === false) {
    return (
     <>
    <Textfit className="screen" mode="single" max={70}>
        {value}' 
    </Textfit>
    <Textfit className="selected" mode="single" max={70}>
       {value2}" 
    </Textfit>
    </>
    );
  }
  
};

export default Screen;
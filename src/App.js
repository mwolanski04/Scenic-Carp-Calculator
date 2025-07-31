import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/", "ft/in"],
  [7, 8, 9, "X", "1/2"],
  [4, 5, 6, "-", "1/4"],
  [1, 2, 3, "+", "1/8"],
  [0, ".", "=", "1/16" ],
];


const App = () => {

  let [calc, setCalc] = useState({
    isFt: true,
    sign: "",
    num: 0,
    res: 0,
  });

  let [fraction, setFraction] = useState({
    num: 0,
    res: 0,
  });

  const clearCalc = () => {
    setCalc({sign: "+", num: 0, res: 0, isFt: calc.isFt});
    setFraction({num: 0, res:0})

  }

  const signClick = (btn) => {
    setCalc({
      sign: btn,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num:0,
    })
  }

  const equalsClick = () => {
    var out = 0
    if (calc.sign && calc.num) {
      var a = Number(calc.res)
      var b = Number(calc.num)
      calc.sign === "+"
      ? out = a + b
      : calc.sign === "-"
      ? out = a - b
      : calc.sign === "x"
      ? out = a * b
      : out = a / b
    }
    setCalc({
      res: out,
      sign: "",
      num:0,
    })

  }

  const percentClick = () => {
      setCalc({
        num: calc.num / 100
      })
    }

    const changeSign = () => {
      setCalc({
        num: calc.num != 0
        ? calc.num * - 1
        : 0,
        res: calc.res

      })
    }

    const decimalClick = () => {
      setCalc({
        num: Number.isInteger(calc.num)
        ? calc.num.toString() + "."
        : calc.num,
        res: calc.res
      })
    }

    const fractionClick = (value) => {
      setFraction({
        num: eval(fraction.num)+ eval(value)

      })
    }

    const ftAndInClick = () => {
      setCalc({num: calc.num, isFt: !calc.isFt, res: calc.res})
    }

  const numAdd = (value) => {


     if ( calc.isFt) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
          ? "0" 
          : calc.num === 0 
          ? calc.num = value
          : calc.num.toString() + value,
        res: !calc.sign ? 0 : calc.res,
      });

     }
     else {
      setCalc({
        
      })
     }
      
  }
  return (
    <Wrapper>
  
      <Screen value={calc.num ? calc.num + " ' " : calc.res + " ' "} 
      value2={fraction.num + '"'} isFt = {calc.isFt}
      />
      
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick = {(e) => {
                  if (btn === "C") {
                    clearCalc()
                  }
                  else if (btn === "+-") {
                    changeSign()
                  }

                  else if (btn === "%") {
                    percentClick()
                  }
                  else if (btn === "/" || btn === "X" || btn === "+" || btn === "-") {
                    signClick(btn)
                  }
                  else if (btn === "ft/in") {
                    ftAndInClick()
                  }
                  else if (btn === "."){
                    decimalClick()
                  }
                  else if (btn === "="){
                    equalsClick()
                  }
                  else if (btn === "1/2" || btn === "1/4" || btn === "1/8" || btn === "1/16" || btn === "1/32") {
                    fractionClick(btn)
                  }

                  else {
                    numAdd(btn)
                  }
                  
                }
              }
              />
            );
          })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;

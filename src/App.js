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
    in: 0,
    inRes: 0
  });

  let [fraction, setFraction] = useState({
    num: 0,
    res: 0,
  });

  const clearCalc = () => {
    setCalc({sign: "+", num: 0, res: 0,in: 0, inRes:0, isFt: calc.isFt});
    setFraction({num: 0, res:0})

  }

  const signClick = (btn) => {
    setCalc({
      sign: btn,
      res: !calc.res && calc.num ? calc.num : calc.res,
      inRes: !calc.inRes && calc.in ? calc.in : calc.inRes,
      in:0,
      num:0,
      isFt: calc.isFt
    })
  }

  const equalsClick = () => {
    var out = 0
    var out2 = 0

    if (calc.sign) {
      var x = Number(calc.res)
      var y = Number(calc.num)
      var a = Number(calc.inRes)
      var b = Number(calc.in)
      if  (calc.sign === "+") {
        out = x + y
        out2 = a + b
      } 
      else if (calc.sign === "-") {
        out = x - y
        out2 = a - b
      }
      else if (calc.sign === "X") {
        out = x * y
        out2 = x * b
      }
      else {
       if ( b === 0 || y === 0) {
        out = 0
        out2 = 0
       }
       else {
        out = x / y
        out2 = a / b
       }
      }
    }

    if (out2 >= 12)
      for (let i = 0; i < Math.floor(out2 / 12); i++) {
        out2 -= 12
        out += 1
      }
   
    setCalc({
      res: out,
      inRes: out2,
      sign: "",
      num:0,
      in:0,
      isFt:calc.isFt
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
        in: calc.in,
        res: calc.res,
        inRes: calc.inRes,
        isFt: calc.isFt

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
      setCalc({sign: calc.sign, num: calc.num, isFt: !calc.isFt, res: calc.res, in: calc.in, inRes: calc.inRes})
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
        ...calc,
        in:
          calc.in === 0 && value === "0"
          ? "0"
          : calc.in === 0
          ? calc.in = value
          :  calc.in.toString() + value,
        inRes: !calc.sign ? 0 : calc.inRes

      });
     }
      
  }
  return (
    <Wrapper>
  
      <Screen value={calc.num ? calc.num : calc.res } 
      value2={calc.in ? calc.in : calc.inRes} isFt = {calc.isFt}
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

const add = (a,b) => parseFloat((a+b).toFixed(3));
const subtract = (a,b) => parseFloat((a-b).toFixed(3));
const multiply = (a,b) => parseFloat((a*b).toFixed(3));
const divide = (a,b) => {
    if(b==0){
       alert ("Cannot divide by zero");
    }
    return parseFloat((a/b).toFixed(3));
};

const operate = (firstNumber,sign,secondNumber) =>{
    switch(sign){
        case ("+"):
            return add( firstNumber,secondNumber); 
            break;
        case("-"):
            return subtract(firstNumber,secondNumber);
            break;
        case ("*"):
            return multiply(firstNumber,secondNumber);
            break;
        case ("/"):
            return divide(firstNumber,secondNumber);
            break;
    }
}

function updateDisplay(){
    const screen = document.querySelector('#screen');
    screen.textContent = getInputString();
}

let inputSequence = [];
let justEvaluated = false;
function pressButton(character){
    
    let operators = ["+", "-","*","/"];
     // Check if character is an operator
    if(operators.includes(character)){
        justEvaluated=false;    
        // Check if inputSequence contains operator prev one
        let lastChar = inputSequence[inputSequence.length-1]
        if(operators.includes(lastChar)){
            alert("Two operators in a row not allowed");
            return;
        }    
    } 
    if(character=="="){
        justEvaluated =true;
        let result = evaluateInput();
        inputSequence = [...String(result)];
        updateDisplay();
        return;
    }
    if(justEvaluated && /\d/.test(character)){
        clearInput();
       justEvaluated = false; 
    }

    if(character=="."){
        let Part = getInputString();
        if(Part.match(/([\+\-\*\/])/)){
            let secPart = Part.match(/([^\+\-\*\/]+)$/);
            if(secPart && secPart[0].includes(".")){
            alert('No more than two decimals in a number');
            return;
            }
        }else {
            if(inputSequence.includes(".")){
            alert('No more than two decimals in a number');
            return;
            }
        }
    }

    inputSequence.push(character);
    updateDisplay();
}

function clearInput(){
    inputSequence=[];
    updateDisplay();
}

function getInputString(){
    return inputSequence.join('');
}

function evaluateInput(){
    let expression = getInputString();
    console.log(expression);
    let array = expression.split(/([\+\-\*\/])/);
    let firstNumber, sign, secondNumber;
    if(array[0]==""){
       firstNumber = -parseFloat(array[2]);
       sign = array[3];
       secondNumber = parseFloat(array[4]);
    }
    else{
        firstNumber = parseFloat(array[0]);
        sign = array[1];
        secondNumber = parseFloat(array[2]);
    }
    console.log(array);
    return operate(firstNumber, sign, secondNumber);
}

function backspace(){
    inputSequence.pop();
    updateDisplay();
}

function setupButtonListeners(event){
    let calculatorElement = document.querySelectorAll('button');
    calculatorElement.forEach(btn =>{
        btn.addEventListener("click",() =>{
        if(btn.id === "clr"){
             clearInput();
        }else if(btn.id === "equal"){
            pressButton(btn.textContent);
        }else if(btn.id === "back"){
           backspace();
        }
        else{
            pressButton(btn.textContent);
        }});
    });
};

window.onload = setupButtonListeners;

const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
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
function pressButton(character){
    let operators = ["+", "-","*","/"];
     // Check if character is an operator
    if(operators.includes(character)){
        // Check if inputSequence already contains an operator
        for(let op of operators){
            if (inputSequence.includes(op)){
                alert("Another operator is allowed only after evaluating or clearing. (i.e., calculator evaluates 2 operand at a time)");
            }
        }
    }
    if(character=="="){
        let result = evaluateInput();
        inputSequence = [...String(result)];
        updateDisplay();
        return;
    }

    if(operators.includes(character)){
        let i= inputSequence.indexOf(character);
        let secondHalf = inputSequence.slice(0,i);
        if(character=="."){
            if(inputSequence.includes(".")){
            alert("already has a decimal point can't add another one");
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
    let array = expression.split(/([\+\-\*\/])/);
    let firstNumber = parseFloat(array[0]);
    let sign = array[1];
    let secondNumber = parseFloat(array[2]);
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
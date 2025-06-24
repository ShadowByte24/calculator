const operator = (firstNumber,sign,secondNumber) =>{
    switch(sign){
        case ("+"):
            return firstNumber+secondNumber;
        case("-"):
            return firstNumber-secondNumber;
        case ("*"):
            return firstNumber*secondNumber;
        case ("/"):
            return firstNumber/secondNumber;
    }
}
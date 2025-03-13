const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button");
const clearButton = document.querySelector("#keys .clear");
const eraseButton = document.querySelector("#keys .erase");

function appendToDisplay(input){
    if (display.value === "Error! Try again.") {
        return;
    }
    const lastChar = display.value.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar) && ["+", "-", "*", "/"].includes(input)) {
        return;
    }
    display.value += input;
}

function clearDisplay(){
    display.value = "";
    buttons.forEach(button => button.disabled = false);
}

function eraseLastCharacter() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
}

function calculate(){
    try{
        const result = eval(display.value);
        if (result === Infinity || result === -Infinity) {
            throw new Error("Division by zero");
        }
        if (isNaN(result)) {
            if (display.value.includes("/0")) {
                throw new Error("Division by zero");
            } else {
                throw new Error("Invalid calculation");
            }
        }
        display.value = result;
    }
    catch(error){
        if (error.message === "Division by zero") {
            display.value = "Can you divide a zero? lol";
        } else if (error.message === "Invalid calculation") {
            display.value = "Invalid calculation. Try again.";
        } else {
            display.value = "You bastard! Try again.";
        }
        buttons.forEach(button => {
            if (!button.classList.contains("clear")) {
                button.disabled = true;
            }
        });
    }
}

let answerBox = document.getElementById("answer-box")
let result = document.querySelector("#result")

const allClear = document.getElementById("all-clear")
const clearLast = document.getElementById("clear-last")
const equalEl = document.getElementById("equal-el")


// Mapping of button IDs to the value to append
const buttonMap = {
    "zero-el": "0",
    "one-el": "1",
    "two-el": "2",
    "three-el": "3",
    "four-el": "4",
    "five-el": "5",
    "six-el": "6",
    "seven-el": "7",
    "eight-el": "8",
    "nine-el": "9",
    "point-el": ".",
    "plus-el": " + ",
    "subtract-el": " - ",
    "multiply-el": " * ",
    "divide-el": " / ",
    "percentage-el": " % "
};

function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char);
}   

Object.entries(buttonMap).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", function() {
            const lastChar = answerBox.textContent.trim().slice(-1)
            if (isOperator(value.trim()) && isOperator(lastChar)) {
                answerBox.textContent = answerBox.textContent.slice(0, -3) + value;
                return;
            }
            answerBox.textContent += value;
        });
    }
});

clearLast.addEventListener("click", function(){
    let text = answerBox.textContent
    if(text.endsWith(" + ") || text.endsWith(" - ") || text.endsWith(" * ") || text.endsWith(" / ") || text.endsWith(" % ") ){
        answerBox.textContent = text.slice(0, -3)
    } else {
    answerBox.textContent = text.slice(0, -1)
    }
})

allClear.addEventListener("click", function(){
    answerBox.textContent = ""
    result.textContent = ""
})


equalEl.addEventListener("click", function(){
    try {
        // Evaluate the entire string inside answerBox
        const expression = answerBox.textContent.replace(/[^\d/*+\-%.]/g, '')
        
        const total = eval(expression)
        result.textContent = total
    } catch (e) {
        result.textContent = `Error: ${e.message}`
    }
})



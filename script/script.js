const addBtn = document.getElementById("add");
const substractBtn = document.getElementById("substract");
const multiplyBtn = document.getElementById("multiply");
const divisionBtn = document.getElementById("division");
const skipBtn = document.getElementById("skip");
const showBtn = document.getElementById("show");

const currentOperation = document.getElementById("current-operation");
const result = document.getElementById("result");
const emoji = document.getElementById("emoji");

//let valueToCheck;

let add = true;
let sub = false;
let multiply = false;
let division = false;

let theCorrectAnswer;

let timeOutHandler = null;

///////////////////////////////////////////////////////
// 4 type togglers
///////////////////////////////////////////////////////
addBtn.addEventListener("click", () => {
  if (add == false) {
    addBtn.style.border = "2px black solid";
    addBtn.style.backgroundColor = "yellowgreen";
    add = true;
    TheMathWonder();
  } else {
    addBtn.style.border = "1px black solid";
    addBtn.style.backgroundColor = "transparent";
    add = false;
    noTypeIsActive();
  }
});

substractBtn.addEventListener("click", () => {
  if (sub == false) {
    substractBtn.style.border = "2px black solid";
    substractBtn.style.backgroundColor = "yellowgreen";
    sub = true;
    TheMathWonder();
  } else {
    substractBtn.style.border = "1px black solid";
    substractBtn.style.backgroundColor = "transparent";
    sub = false;
    noTypeIsActive();
  }
});

multiplyBtn.addEventListener("click", () => {
  if (multiply == false) {
    multiplyBtn.style.border = "2px black solid";
    multiplyBtn.style.backgroundColor = "yellowgreen";
    multiply = true;
    TheMathWonder();
  } else {
    multiplyBtn.style.border = "1px black solid";
    multiplyBtn.style.backgroundColor = "transparent";
    multiply = false;
    noTypeIsActive();
  }
});

divisionBtn.addEventListener("click", () => {
  if (division == false) {
    divisionBtn.style.border = "2px black solid";
    divisionBtn.style.backgroundColor = "yellowgreen";
    division = true;
    TheMathWonder();
  } else {
    divisionBtn.style.border = "1px black solid";
    divisionBtn.style.backgroundColor = "transparent";
    division = false;
    noTypeIsActive();
  }
});

/////////////////////////////////////////////////////////
// handle logic buttons show, skip and the correct result
////////////////////////////////////////////////////////
showBtn.addEventListener("click", () => {
  result.value = theCorrectAnswer;

  successAndReset();
});

skipBtn.addEventListener("click", () => {
  TheMathWonder();
});

result.addEventListener("input", function (evt) {
  if (this.value == theCorrectAnswer) {
    successAndReset();
  }
});

/////////////////////////////////////////////////////////
// change color and emoji when success
// set timeout of 2 seconds and start over
////////////////////////////////////////////////////////
function successAndReset() {
  result.style.color = "green";
  emoji.src = "/img/yes-round.png";

  timeOutHandler = setTimeout(function () {
    TheMathWonder();
  }, 2000);
}

/////////////////////////////////////////////////////////
// if none of the four aritmetic types is activated show text hint
////////////////////////////////////////////////////////
function noTypeIsActive() {
  if (add == false && sub == false && multiply == false && division == false) {
    currentOperation.innerHTML = `none active`;
  }
}

/////////////////////////////////////////////////////////
// reset page, generate reandoms, set operators according
// to settings, build equation
////////////////////////////////////////////////////////
function TheMathWonder() {
  // clear timeout only if set
  if (timeOutHandler) {
    clearTimeout(timeOutHandler);
  }

  let firstNumber = Math.floor(Math.random() * 10) + 1;
  let secondNumber = Math.floor(Math.random() * 10) + 1;

  let activeArimethics = [add, sub, multiply, division];
  let operators = [];

  // reset form
  result.value = "";
  result.style.color = "black";
  //result.setAttribute("class", "autofocus");
  result.autofocus = true;
  emoji.src = "/img/1873906.png";

  // gather operators and add them to the operators-array.
  if (activeArimethics[0] == true) {
    operators.push("+");
  }
  if (activeArimethics[1] == true) {
    operators.push("-");
  }
  if (activeArimethics[2] == true) {
    operators.push("*");
  }
  if (activeArimethics[3] == true) {
    operators.push("/");
  }

  let randomIndex = Math.floor(Math.random() * operators.length);

  let randomOperator = operators[randomIndex];

  // if sub is active add 10 to first number
  // to avoid negative numbers
  if (randomOperator == "-") {
    firstNumber += 10;
  }

  // provide division equations that can be
  // solved without a rest
  if (randomOperator == "/") {
    let smooth = false;

    while (smooth == false) {
      firstNumber += 10;

      if (firstNumber % 2 == 1) {
        firstNumber += 1;
      }

      if (secondNumber % 2 == 1) {
        secondNumber += 1;
      }

      if (firstNumber % secondNumber == 0) {
        smooth = true;
      } else {
        let firstNumber = Math.floor(Math.random() * 10) + 1;
        let secondNumber = Math.floor(Math.random() * 10) + 1;
      }
    }
  }

  currentOperation.innerHTML = `${firstNumber} ${randomOperator} ${secondNumber}`;

  correctAnswer(firstNumber, secondNumber, randomOperator);
}

/////////////////////////////////////////////////////////
// set equation and return the correct answer
////////////////////////////////////////////////////////
function correctAnswer(firstNo, secondNo, operator) {
  if (operator == "+") {
    theCorrectAnswer = firstNo + secondNo;
  } else if (operator == "-") {
    theCorrectAnswer = firstNo - secondNo;
  } else if (operator == "*") {
    theCorrectAnswer = firstNo * secondNo;
  } else if (operator == "/") {
    theCorrectAnswer = firstNo / secondNo;
  }
}

//////////////////////////////////////////////////////////
// set a new quiz during load/reload
/////////////////////////////////////////////////////////
TheMathWonder();

/////////////////////////////////////////////////////////
// Dialog handler complete
// crazy s**t here handle modal with <dialog>-tag
/////////////////////////////////////////////////////////
const aboutButton = document.getElementById("toggle-about-modal");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("favDialog");

function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

// Update button opens a modal dialog
aboutButton.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
  dialog.close("animalNotChosen");
  openCheck(dialog);
});

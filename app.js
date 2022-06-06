const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  if (i % 9 == 0) {
    inputElement.classList.add("odd-section");
  }

  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
    solutionDisplay.innerHTML = "This is the answer";
  } else {
    solutionDisplay.innerHTML = "This is not solvable";
  }
};

const solve = () => {
  joinValues();
  const data = submission.join("");
  console.log("data", data);
  const options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
      "x-rapidapi-key": "6835772f3emsh8dbf271d59b19eep132ed4jsndd22b502a839",
    },
    date: {
      puzzle: data,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution);
    })
    .catch((error) => {
      console.log(error);
    });
};

solveButton.addEventListener("click", solve);

//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
// function renderQuestions() {
//   for (let i = 0; i < questions.length; i++) {
//     const question = questions[i];
//     const questionElement = document.createElement("div");
//     const questionText = document.createTextNode(question.question);
//     questionElement.appendChild(questionText);
//     for (let j = 0; j < question.choices.length; j++) {
//       const choice = question.choices[j];
//       const choiceElement = document.createElement("input");
//       choiceElement.setAttribute("type", "radio");
//       choiceElement.setAttribute("name", `question-${i}`);
//       choiceElement.setAttribute("value", choice);
//       if (userAnswers[i] === choice) {
//         choiceElement.setAttribute("checked", true);
//       }
//       const choiceText = document.createTextNode(choice);
//       questionElement.appendChild(choiceElement);
//       questionElement.appendChild(choiceText);
//     }
//     questionsElement.appendChild(questionElement);
//   }
// }
// renderQuestions();

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve previous answers from sessionStorage or initialize empty
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear any existing content
  questions.forEach((question, i) => {
    const questionContainer = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    question.choices.forEach(choice => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // ✅ Properly check if previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // Save selection to session storage
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(choiceLabel);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionContainer);
  });
}


// Handle quiz submission
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display and store score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score.toString());
});

// Display stored score after refresh (if already submitted)
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}

// Initial render
renderQuestions();


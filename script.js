// DOM Manipulation
const startScreen = document.getElementById("start-screen");
const quizScreen= document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("Question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");


let quizQuestions = [
   {
    question:"What is the capital of France?",
    answers:[
        {text:"London", correct: false},
        {text:"Berlin", correct: false},
        {text:"Paris", correct: true},
        {text:"Madrid", correct: false},
    ],
   },
   {
    question:"Which planet is known as the Red Planet?",
    answers:[
        {text:"Venus", correct: false},
        {text:"Mars", correct: true},
        {text:"Jupiter", correct: false},
        {text:"Saturn", correct: false},
    ],
   },
   {
    question:"What is the largest ocean on Earth?",
    answers:[
        {text:"Atlantic Ocean", correct: false},
        {text:"Indian Ocean", correct: false},
        {text:"Arctic Ocean", correct: false},
        {text:"Pacific Ocean", correct: true},
    ],
   },
   {
    question:"Whichof these is NOT a programming language?",
    answers:[
        {text:"Java", correct: false},
        {text:"Python", correct: false},
        {text:"Banana", correct: true},
        {text:"Javascript", correct: false},
    ],
   },
   {
    question:"What is the chemical symbol for gold?",
    answers:[
        {text:"Go", correct: false},
        {text:"Gd", correct: false},
        {text:"Au", correct: true},
        {text:"Ag", correct: false},
    ],
   },
   {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "What is the largest mammal?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Shark", correct: false }
        ]
    },
    {
        question: "How many states do we have in Nigeria?",
        answers: [
            { text: "35", correct: false },
            { text: "26", correct: false },
            { text: "36", correct: true },
            { text: "28", correct: false }
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "100°C", correct: true },
            { text: "90°C", correct: false },
            { text: "80°C", correct: false },
            { text: "70°C", correct: false }
        ]
    },
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}




// RESET VAR
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent =(quizQuestions.length) / 2;
maxScore.textContent = (quizQuestions.length) /2;

// EVENT LISTENER

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    // Shuffle and pick 5 random questions
   quizQuestions = shuffleArray(quizQuestions).slice(0, 5);
   currentQuestionIndex = 0;
   scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}
function showQuestion(){
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
     currentQuestionSpan.textContent = currentQuestionIndex + 1;
     const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
     progressBar.style.width = progressPercent + "%"

     questionText.textContent = currentQuestion.question


    //  ANSWER
    answersContainer.innerHTML=""
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("buttons");
        button.textContent = answer.text;
        button.classList.add("answer-btn")

        // dataset
        button.dataset.correct = answer.correct


           button.addEventListener("click", selectAnswer)    
        answersContainer.appendChild(button)
    })
    
}
function selectAnswer(event){
    if (answerDisabled) return

    answerDisabled = true;

    const selectedButton = event.target;
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }else{
            if (button.dataset.correct === "false"){
                button.classList.add("incorrect")
            }

        }
    })
     const isCorrect = selectedButton.dataset.correct === "true";
    
    if(isCorrect ){
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        // check if there is more question
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }else{
            showResult()
        }
    }, 1000)

    function showResult(){
        quizScreen.classList.remove("active")
        resultScreen.classList.add("active")
       
        finalScore.textContent = score;

        const percentage=score/((quizQuestions.length)/2) * 100;

         if(percentage === 100 ){
                resultMessage.textContent = "Perfect! You're a genius";
            } else if(percentage === 80){
                resultMessage.textContent = "Great job! You know your stuff!";
            }else if(percentage === 60){
                resultMessage.textContent = "Good effort! Keep learning!";
            }else if(percentage === 40){
                resultMessage.textContent = "Not bad! Try again to improve!";
            } else {
                resultMessage.textContent = "Kep studying! You'll get better!"
            }

    }

}

function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz()
}








// Time set in seconds
let currentTime = 30
let timer = null
let currentQuestionIndex = null
let playerScore = 0

// questions
let questions = [{
        questionText: 'How many fluffy bunnies are there?',
        answers: [
            '1 Bunny', '2 Bunnies', '3 Bunnies'
        ],
        correctAnswer: 1
    },
    {
        questionText: 'How many soft duckies are there?',
        answers: [
            '1 Duckie', '2 Duckies', '3 Duckies'
        ],
        correctAnswer: 0
    },
    {
        questionText: 'How many cookies should I eat?',
        answers: [
            '1 cookie', '2 cookies', 'Never enough cookies'
        ],
        correctAnswer: 2
    }
]

// timer function

let tick = function() {
    currentTime--
    if (currentTime <= 0) {
        // quiz finished, show high score thingie and stop counter
        renderHighScores();
    }
    let timerBox = document.getElementById('timer-display');
    if (timerBox) {
        timerBox.textContent = currentTime;
    }
}

// starting game function

function startGame(event) {
    console.log('clicked')
    currentQuestionIndex = 0;
    renderCurrentQuestion();
    document.getElementById('questions').style.display = "block";
    document.getElementById('answers').style.display = "block";
    timer = setInterval(tick, 1000);
}

// answering questions function

function answerClick(event) {
    let answerId = event.target.id;
    console.log('i clicked ' + answerId);
    // provide feedback on answer
    let answerIndex = parseInt(answerId.substring(6)) - 1;
    console.log(answerIndex)
    let correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;
    if (answerIndex === correctAnswerIndex) {
        playerScore = playerScore + 1;
        document.getElementById('feedback').textContent = "Correct answer!";
    } else {
        document.getElementById('feedback').textContent = "Wrong answer! -5 seconds from timer";
        currentTime = currentTime - 5;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        // we are at the end of the quiz
        renderHighScores();
    } else {
        // show the next question
        renderCurrentQuestion();
    }
    // submitScore();
    // renderHighScores();
}

// function renderSubmitScore() {
//     submitScore;
// }

// function submitScore() {
//     let name = document.getElementById("myText").value;
//     console.log('it worked')
//     let scores = JSON.parse(localStorage.getItem("scores")) || [];

//     scores.push({
//         name: name,
//         score: timer
//     })

//     localStorage.setItem("scores", JSON.stringify(scores));
//     renderHighScores;
// }

function renderHighScores() {

    if (timer) {
        clearInterval(timer);
    }
    document.getElementById('questions').style.display = "none";
    document.getElementById('answers').style.display = "none";
    document.getElementById('myText').style.display = "block";
    document.getElementById('submitScore').style.display = "block";
    document.getElementById('scores').textContent = "Highscore";
    let name = document.getElementById("myText").value;
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({
        name: name,
        score: playerScore
    })

    localStorage.setItem("scores", JSON.stringify(scores));

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i]
        $(".scores").append("<li><span>" + score.name + "</span> <span>" + score.score + "</span></li>")
    }
}

function renderCurrentQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('questions').textContent = question.questionText;
    document.getElementById('answer1').textContent = question.answers[0];
    document.getElementById('answer2').textContent = question.answers[1];
    document.getElementById('answer3').textContent = question.answers[2];
}

document.getElementById('start-btn').addEventListener("click", startGame);
let answerButtons = document.querySelectorAll('.answer-button');
for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", answerClick);
}

document.getElementById('submitScore').addEventListener("click", renderHighScores);
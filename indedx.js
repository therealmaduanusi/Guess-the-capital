import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { log } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Set EJS as the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// quiz array
let quiz = [
    { country: "France", capital: "Paris" },
    { country: "United Kingdom", capital: "London" },
    { country: "United States of America", capital: "New York" },
]

let currentQuestion;
let totalCorrect = 0;

// route
app.get("/", (req, res) => {
    console.log(__dirname);
    nextQuestion()
    res.render("index.ejs", {
        question: currentQuestion
    });
})

app.post("/submit", (req, res) => {
    let answer = req.body.answer.trim()
    // console.log(req.body);
    let isCorrect = false
    if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
        totalCorrect++
        isCorrect = true;
    }
    nextQuestion()
    res.render("index.ejs", {
        question: currentQuestion,
        totalScore: totalCorrect,
        wasCorrect: isCorrect
    })
})

// random question
function nextQuestion() {
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQuestion = randomCountry;
}

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
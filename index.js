import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./db.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// quiz array
let quiz = [];
// Query database
db.query("SELECT * FROM capital", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        quiz = res.rows;
    }
    db.end();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Set EJS as the view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


let currentQuestion;
let totalCorrect = 0;

// home route
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
//   console.log(currentQuestion);
  res.render("index.ejs", {
    question: currentQuestion,
  });
});

// submit route
app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  await nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    totalScore: totalCorrect,
    wasCorrect: isCorrect,
  });
});

// random question
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

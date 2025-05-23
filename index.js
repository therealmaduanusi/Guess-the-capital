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

  if (!currentQuestion) {
    return res.status(500).send("Could not fetch question from database");
  }
//   console.log(currentQuestion);
  res.render("index.ejs", {
    question: currentQuestion,
  });
});

// submit route
app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  
  // handle score value and styling attribute
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  let correctCapital = currentQuestion.capital.toLowerCase();
  
  await nextQuestion();

  res.render("index.ejs", {
    question: currentQuestion,
    totalScore: totalCorrect,
    wasCorrect: isCorrect,
    correctCapital: correctCapital
  });
});

// random question
async function nextQuestion() {
  try {
    // Query database
    let result = await db.query("SELECT * FROM capitals");
    quiz = result.rows;
    // console.log(quiz);
    
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQuestion = randomCountry;
    // console.log(currentQuestion);
    
  } catch (error) {
    console.error("Error fetching question:", error);
    currentQuestion = null; // Fallback if something goes wrong
  }
}

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

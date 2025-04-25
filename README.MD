# GUESS THE COUNTRY CAPITAL | QUIZ

guess the capital is a quiz game obviously from the name. Each country capital is gotten from a SQL DB(postgreSQL_DB) that is being hosted on render hosting platform.

User input is equating the equality between the DB value and the user input value

code snippets for query the value in the DB
```js
// quiz array
let quiz = [];

let currentQuestion;

// random question
async function nextQuestion() {
    try {
        // Query database
        let result = await db.query("SELECT * FROM capitals");
        quiz = result.rows;
        
        const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
        currentQuestion = randomCountry;
    } catch (error) {
        console.error("Error fetching question:", error);
        currentQuestion = null; // Fallback if something goes wrong
    }
}
```

The values are read using a templating language(EJS)

> [!IMPORTANT]
> The render DB expires on 16th may 2025

### Acknowledge
[Angela Yue](https://x.com/yu_angela)
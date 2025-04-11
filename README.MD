# GUESS THE COUNTRY CAPITAL | QUIZ

guess the capital is a quiz game obviously from the name. Each country capital is gotten from a SQL DB(postgreSQL_DB).

User input is equating the equality between the DB value and the user input value

code snippets for query the value in the DB
```js
db.query("SELECT * FROM capital", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        quiz = res.rows;
    }
    db.end();
});
```

The values are read using a templating language(EJS)

> [!IMPORTANT]
> Still trying to figure out production hosting for the DB(postgreSQL)
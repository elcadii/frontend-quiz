const currentQuestionElement = document.getElementById("currentQuestion");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionProgress = document.getElementById("questionProgress");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBarFull = document.getElementById("progressBarFull");
const retryButton = document.getElementById("retryButton");

let score = 0;
let questionCounter = 0;
let acceptingAnswers = true;

const questions = [
    "Inside which HTML element do we put the JavaScript?",
    "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "How do you write 'Hello World' in an alert box?",
    "What does CSS stand for?",
    "What does HTML stand for?",
    "Which property is used to change the background color in CSS?",
    "What is the correct HTML element for inserting a line break?",
    "How do you create a function in JavaScript?",
    "Which HTML tag is used to define an unordered list?",
    "How do you call a function named 'myFunction' in JavaScript?",
    "What does the 'this' keyword refer to in JavaScript?",
    "How can you change the text color in CSS?",
    "Which property is used to change the font size in CSS?",
    "What is the correct HTML element to define the largest heading?",
    "How do you create a comment in JavaScript?",
    "What does 'NaN' mean in JavaScript?",
    "Which of the following is not a valid CSS selector?",
    "What is the purpose of the 'id' attribute in HTML?",
    "How do you define a variable in JavaScript?",
    "Which of the following is not a valid JavaScript data type?",
    "How can you make a number a string in JavaScript?",
    "What does the 'length' property in an array do in JavaScript?",
    "How do you add a background image in CSS?",
    "What does the 'parseInt' function do in JavaScript?",
    "What is the correct way to define an array in JavaScript?",
    "What is the purpose of the 'href' attribute in an anchor tag?",
    "How do you declare a constant variable in JavaScript?",
    "Which method is used to add an element to the end of an array in JavaScript?",
    "How do you declare a JavaScript function that takes two arguments?",
    "What is the correct way to add a comment in HTML?",
    "How can you make a number a floating point number in JavaScript?",
    "Which tag is used to display an image in HTML?",
    "How do you loop through an array in JavaScript?",
    "Which CSS property is used to set the space between letters?",
    "What does the 'addEventListener' method do in JavaScript?",
    "Which operator is used to assign a value to a variable in JavaScript?",
    "How do you add padding in CSS?",
    "What is the default value of the 'position' property in CSS?",
    "How do you include external CSS in an HTML document?",
    "What is the correct way to define a class in CSS?",
    "What does 'alert()' do in JavaScript?",
    "How can you add a border to an element in CSS?",
    "How do you convert a string to a number in JavaScript?",
    "Which HTML element is used for a dropdown list?",
    "How do you write an if statement in JavaScript?",
    "Which property is used to change the font family in CSS?",
    "What does the 'Math.random()' function do in JavaScript?",
    "How do you change the visibility of an element in CSS?",
    "Which event is triggered when the user clicks on an element in JavaScript?",
    "What is the correct way to include a JavaScript file in HTML?",
    "Which function can be used to find the length of a string in JavaScript?",
    "How do you define a class in HTML?",
    "What is the correct syntax for a JavaScript 'for' loop?",
    "What is the correct HTML element to specify a footer?",
    "What is the purpose of the 'alt' attribute in an image tag?",
    "How do you add a link to a webpage in HTML?",
    "How do you define a key-value pair in an object in JavaScript?"
];

const responses = [
    ["<script>", "<javascript>", "<js>", "<scripting>"],
    ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
    ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
    ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
    ["Hyperlink and Text Markup Language", "Hypertext Markup Language", "Home Tool Markup Language", "Hightext Machine Language"],
    ["background-color", "bgcolor", "background", "color"],
    ["<br>", "<hr>", "<line>", "<break>"],
    ["function myFunction() {}", "create function myFunction() {}", "myFunction function() {}", "function: myFunction() {}"],
    ["<ul>", "<ol>", "<li>", "<list>"],
    ["myFunction();", "call myFunction();", "execute myFunction();", "invoke myFunction();"],
    ["The current object.", "The current function.", "The global object.", "The previous object."],
    ["color", "text-color", "font-color", "background-color"],
    ["font-size", "font-weight", "font-style", "font-size-adjust"],
    ["<h1>", "<h2>", "<h3>", "<h4>"],
    ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
    ["Not a Number", "New Array Name", "Number And New", "Null and Nothing"],
    ["#example", ".example", "example", ":example"],
    ["To uniquely identify an element.", "To group elements together.", "For CSS styling.", "For JavaScript functions."],
    ["let", "var", "const", "set"],
    ["number", "string", "boolean", "object"],
    ["String(10)", "toString(10)", "String10", "10.toString()"],
    ["It gives the number of elements in an array.", "It finds the maximum value in an array.", "It returns the average value of an array.", "It adds elements to the array."],
    ["background-image", "image-background", "bg-image", "background-color"],
    ["Converts string to integer.", "Generates random number.", "Checks if value is a number.", "Changes type of variable."],
    ["let arr = [1, 2, 3];", "let arr[] = (1, 2, 3);", "arr = {1, 2, 3};", "var arr = (1, 2, 3);"],
    ["<a href='xxx.js'>", "<a script='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>"],
    ["const", "let", "var", "const x = 5;"],
    ["push()", "pop()", "shift()", "unshift()"],
    ["function myFunction(a, b) {}", "function myFunction[]", "myFunction(a, b){}", "myFunction(a: b)"],
    ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
    ["Number(x)", "parseInt(x)", "parseFloat(x)", "parseFloatString(x)"],
    ["<img src='image.jpg'>", "<image src='image.jpg'>", "<picture src='image.jpg'>", "<image-link src='image.jpg'>"],
    ["for (let i = 0; i < arr.length; i++) {}", "arr.forEach(i => {});", "for each i in arr {}", "arr.each(i) {}"],
    ["letter-spacing", "word-spacing", "font-size", "line-height"],
    ["It adds event listeners to elements.", "It initializes an element.", "It creates new elements.", "It assigns an event to a variable."],
    ["=", "==", "===", ":="],
    ["padding-left", "padding", "padding-right", "pad"],
    ["relative", "absolute", "fixed", "static"],
    ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css file='style.css'>", "<stylesheet src='style.css'>"],
    [".class { }", "#class { }", "class { }", "style .class { }"],
    ["Displays an alert box.", "Logs a message to the console.", "Displays an error message.", "Changes an element's content."],
    ["border-style", "border-width", "border-color", "border"],
    ["Number(string)", "parseNumber(string)", "convert(string)", "string.toNumber()"],
    ["<select>", "<dropdown>", "<options>", "<list>"],
    ["if (condition) {}", "if condition {};", "if: condition {}", "if{}"],
    ["font-family", "font-style", "text-align", "letter-spacing"],
    ["It generates a random number between 0 and 1.", "It generates a random number between 0 and 100.", "It rounds a number.", "It generates a fixed random number."],
    ["visibility", "display", "hidden", "opacity"],
    ["click", "change", "mouseover", "focus"],
    ["<script src='xxx.js'>", "<link src='xxx.js'>", "<javascript src='xxx.js'>", "<script file='xxx.js'>"],
    ["str.length", "str.size()", "str.charLength", "str.count()"],
    ["<div class='myClass'>", "<div class=myClass>", "<class='myClass'>", "<div class: 'myClass'>"],
    ["for (let i = 0; i < arr.length; i++) {}", "for i in arr", "loop arr", "arr.forEach()"],
    ["<footer>", "<end>", "<section>", "<bottom>"],
    ["It describes the content of the image.", "It sets the image source.", "It defines image alt text.", "It links the image."],
    ["<a href='www.example.com'>", "<link href='www.example.com'>", "<anchor href='www.example.com'>", "<url href='www.example.com'>"],
    ["{ key: 'value' }", "key = value", "key: value;", "object['key'] = value;"]
];

const correctAnswers = [
    0, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1, 1, 0, 1, 0, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 1, 2, 0, 1, 1, 0, 2, 2, 0, 0, 3, 1, 0, 0, 3, 1, 0, 2, 0, 1
];

const max_questions = questions.length;

function startQuiz() {
    questionCounter = 0;
    score = 0;
    scoreDisplay.innerText = score;
    retryButton.style.display = "none";
    loadNewQuestion();
}

function loadNewQuestion() {
    if (questionCounter >= max_questions) {
        return endQuiz();
    }

    questionCounter++;
    questionProgress.innerText = `Question ${questionCounter}/${max_questions}`;
    progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;

    currentQuestionElement.innerText = questions[questionCounter - 1];

    const currentChoices = responses[questionCounter - 1];
    for (let i = 0; i < choices.length; i++) {
        choices[i].innerText = currentChoices[i];
        choices[i].classList.remove("correct", "incorrect");
    }

    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset.number);
        const correctAnswer = correctAnswers[questionCounter - 1];
        if (selectedAnswer === correctAnswer + 1) {
            updateScore(1);
            selectedChoice.parentElement.classList.add("correct");
        } else {
            selectedChoice.parentElement.classList.add("incorrect");
            const correctChoice = choices[correctAnswer].parentElement;
            correctChoice.classList.add("correct");
        }

        setTimeout(() => {
            choices.forEach(choice => {
                choice.parentElement.classList.remove("correct", "incorrect");
            });
            loadNewQuestion();
        }, 1000);
    });
});

function updateScore(num) {
    score += num;
    scoreDisplay.innerText = score;
}

function endQuiz() {
    retryButton.style.display = "block";
    currentQuestionElement.innerText = "Quiz Finished!";
    questionProgress.innerText = `Final Score: ${score}`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();

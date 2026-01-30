
const questions = [
    {
        question: "1. What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: 2
    },

    {
        question: "2. Which CSS property changes the text color?",
        options: ["font-color", "color", "text-color", "background-color"],
        answer: 1
    },

    {
        question: "3. What is the purpose of z-index in CSS?",
        options: ["Controls text size", "Controls stacking order of elements", "Controls element width", "Controls element margin"],
        answer: 2
    },

    {
        question: "4. Which is NOT a valid CSS position value?",
        options: ["relative", "absolute", "fixed", "center"],
        answer: 3
    },

    {
        question: "5. How do you select an element with id=header?",
        options: [".header", "#header", "header", "*header"],
        answer: 1
    },

    {
        question: "6. What is the difference between == and ===?",
        options: ["== compares type and value, === compares only value", "== compares only value, === compares type and value", "Both are same", "=== is only used for strings"],
        answer: 1
    },

    {
        question: "7. Which is the correct way to declare a function?",
        options: ["function myFunc() { }", "func myFunc() { }", "function: myFunc() { }", "myFunc() => function { }"],
        answer: 0
    },

    {
        question: "8. Which is NOT a way to declare a variable?",
        options: ["var x", "let x", "const x", "static x"],
        answer: 3
    },

    {
        question: "9. Which of the following will add an element to the end of an array?",
        options: ["array.push(element)", "array.pop()", "array.shift()", "array.unshift(element)"],
        answer: 0
    },

    {
        question: "10. Which method binds a function to a specific this context without calling it?",
        options: ["call()", "apply()", "bind()", "assign()"],
        answer: 2
    }
];

let currentQ = 0;
let userAnswers = Array(questions.length).fill(null);

const quizBox = document.getElementById("quiz-box");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

// ✅ Function to load question
function loadQuestion() {
    const q = questions[currentQ];

    // Clear quiz box
    quizBox.innerHTML = "";

    // Add question
    const questionEl = document.createElement("h5");
    questionEl.textContent = q.question;
    quizBox.appendChild(questionEl);

    // Add options
    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "form-check mt-2";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "option";
        input.id = `opt${i}`;
        input.value = i;
        if (userAnswers[currentQ] === i) input.checked = true;

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `opt${i}`);
        label.textContent = opt;   // ✅ Safe text (tags dikhai denge)

        div.appendChild(input);
        div.appendChild(label);
        quizBox.appendChild(div);
    });

    // Buttons
    backBtn.disabled = currentQ === 0;
    nextBtn.classList.toggle("d-none", currentQ === questions.length - 1);
    submitBtn.classList.toggle("d-none", currentQ !== questions.length - 1);
}

// ✅ Save selected option
function saveAnswer() {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) {
        userAnswers[currentQ] = parseInt(selected.value);
    }
}

// ✅ Next button
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    }
});

// ✅ Back button
backBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
});

// ✅ Submit button
submitBtn.addEventListener("click", () => {
    saveAnswer();
    let score = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });
    quizBox.innerHTML = "";
    backBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    result.innerHTML = `🎉 Your Score: ${score} / ${questions.length}`;
});

// ✅ First question load
loadQuestion();

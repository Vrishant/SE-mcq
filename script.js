// document.addEventListener('DOMContentLoaded', () => {
//     const sampleJsonData = '';
//     // NEW: Updated sample JSON data in the new format
//     async function loadSampleData() {
//         errorMessage.textContent = '';
//         try {
//             // 1. Give the order and get a tracking number (Promise)
//             const response = await fetch('./sample.json');

//             // 2. WAIT for the package to arrive and open it
//             const data = await response.json();

//             // 3. NOW you have the actual data, not a promise!
//             sampleJsonData = data;
//             startQuiz();

//         } catch (error) {
//             errorMessage.textContent = `Error: Could not load sample.json.`;
//             console.error("Fetch error:", error);
//         }
//     };


//     // DOM Elements
//     const setupContainer = document.getElementById('setup-container');
//     const quizContainer = document.getElementById('quiz-container');
//     const resultContainer = document.getElementById('result-container');

//     const jsonInput = document.getElementById('json-input');
//     const fileInput = document.getElementById('json-file');
//     const startBtn = document.getElementById('start-btn');
//     const loadSampleBtn = document.getElementById('load-sample-btn');
//     const errorMessage = document.getElementById('error-message');

//     const progressText = document.getElementById('progress-text');
//     const questionText = document.getElementById('question-text');
//     const optionsContainer = document.getElementById('options-container');
//     const nextBtn = document.getElementById('next-btn');

//     const resultText = document.getElementById('result-text');
//     const restartBtn = document.getElementById('restart-btn');
//     const reviewContainer = document.getElementById('review-container');

//     // State
//     let questions = [];
//     let userAnswers = [];
//     let currentQuestionIndex = 0;
//     let score = 0;

//     // --- EVENT LISTENERS ---
//     startBtn.addEventListener('click', loadQuestions);
//     loadSampleBtn.addEventListener('click', loadSampleData);
//     fileInput.addEventListener('change', handleFileUpload);
//     nextBtn.addEventListener('click', showNextQuestion);
//     restartBtn.addEventListener('click', restartQuiz);
    
//     optionsContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('option-btn')) {
//             checkAnswer(event.target);
//         }
//     });

//     // --- FUNCTIONS ---
//     // function loadSampleData() {
//     //     jsonInput.value = sampleJsonData;
//     //     loadQuestions();
//     // }

//     function handleFileUpload(event) {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             jsonInput.value = e.target.result;
//         };
//         reader.readAsText(file);
//     }

//     function loadQuestions() {
//         errorMessage.textContent = '';
//         const jsonContent = jsonInput.value.trim();
//         if (!jsonContent) {
//             errorMessage.textContent = 'Error: Please paste JSON or upload a file.';
//             return;
//         }

//         try {
//             const parsedJson = JSON.parse(jsonContent);
//             if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
//                  throw new Error("JSON must be a non-empty array.");
//             }
//             questions = parsedJson;
//             startQuiz();
//         } catch (error) {
//             errorMessage.textContent = `Error: Invalid JSON format. ${error.message}`;
//         }
//     }

//     function startQuiz() {
//         currentQuestionIndex = 0;
//         score = 0;
//         userAnswers = [];
//         setupContainer.classList.add('hidden');
//         resultContainer.classList.add('hidden');
//         quizContainer.classList.remove('hidden');
//         nextBtn.classList.add('hidden');
//         displayQuestion();
//     }
    
//     function displayQuestion() {
//         optionsContainer.innerHTML = ''; 
//         const currentQuestion = questions[currentQuestionIndex];
        
//         progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
//         questionText.textContent = currentQuestion.question;

//         currentQuestion.options.forEach(option => {
//             const button = document.createElement('button');
//             button.textContent = option;
//             button.classList.add('option-btn');
//             optionsContainer.appendChild(button);
//         });
        
//         nextBtn.classList.add('hidden');
//     }

//     /**
//      * MODIFIED: Checks answer based on the option's starting letter (A, B, C...).
//      */
//     function checkAnswer(selectedButton) {
//         const selectedAnswerText = selectedButton.textContent;
//         const selectedKey = selectedAnswerText.charAt(0); // e.g., 'A', 'B'
        
//         const currentQuestion = questions[currentQuestionIndex];
//         const correctKey = currentQuestion.answer;

//         userAnswers[currentQuestionIndex] = selectedAnswerText; // Store the full answer text
        
//         Array.from(optionsContainer.children).forEach(button => {
//             button.disabled = true;
//             // Highlight the correct answer by checking if its text starts with the correct letter
//             if (button.textContent.startsWith(correctKey + '.')) {
//                 button.classList.add('correct');
//             }
//         });

//         if (selectedKey === correctKey) {
//             score++;
//         } else {
//             selectedButton.classList.add('incorrect');
//         }

//         nextBtn.classList.remove('hidden');
//     }

//     function showNextQuestion() {
//         currentQuestionIndex++;
//         if (currentQuestionIndex < questions.length) {
//             displayQuestion();
//         } else {
//             showResults();
//         }
//     }
    
//     function showResults() {
//         quizContainer.classList.add('hidden');
//         resultContainer.classList.remove('hidden');
//         resultText.textContent = `Quiz Completed! You scored ${score} out of ${questions.length}.`;
//         displayReview();
//     }
    
//     /**
//      * MODIFIED: Displays the review based on the new format.
//      */
//     function displayReview() {
//         reviewContainer.innerHTML = '';
//         const reviewTitle = document.createElement('h3');
//         reviewTitle.textContent = 'Review Your Answers';
//         reviewContainer.appendChild(reviewTitle);

//         questions.forEach((question, index) => {
//             const userAnswerText = userAnswers[index];
//             const correctKey = question.answer;
//             const userKey = userAnswerText ? userAnswerText.charAt(0) : null;
//             const isCorrect = userKey === correctKey;

//             const questionBlock = document.createElement('div');
//             questionBlock.classList.add('review-question-block');

//             const questionTitle = document.createElement('p');
//             questionTitle.textContent = `${index + 1}. ${question.question}`;
//             questionBlock.appendChild(questionTitle);
            
//             const optionsDiv = document.createElement('div');
//             optionsDiv.classList.add('review-options');

//             question.options.forEach(option => {
//                 const optionDiv = document.createElement('div');
//                 optionDiv.classList.add('review-option');
                
//                 const optionTextSpan = document.createElement('span');
//                 optionTextSpan.textContent = option;
//                 optionDiv.appendChild(optionTextSpan);

//                 // Highlight the correct option
//                 if (option.startsWith(correctKey + '.')) {
//                     optionDiv.classList.add('correct');
//                 }
                
//                 // Highlight the user's chosen option
//                 if (option === userAnswerText) {
//                     const userLabel = document.createElement('span');
//                     userLabel.textContent = isCorrect ? 'Your Answer (Correct)' : 'Your Answer (Incorrect)';
//                     userLabel.classList.add('review-label');
//                     optionDiv.appendChild(userLabel);
                    
//                     if (!isCorrect) {
//                         optionDiv.classList.add('user-incorrect');
//                     }
//                 }
                
//                 optionsDiv.appendChild(optionDiv);
//             });

//             questionBlock.appendChild(optionsDiv);
//             reviewContainer.appendChild(questionBlock);
//         });
//     }

//     function restartQuiz() {
//         resultContainer.classList.add('hidden');
//         reviewContainer.innerHTML = '';
//         setupContainer.classList.remove('hidden');
//         jsonInput.value = '';
//         fileInput.value = '';
//         questions = [];
//         userAnswers = [];
//     }
// });



document.addEventListener('DOMContentLoaded', () => {
    // State
    let sampleJsonData = '';
    let questions = [];
    let userAnswers = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // --- DOM Elements ---
    const setupContainer = document.getElementById('setup-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');

    const jsonInput = document.getElementById('json-input');
    const fileInput = document.getElementById('json-file');
    const startBtn = document.getElementById('start-btn');
    const loadSampleBtn = document.getElementById('load-sample-btn');
    const errorMessage = document.getElementById('error-message');

    const progressText = document.getElementById('progress-text');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');

    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');
    const reviewContainer = document.getElementById('review-container');

    // --- EVENT LISTENERS ---
    startBtn.addEventListener('click', loadQuestions);
    loadSampleBtn.addEventListener('click', fetchSampleData);
    fileInput.addEventListener('change', handleFileUpload);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-btn')) {
            checkAnswer(event.target);
        }
    });

    // --- FUNCTIONS ---

    // Load sample.json via fetch
    async function fetchSampleData() {
        errorMessage.textContent = '';
        try {
            const response = await fetch('./sample.json');
            const data = await response.json();
            sampleJsonData = JSON.stringify(data, null, 2);
            jsonInput.value = sampleJsonData;
            loadQuestions();
        } catch (error) {
            errorMessage.textContent = `Error: Could not load sample.json.`;
            console.error("Fetch error:", error);
        }
    }

    function normalizeOption(optionText) {
        // Remove "A. ", "B. " etc. if present
        return optionText.replace(/^[A-D]\.\s*/, '').trim();
    }


    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            jsonInput.value = e.target.result;
        };
        reader.readAsText(file);
    }

    function loadQuestions() {
        errorMessage.textContent = '';
        const jsonContent = jsonInput.value.trim();
        if (!jsonContent) {
            errorMessage.textContent = 'Error: Please paste JSON or upload a file.';
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonContent);
            if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
                throw new Error("JSON must be a non-empty array.");
            }
            questions = parsedJson;
            startQuiz();
        } catch (error) {
            errorMessage.textContent = `Error: Invalid JSON format. ${error.message}`;
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        setupContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        displayQuestion();
    }

    function displayQuestion() {
        optionsContainer.innerHTML = '';
        const currentQuestion = questions[currentQuestionIndex];

        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionText.textContent = currentQuestion.question;

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsContainer.appendChild(button);
        });

        nextBtn.classList.add('hidden');
    }

    // function checkAnswer(selectedButton) {
    //     const selectedAnswerText = selectedButton.textContent;
    //     const selectedKey = selectedAnswerText.charAt(0); // 'A', 'B', etc.

    //     const currentQuestion = questions[currentQuestionIndex];
    //     const correctKey = currentQuestion.answer;

    //     userAnswers[currentQuestionIndex] = selectedAnswerText;

    //     Array.from(optionsContainer.children).forEach(button => {
    //         button.disabled = true;
    //         if (button.textContent.startsWith(correctKey + '.')) {
    //             button.classList.add('correct');
    //         }
    //     });

    //     if (selectedKey === correctKey) {
    //         score++;
    //     } else {
    //         selectedButton.classList.add('incorrect');
    //     }

    //     nextBtn.classList.remove('hidden');
    // }

    function checkAnswer(selectedButton) {
        const selectedAnswerText = selectedButton.textContent;
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswerText = currentQuestion.answer;

        userAnswers[currentQuestionIndex] = selectedAnswerText;

        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;

            // Compare normalized text
            if (normalizeOption(button.textContent) === correctAnswerText) {
                button.classList.add('correct');
            }
        });

        if (normalizeOption(selectedAnswerText) === correctAnswerText) {
            score++;
        } else {
            selectedButton.classList.add('incorrect');
        }

        nextBtn.classList.remove('hidden');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultText.textContent = `Quiz Completed! You scored ${score} out of ${questions.length}.`;
        displayReview();
    }

    function displayReview() {
        reviewContainer.innerHTML = '';
        const reviewTitle = document.createElement('h3');
        reviewTitle.textContent = 'Review Your Answers';
        reviewContainer.appendChild(reviewTitle);

        questions.forEach((question, index) => {
            const userAnswerText = userAnswers[index];
            const correctKey = question.answer;
            const userKey = userAnswerText ? userAnswerText.charAt(0) : null;
            const isCorrect = userKey === correctKey;

            const questionBlock = document.createElement('div');
            questionBlock.classList.add('review-question-block');

            const questionTitle = document.createElement('p');
            questionTitle.textContent = `${index + 1}. ${question.question}`;
            questionBlock.appendChild(questionTitle);

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('review-options');

            question.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('review-option');

                const optionTextSpan = document.createElement('span');
                optionTextSpan.textContent = option;
                optionDiv.appendChild(optionTextSpan);

                // if (option.startsWith(correctKey + '.')) {
                //     optionDiv.classList.add('correct');
                // }
                if (normalizeOption(option) === correctKey) {
                    optionDiv.classList.add('correct');
                }



                if (option === userAnswerText) {
                    const userLabel = document.createElement('span');
                    userLabel.textContent = isCorrect ? 'Your Answer (Correct)' : 'Your Answer (Incorrect)';
                    userLabel.classList.add('review-label');
                    optionDiv.appendChild(userLabel);

                    if (!isCorrect) {
                        optionDiv.classList.add('user-incorrect');
                    }
                }

                optionsDiv.appendChild(optionDiv);
            });

            questionBlock.appendChild(optionsDiv);
            reviewContainer.appendChild(questionBlock);
        });
    }

    function restartQuiz() {
        resultContainer.classList.add('hidden');
        reviewContainer.innerHTML = '';
        setupContainer.classList.remove('hidden');
        jsonInput.value = '';
        fileInput.value = '';
        questions = [];
        userAnswers = [];
    }
});

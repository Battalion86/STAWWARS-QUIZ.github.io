const quizData = [
    // define a dictionary type data with key-value pair
    {
        question: "In which movie did emporer palpatine release order 66",
        options: ["The revenge of the sith", "Attack of the clones", "The empire strikes back", "A new hope"],
        answer: "The revenge of the sith"
    },

    {
        question: "Which space behemot is the biggest?",
        options: ["TIE bomber", "Death star", "Millenium Falcon", "Starkiller base"],
        answer: "Starkiller base"
    },

    {
        question: "Name one of the weapons the Mandalorian carried?",
        options: ["basic rifle", "lightsaber", "Gatler", "IB-94 blaster"],
        answer: "IB-94 blaster"
    },

    {
        question: "Which Jedi was thrown of the window?",
        options: ["Anakin", "Obi-Wan", "Mace Windu", "Ahsoka"],
        answer: "Mace Windu"
    },

    {
        question: "What transport do Tusken raiders use?",
        options: ["Bantha's", "Speeder", "Shuttles", "None of the above"],
        answer: "Bantha's"
    },

    {
        question: "In which series did the stormtroopers rise from the dead?",
        options: ["AHSOKA", "THE MANDOLARIAN", "STARWARS REBELS", "NONE OF THE ABOVE"],
        answer: "AHSOKA"
    }
];


const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const timertext = document.getElementById('countdown');
const progressBarContainer = document.getElementById('progress-bar-container')
const progressBar = document.getElementById('progress-bar')
const optionsElement = document.getElementById('option-container')
const resultElement = document.getElementById('result');


let currentQuestion = 0;
let score = 0;

progressBar.style.width = '0%';



startButton.addEventListener('click', startQuiz);


function startQuiz()
{

    startButton.style.display = 'none';
    progressBarContainer.style.display = 'block'; // to show progressbar container
    loadQuestion();
}

function loadQuestion()
{   
    clearInterval(timer);

    if(currentQuestion < quizData. length)
    {
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // set initial countdown value 
        timertext.textContent = 20;

        //remove all prevoius buttons
        optionsElement.innerHTML = '';

        //clone a button for each question
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        //start the countdown for the current question
        timer = setInterval(() => {
            timertext.textContent = parseInt(timertext.textContent) - 1;
            if(parseInt(timertext.textContent) === 0)
            {
                // reset timer for the next question
                clearInterval(timer);
                
                //Raise currentQuestion variable by 1
                currentQuestion = currentQuestion + 1;

                loadQuestion(); 
            }
        }, 500);     
    } else {
        endquiz();
    }
}

function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];

    if(option === currentQuizData.answer)
    {
        score = score + 1;
    }

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}   

function endquiz()
{
    progressBarContainer.style.display = 'none';
    timerElement.style.display = 'none';
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
}
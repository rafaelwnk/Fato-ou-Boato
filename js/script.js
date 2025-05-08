const question = document.querySelector('.question');
const buttonTrue = document.querySelector('.true');
const buttonFalse = document.querySelector('.false');
const playAgain = document.querySelector('.play-again');

const cache = new Map();

let questions = [];
let correctAnswer;
let numberQuestion = parseInt(sessionStorage.getItem('number_question')) || 0;
let levelPassed = false;

const fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
        .catch(error => console.error('Erro ao buscar dados:', error));

    const data = await response.json();
    return data;
}

const fetchQuestion = async (tk) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=20&type=boolean&token=${tk}`)
        .catch(error => console.error('Erro ao buscar dados:', error));

    const data = await response.json();
    return data;
}

const fetchTranslate = async (question) => {
    if (cache.has(question)) return { responseData: { translatedText: cache.get(question) } };

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${question}&langpair=en|pt-br&de=fatoouboato.dev@gmail.com`)
        .catch(error => console.error('Erro ao buscar dados:', error));

    const data = await response.json();
    cache.set(question, data.responseData.translatedText);
    return data
}

const renderQuestion = async () => {
    let token = sessionStorage.getItem('token');

    if (!token) {
        const data = await fetchToken();
        token = data.token;
        sessionStorage.setItem('token', token);
    }

    const data = await fetchQuestion(token);
    return data;
}

const questionHandler = async () => {
    if (numberQuestion > 19 || questions.length === 0) {
        questions.length = 0;
        numberQuestion = 0;
        try {
            const data = await renderQuestion();
            questions = data.results;
            drawQuestion();
        } catch {
            question.innerHTML = 'Erro ao carregar as questões. Tente novamente daqui a pouco.';
            return
        }
    } else {
        drawQuestion();
    }
}

const translatedQuestionHandler = async () => {
    const decodedQuestion = document.createElement("div");
    decodedQuestion.innerHTML = questions[numberQuestion].question;
    const translatedQuestion = await fetchTranslate(decodedQuestion.textContent);

    return translatedQuestion.responseData.translatedText;
}

const drawQuestion = async () => {
    playAgain.style.visibility = 'hidden';
    const translatedQuestion = await translatedQuestionHandler();
    question.innerHTML = translatedQuestion;
    correctAnswer = questions[numberQuestion].correct_answer;
    question.style.color = 'white';
}

buttonTrue.addEventListener('click', (event) => {
    event.preventDefault();
    if (!levelPassed) {
        if (correctAnswer == 'True') {
            question.innerHTML = 'ACERTOU!';
            question.style.color = 'green';
        } else {
            question.innerHTML = 'ERROU!';
            question.style.color = 'red';
        }
        playAgain.style.visibility = 'visible';
        numberQuestion++;
        sessionStorage.setItem('number_question', numberQuestion);
        levelPassed = true;
    }
});

buttonFalse.addEventListener('click', (event) => {
    event.preventDefault();
    if (!levelPassed) {
        if (correctAnswer == 'False') {
            question.innerHTML = 'ACERTOU!';
            question.style.color = 'green';
        } else {
            question.innerHTML = 'ERROU!';
            question.style.color = 'red';
        }
        playAgain.style.visibility = 'visible';
        numberQuestion++;
        sessionStorage.setItem('number_question', numberQuestion);
        levelPassed = true;
    }
});

playAgain.addEventListener('click', (event) => {
    event.preventDefault();
    levelPassed = false;
    questionHandler();
});

questionHandler();
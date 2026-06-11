const questions = [
    {
        question: "Какой пароль считается безопасным?",
        options: [
            "123456",
            "qwerty",
            "Kj8$mP!2xL",
            "Дата рождения"
        ],
        correct: 2
    },
    {
        question: "Что категорически не рекомендуется делать при работе в интернете, чтобы избежать заражения вредоносным ПО?",
        options: [
            "Читать новости на проверенных сайтах",
            "Скачивать программы с торрентов и подозрительных ресурсов",
            "Использовать антивирус",
            "Обновлять браузер"
        ],
        correct: 1
    },
    {
        question: "Как называется вид мошенничества, при котором злоумышленники маскируются под доверенные организации, чтобы выманить личные данные?",
        options: [
            "Спам",
            "Фишинг",
            "Хакерство",
            "Майнинг"
        ],
        correct: 1
    },
    {
        question: "На что стоит обратить особое внимание в адресе отправителя электронного письма, чтобы распознать фишинг?",
        options: [
            "На наличие смайликов",
            "На длину письма",
            "На опечатки или странные домены (например, sberbank-support.ru вместо sberbank.ru)",
            "На тему письма"
        ],
        correct: 2
    },
    {
        question: "Какой из перечисленных методов обмана используется злоумышленниками для манипуляции людьми и получения доступа к конфиденциальной информации?",
        options: [
            "Социальная инженерия",
            "Шифрование данных",
            "Резервное копирование",
            "Двухфакторная аутентификация"
        ],
        correct: 0
    },
    {
        question: "Почему важно регулярно устанавливать обновления операционной системы и приложений?",
        options: [
            "Чтобы изменить дизайн интерфейса",
            "Чтобы закрыть уязвимости безопасности",
            "Чтобы увеличить скорость интернета",
            "Это не обязательно"
        ],
        correct: 1
    },
    {
        question: "Что следует делать, если вы получили письмо от «банка» или «службы поддержки», в котором просят срочно перейти по ссылке и ввести логин/пароль?",
        options: [
            "Срочно перейти и ввести данные",
            "Переслать письмо друзьям",
            "Проигнорировать письмо и самостоятельно зайти на официальный сайт банка",
            "Ответить на письмо с вопросом"
        ],
        correct: 2
    },
    {
        question: "Что обычно делает антивирусная программа при обнаружении подозрительного файла или активности?",
        options: [
            "Удаляет весь жесткий диск",
            "Отправляет файл разработчикам игры",
            "Блокирует или помещает файл в карантин",
            "Ничего не делает"
        ],
        correct: 2
    },
    {
        question: "Что такое «социальная инженерия» в сфере кибербезопасности?",
        options: [
            "Проектирование социальных сетей",
            "Метод манипуляции людьми для получения секретной информации",
            "Изучение поведения роботов",
            "Создание вирусов"
        ],
        correct: 1
    },
    {
        question: "Зачем необходимо создавать резервные копии важных файлов?",
        options: [
            "Чтобы занять место на диске",
            "Чтобы восстановить данные в случае потери, поломки или вируса-шифровальщика",
            "Чтобы показать их хакерам",
            "Это не нужно"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswering = false;
let startTime;
let timerInterval;

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    startTime = Date.now();
    startTimer();
    loadQuestion();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').innerText = `${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
}

function getFormattedTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function loadQuestion() {
    isAnswering = false;
    const q = questions[currentQuestionIndex];
    
    document.getElementById('question-counter').innerText = `Вопрос ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    if (isAnswering) return;
    isAnswering = true;
    
    const q = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    if (selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        score++;
        updateScore();
    } else {
        btnElement.classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateScore() {
    const scoreEl = document.getElementById('score-display');
    if (scoreEl) {
        scoreEl.innerText = `Баллы: ${score}`;
    }
}

function showResults() {
    stopTimer();
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const finalScoreEl = document.getElementById('final-score');
    finalScoreEl.innerText = `${score} / ${questions.length}`;
    
    document.getElementById('final-time').innerText = getFormattedTime();
    
    const bestScoreKey = 'cyber_quiz_best_score';
    let bestScore = localStorage.getItem(bestScoreKey) || 0;
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem(bestScoreKey, bestScore);
    }
    
    document.getElementById('best-score').innerText = `Лучший результат: ${bestScore}`;
}

function restartQuiz() {
    startQuiz();
}

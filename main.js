// Seleção de Elementos das Telas
const welcomeScreen = document.getElementById('welcome-screen');
const generatorScreen = document.getElementById('generator-screen');
const btnEnter = document.getElementById('btn-enter');

// Seleção de Controles do Gerador
const passwordOutput = document.getElementById('password-output');
const charCount = document.getElementById('char-count');
const charVal = document.getElementById('char-val');
const btnGenerate = document.getElementById('btn-generate');
const strengthPointer = document.getElementById('strength-pointer');

// Elementos do Checklist
const chkUpper = document.getElementById('chk-upper');
const chkLower = document.getElementById('chk-lower');
const chkNumbers = document.getElementById('chk-numbers');
const chkSymbols = document.getElementById('chk-symbols');

// Bancos de dados de caracteres
const keys = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// --- Transição de Tela ---
btnEnter.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    generatorScreen.classList.remove('hidden');
});

// --- Atualizar Contador de Caracteres Virtual ---
charCount.addEventListener('input', (e) => {
    charVal.textContent = e.target.value;
});

// --- Lógica de Geração da Senha ---
function generatePassword() {
    let charset = '';
    
    if (chkUpper.checked) charset += keys.upper;
    if (chkLower.checked) charset += keys.lower;
    if (chkNumbers.checked) charset += keys.numbers;
    if (chkSymbols.checked) charset += keys.symbols;

    // Proteção caso nenhuma caixinha esteja marcada
    if (charset === '') {
        passwordOutput.value = '';
        updateStrength(0);
        return;
    }

    let length = parseInt(charCount.value);
    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
    }

    passwordOutput.value = generatedPassword;
    evaluateStrength(generatedPassword);
}

// --- Medidor de Força (Movimento Esquerda -> Direita) ---
function evaluateStrength(password) {
    if (!password) {
        updateStrength(0);
        return;
    }

    let score = 0;

    // Critérios de avaliação
    if (password.length >= 8) score += 1;
    if (password.length >= 14) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Mapear pontuação (0 a 6) para a porcentagem do ponteiro (0% a 92%)
    // Usamos 92% no máximo para o ponteiro não vazar para fora da barra
    let percentage = (score / 6) * 92;
    updateStrength(percentage);
}

function updateStrength(percentage) {
    strengthPointer.style.left = `${percentage}%`;
}

// --- Eventos Ativos ---

// Gerar ao clicar no botão solicitado
btnGenerate.addEventListener('click', generatePassword);

// Permitir que o usuário digite sua própria senha e a barra responda em tempo real
passwordOutput.addEventListener('input', (e) => {
    evaluateStrength(e.target.value);
});
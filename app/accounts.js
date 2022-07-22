const axios = require("axios");
const http = require("http");
const readline = require('readline-sync');

const options = {
    host: 'api.sgcp.sp.gov.br',
    headers: { 'Content-Type': 'application/json' },
    httpAgent: new http.Agent({ keepAlive: true }),
};

console.log(`\n[SGCP API - Via Rápida Contas]`);
console.log(`[Desenvolvido por @ryahpalma]`);
console.log(`[Busca máxima: 200 Contas]`);

const userIdBegin = readline.question(`\nID inicial: `);
const userIdEnd = parseInt(userIdBegin) + 200
const minAge = readline.question(`Idade minima: `);
const maxAge = readline.question(`Idade maxima: `);
const gender = readline.question(`Sexo F/M/O: `);

console.log(`\nBuscando contas...\n`);

for (let userId = userIdBegin; userId <= userIdEnd; userId++) {
    axios
        .get(
            'https://api.sgcp.sp.gov.br/api/v1/candidato/viaRapida/dadosCadastrais/' + userId, options
        )
        .then((res) => {
            const yearBirth = res.data.pessoaFisica.dataNascimento.slice(0, 10);
            const currentAge = Math.floor((new Date() - new Date(yearBirth).getTime()) / 3.15576e+10)

            if (res.data.pessoaFisica.genero == gender.toUpperCase() && currentAge >= minAge && currentAge <= maxAge) {
                console.log(`MÃE: ${res.data.nomeMae.toUpperCase()}`);
                console.log(`WHATSAPP: https://wa.me/55${res.data.pessoaFisica.telefone.numero}`);
                console.log(`CONTA: ${userId}`);
                console.log(`NÚMERO: ${res.data.pessoaFisica.telefone.numero}`);
                console.log(`IDADE: ${currentAge}`);
                console.log(`NASCIMENTO: ${yearBirth}`);
                console.log(`SEXO: ${res.data.pessoaFisica.genero}\n`);
            }
        })
        .catch((err) => {
            return err;
        });
};

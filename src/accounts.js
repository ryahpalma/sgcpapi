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
console.log(`Busca máxima: [100 Contas]`);

let userIdInitial = readline.question(`\nUsuario inicial: `);
let userIdFinal = parseInt(userIdInitial) + 100
let minAge = readline.question(`Idade minima: `);
let maxAge = readline.question(`Idade maxima: `);

console.log(`\nBuscando contas...\n`);

for (let userId = userIdInitial; userId <= userIdFinal; userId++) {
    axios
        .get(
            'https://api.sgcp.sp.gov.br/api/v1/candidato/viaRapida/dadosCadastrais/' + userId, options
        )
        .then((response) => {
            const yearBirth = response.data.pessoaFisica.dataNascimento.slice(0, 4);
            const currentAge = Math.floor((new Date() - new Date(yearBirth).getTime()) / 3.15576e+10)

            if (currentAge >= minAge && currentAge <= maxAge) {
                console.log(`MÃE: ${response.data.nomeMae.toUpperCase()}\nCONTA: ${userId}\nNÚMERO: ${response.data.pessoaFisica.telefone.numero}\nIDADE: ${currentAge}\nSEXO: ${response.data.pessoaFisica.genero}\n\n`);
            }
        })
        .catch((error) => {
            return;
        });
};

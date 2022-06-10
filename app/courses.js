const cities = require("../src/cities.json");
const axios  = require("axios");
const http   = require("http");

const options = {
  host: 'api.sgcp.sp.gov.br',
  headers: { 'Content-Type': 'application/json' },
  httpAgent: new http.Agent({ keepAlive: true }),
};

console.log(`\n[SGCP API - Via Rápida Cursos]`);
console.log(`[Desenvolvido por @ryahpalma]`);
console.log(`\nLembre-se de verificar o e-mail toda terça-feira`);
console.log(`\nBuscando cursos disponíveis...`);

cities.forEach(city => {
  axios
    .get(
      'http://api.sgcp.sp.gov.br/api/v1/cursoQualificacao/turmasAbertas?idModalidade=1&idMunicipio=' + city.id, options
    )
    .then((res) => {
      const courses = res.data.map(course => {
        return {
          name: course.nome,
          workload: course.cargaHoraria,
          subscription: course.imagem.hasInscricoesAbertas,
        }
      });
      if (res.data.length > 1) {
        console.log(`\nBusca feita em ${city.name}`);
        courses.forEach((course) => {
          console.log(`Curso: [${course.name}] com carga horária de ${course.workload} horas`);
        });
      }
    })
    .catch((err) => {
      return err;
    });
});

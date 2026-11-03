const MIN = 1;
const MAX = 100;

let inicio;
let fim;
let tentativas;

function mostrar(id) {
  document.getElementById(id).classList.remove("hidden");
}

function esconder(id) {
  document.getElementById(id).classList.add("hidden");
}

function iniciarJogo() {
  inicio = MIN;
  fim = MAX;
  tentativas = 1;

  esconder("menu");
  esconder("comparacao");
  mostrar("jogo");

  atualizarChute();
  document.getElementById("mensagem").textContent =
    "Pense no seu número e responda usando os botões.";
}

function atualizarChute() {
  const chute = Math.floor((inicio + fim) / 2);
  document.getElementById("chute").textContent = chute;
  document.getElementById("tentativas").textContent = tentativas;
}

function responder(resposta) {
  const chute = Math.floor((inicio + fim) / 2);

  if (resposta === "acertou") {
    document.getElementById("mensagem").textContent =
      `🎉 Acertei em ${tentativas} tentativa(s)!`;
    return;
  }

  if (resposta === "maior") {
    inicio = chute + 1;
  } else if (resposta === "menor") {
    fim = chute - 1;
  }

  if (inicio > fim) {
    document.getElementById("mensagem").textContent =
      "🤔 Alguma resposta foi inconsistente. Vamos tentar de novo?";
    return;
  }

  tentativas++;
  atualizarChute();
}

function buscaSequencial(segredo) {
  let tentativas = 0;

  for (let chute = MIN; chute <= MAX; chute++) {
    tentativas++;

    if (chute === segredo) {
      return tentativas;
    }
  }

  return tentativas;
}

function buscaBinaria(segredo) {
  let inicio = MIN;
  let fim = MAX;
  let tentativas = 0;

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    tentativas++;

    if (meio === segredo) {
      return tentativas;
    }

    if (meio < segredo) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return tentativas;
}

function compararEstrategias() {
  let piorSeq = 0;
  let piorBin = 0;
  let somaSeq = 0;
  let somaBin = 0;

  for (let segredo = MIN; segredo <= MAX; segredo++) {
    const s = buscaSequencial(segredo);
    const b = buscaBinaria(segredo);

    if (s > piorSeq) piorSeq = s;
    if (b > piorBin) piorBin = b;

    somaSeq += s;
    somaBin += b;
  }

  const total = MAX - MIN + 1;
  const mediaSeq = somaSeq / total;
  const mediaBin = somaBin / total;

  const segredo = Math.floor(Math.random() * 100) + 1;

  document.getElementById("resultadoComparacao").innerHTML = `
    <p><strong>Testando todos os números de 1 a 100:</strong></p>

    <table>
      <tr>
        <th>Estratégia</th>
        <th>Pior caso</th>
        <th>Média</th>
      </tr>
      <tr>
        <td>Sem estratégia</td>
        <td>${piorSeq}</td>
        <td>${mediaSeq.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Busca Binária</td>
        <td>${piorBin}</td>
        <td>${mediaBin.toFixed(2)}</td>
      </tr>
    </table>

    <p><strong>Exemplo aleatório:</strong> número secreto = ${segredo}</p>
    <p>Sem estratégia: ${buscaSequencial(segredo)} tentativa(s)</p>
    <p>Busca Binária: ${buscaBinaria(segredo)} tentativa(s)</p>

    <p>💡 A busca binária é mais eficiente porque divide o intervalo ao meio a cada rodada.</p>
  `;

  esconder("menu");
  esconder("jogo");
  mostrar("comparacao");
}

function voltarMenu() {
  esconder("jogo");
  esconder("comparacao");
  mostrar("menu");
}

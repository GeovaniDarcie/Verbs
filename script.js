  let verbos = [
    { infinitivo: 'Find', passadoSimples: 'Found', participioPassado: 'Found', traducao: 'Encontrar' },
    { infinitivo: 'Know', passadoSimples: 'Knew', participioPassado: 'Known', traducao: 'Conhecer' },
    { infinitivo: 'Sell', passadoSimples: 'Sold', participioPassado: 'Sold', traducao: 'Vender' },
    { infinitivo: 'Cut', passadoSimples: 'Cut', participioPassado: 'Cut', traducao: 'Cortar' },
    { infinitivo: 'Hurt', passadoSimples: 'Hurt', participioPassado: 'Hurt', traducao: 'Machucar' },
    { infinitivo: 'Begin', passadoSimples: 'Began', participioPassado: 'Begun', traducao: 'Começar' },
    { infinitivo: 'Bite', passadoSimples: 'Bit', participioPassado: 'Bitten', traducao: 'Morder' },
    { infinitivo: 'Bring', passadoSimples: 'Brought', participioPassado: 'Brought', traducao: 'Trazer' },
    { infinitivo: 'Let', passadoSimples: 'Let', participioPassado: 'Let', traducao: 'Permitir' },
    { infinitivo: 'Put', passadoSimples: 'Put', participioPassado: 'Put', traducao: 'Colocar' },
    { infinitivo: 'Quit', passadoSimples: 'Quit', participioPassado: 'Quit', traducao: 'Sair' },
    { infinitivo: 'Read', passadoSimples: 'Read', participioPassado: 'Read', traducao: 'Ler' },
    { infinitivo: 'Drink', passadoSimples: 'Drank', participioPassado: 'Drunk', traducao: 'Beber' },
    { infinitivo: 'Forgive', passadoSimples: 'Forgave', participioPassado: 'Forgiven', traducao: 'Perdoar' },
    { infinitivo: 'Give', passadoSimples: 'Gave', participioPassado: 'Given', traducao: 'Dar' },
    { infinitivo: 'Sing', passadoSimples: 'Sang', participioPassado: 'Sung', traducao: 'Cantar' },
    { infinitivo: 'Swim', passadoSimples: 'Swam', participioPassado: 'Swum', traducao: 'Nadar' },
    { infinitivo: 'Run', passadoSimples: 'Ran', participioPassado: 'Run', traducao: 'Correr' },
    { infinitivo: 'Feed', passadoSimples: 'Fed', participioPassado: 'Fed', traducao: 'Alimentar' },
    { infinitivo: 'Hide', passadoSimples: 'Hid', participioPassado: 'Hidden', traducao: 'Esconder' },
    { infinitivo: 'Slide', passadoSimples: 'Slid', participioPassado: 'Slid', traducao: 'Escorregar' },
    { infinitivo: 'Buy', passadoSimples: 'Bought', participioPassado: 'Bought', traducao: 'Comprar' },
    { infinitivo: 'Fight', passadoSimples: 'Fought', participioPassado: 'Fought', traducao: 'Lutar' },
    { infinitivo: 'Think', passadoSimples: 'Thought', participioPassado: 'Thought', traducao: 'Pensar' },
    { infinitivo: 'Catch', passadoSimples: 'Caught', participioPassado: 'Caught', traducao: 'Capturar' },
    { infinitivo: 'Blow', passadoSimples: 'Blew', participioPassado: 'Blown', traducao: 'Assoprar' },
    { infinitivo: 'Draw', passadoSimples: 'Drew', participioPassado: 'Drawn', traducao: 'Desenhar' }
  ];

let estatisticas = [{
  verbo: '',
  acertos: 0,
  erros: 0,
  ajudas: 0
}]

let graficoPizza = null;
let verbosPratica = [];

document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      Verificar();
  }
});

document.getElementById("lampada").addEventListener("click", (e) => {
  const valor = document.getElementById("verbo").innerText;
  const jogo = document.getElementById("tempo-verbal");

  if (e.currentTarget.style.opacity == 1){
    e.currentTarget.style.opacity = 0.3;
    document.getElementById("input").value = "";
    return;
  } else {
    e.currentTarget.style.opacity = 1;
  }
  
  inserirEstatistica(valor, 'ajuda');
  inserirGrafico();

  let verboEncontradoIndex = verbos.findIndex(v => v.infinitivo.toLowerCase().trim() === valor.toLowerCase().trim());
  let resposta;

  if (jogo.innerText == 'Passado:')
    resposta = verbos[verboEncontradoIndex].passadoSimples;
  else if (jogo.innerText == 'Particípio Passado:')
    resposta = verbos[verboEncontradoIndex].participioPassado;
  else if (jogo.innerText == 'Tradução:')
    resposta = verbos[verboEncontradoIndex].traducao;

  document.getElementById("input").value = resposta;
});

document.getElementById("autofalante").addEventListener("click", async () => {
  const word = document.getElementById("verbo").innerText.toLowerCase();
  const url = `https://wordnik-api.vercel.app/api/audio?word=${word}`;
  const audioDiv = document.getElementById('autofalante');
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data != null) {
      const audioUrl = data.audioUrl;
      if (audioUrl != undefined){
        const audio = new Audio(audioUrl);
        audio.play();
        audioDiv.innerHTML = `
          <span>🔊</span>`;
          
      } else{
        audioDiv.innerHTML = `<span>❌</span>`;;
      }
    } else {
      audioDiv.innerHTML = `<span>❌</span>`;;
    }
  } catch (error) {
    audioDiv.innerHTML = '<span>❌</span>';
    console.error(error);
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
  audioDiv.innerHTML = `
  <span>🔈</span>`;
});

function definirCor(indice){
  const corPassado = '#e0f7fa';
  const corParticipioPassado = '#eee0d1';
  const corTraducao = '#fff9c4';

  const cores = [corPassado, corParticipioPassado, corTraducao];
  return cores[indice];
}

function definirJogo(indice){
  const jogo = ['Passado:', 'Particípio Passado:', 'Tradução:'];
  return jogo[indice];
}
  
function Verificar() {
  const lampada = document.getElementById("lampada");
  const verbo = document.getElementById("verbo");
  const input = document.getElementById("input");
  const card = document.getElementById("card");
  const valor = input.value.trim().toLowerCase();
  const jogo = document.getElementById("tempo-verbal");
  let verboEncontrado;

  if (jogo.innerText == 'Passado:')
    verboEncontrado = verbos.find(v => v.passadoSimples.toLowerCase() === valor)
  else if (jogo.innerText == 'Particípio Passado:')
    verboEncontrado = verbos.find(v => v.participioPassado.toLowerCase() === valor)
  else if (jogo.innerText == 'Tradução:')
    verboEncontrado = verbos.find(v => v.traducao.toLowerCase() === valor)

  if (verboEncontrado) {
    const proximoVerboIndice = Math.floor(Math.random() * verbos.length);
    inserirEstatistica(verbo.innerText, 'acerto');
    inserirGrafico();
    verbo.innerHTML = verbos[proximoVerboIndice].infinitivo;
    input.value = "";
    card.classList.add('success');
    setTimeout(() => card.classList.remove('success'), 800);
    const indiceProximoJogo = Math.floor(Math.random() * 3);
    card.style.backgroundColor = definirCor(indiceProximoJogo);
    jogo.innerHTML = definirJogo(indiceProximoJogo);
    lampada.style.opacity = 0.3;
  } else {
    card.classList.add('error');
    inserirEstatistica(verbo.innerText, 'erro');
    inserirGrafico();
    setTimeout(() => card.classList.remove('error'), 800);
    input.value = "";
  }
}

function inserirEstatistica(valor, acao) {
  let indexEstatisticas = estatisticas.findIndex(e => e.verbo == valor);
  if (indexEstatisticas != -1){
    if (acao == 'acerto' && estatisticas[indexEstatisticas].acertos > 0)
      estatisticas[indexEstatisticas].acertos++;
    else if (acao == 'acerto')
      estatisticas[indexEstatisticas].acertos = 1;

    if (acao == 'erro' && estatisticas[indexEstatisticas].erros > 0)
      estatisticas[indexEstatisticas].erros++;
    else if (acao == 'erro')
      estatisticas[indexEstatisticas].erros = 1;

    if (acao == 'ajuda' && estatisticas[indexEstatisticas].ajudas > 0)
      estatisticas[indexEstatisticas].ajudas++;
    else if (acao == 'ajuda')
      estatisticas[indexEstatisticas].ajudas = 1;
  } else {
    if (acao == 'acerto')
      estatisticas.push({ verbo: valor, acertos: 1, erros: 0, ajudas: 0 });

    if (acao == 'erro')
      estatisticas.push({ verbo: valor, erros: 1, acertos: 0, ajudas: 0 });

    if (acao == 'ajuda')
      estatisticas.push({ verbo: valor, ajudas: 1, acertos: 0, erros: 0 });
  }

}

function abrirAba(nome) {
  document.querySelectorAll('.aba').forEach(el => el.classList.remove('ativa'));
  document.getElementById(nome).classList.add('ativa');

  document.querySelectorAll('nav ul li').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${nome}`).classList.add('active');

  if (nome == 'estatistica')
    GerarListaVerbosEstatisticas(3);
}

function verificaFlip(event) {
  console.log('flip')
  if (event.key === 'Enter' || event.type == 'click') {
    document.querySelector('.flip-card').classList.add('flipped');
  }
}

function salvarVerbo(event) {
  if (event.type === 'click') {
    const novoVerbo = {
      infinitivo: document.getElementById('novoInfinitivo').value.trim(),
      passadoSimples: document.getElementById('novoPassado').value.trim(),
      participioPassado: document.getElementById('novoParticipio').value.trim(),
      traducao: document.getElementById('novaTraducao').value.trim()
    };

    AdicionarVerboLista(novoVerbo)
    if (novoVerbo.infinitivo && novoVerbo.passadoSimples && novoVerbo.participioPassado && novoVerbo.traducao) {
      document.getElementById('mensagemSalvo').innerText = `Verbo "${novoVerbo.infinitivo} / ${novoVerbo.passadoSimples} - ${novoVerbo.participioPassado} - ${novoVerbo.traducao}" adicionado!`;

      document.getElementById('novoInfinitivo').value = '';
      document.getElementById('novoPassado').value = '';
      document.getElementById('novoParticipio').value = '';
      document.getElementById('novaTraducao').value = '';
      document.querySelector('.flip-card').classList.remove('flipped');
      document.getElementById('novoPresente').focus();

      console.log(verbos)
    }
  }
}

function AdicionarVerboLista(novoVerbo) {
  if (novoVerbo.infinitivo && novoVerbo.passadoSimples && novoVerbo.participioPassado && novoVerbo.traducao) {
    verbos.push(novoVerbo);
    localStorage.removeItem('meuArraySalvo');
    let arrayJSON = JSON.stringify(verbos);
    localStorage.setItem('meuArraySalvo', arrayJSON);
    document.getElementById('mensagemSalvo').innerText = `Verbo "${novoVerbo.infinitivo} / ${novoVerbo.passadoSimples}" adicionado!`;

    document.getElementById('novoInfinitivo').value = '';
    document.getElementById('novoPassado').value = '';
    document.getElementById('novoParticipio').value = '';
    document.getElementById('novaTraducao').value = '';
    document.getElementById('novoInfinitivo').focus();

    GerarListaVerbos();
  }
}

Inicio();
function Inicio(){
  if (localStorage.getItem('meuArraySalvo') != null)
    verbos = JSON.parse(localStorage.getItem('meuArraySalvo'));

  if (localStorage.getItem('estatisticas') != null)
    estatisticas = JSON.parse(localStorage.getItem('estatisticas'));
  
  inserirGrafico();
  GerarListaVerbos();
  const card = document.getElementById("card");
  const jogo = document.getElementById("tempo-verbal");

  const verbo = document.getElementById("verbo");
  const proximoVerboIndice = Math.floor(Math.random() * verbos.length);
  verbo.innerHTML = verbos[proximoVerboIndice].infinitivo;

  const indiceProximoJogo = Math.floor(Math.random() * 3);
  card.style.backgroundColor = definirCor(indiceProximoJogo);
  jogo.innerHTML = definirJogo(indiceProximoJogo);
}

function GerarListaVerbos(){
  const lista = document.getElementById("listaVerbos");
  lista.innerHTML = '';

  verbos.forEach(verbo => {
    const li = document.createElement("li");
    li.textContent = verbo.infinitivo;
    li.style.cursor = 'pointer';

    li.addEventListener("click", () => {
      if (li.querySelector("ul")) {
        li.removeChild(li.querySelector("ul")); 
        return;
      }

      const subLista = document.createElement("ul");
      subLista.style.marginTop = "5px";

      const passado = document.createElement("li");
      passado.textContent = `Passado: ${verbo.passadoSimples}`;

      const participio = document.createElement("li");
      participio.textContent = `Particípio: ${verbo.participioPassado}`;

      const traducao = document.createElement("li");
      traducao.textContent = `Tradução: ${verbo.traducao}`;

      subLista.appendChild(passado);
      subLista.appendChild(participio);
      subLista.appendChild(traducao);

      li.appendChild(subLista);
    });

    lista.appendChild(li);
  });
}

function inserirGrafico() {
  const ctx = document.getElementById('graficoPizza').getContext('2d');

  localStorage.removeItem('estatisticas');
  let indexVerboVazio = estatisticas.findIndex(e => e.verbo == '');
  if (indexVerboVazio != -1)
    estatisticas.splice(indexVerboVazio, 1);
  let arrayJSON = JSON.stringify(estatisticas);
  localStorage.setItem('estatisticas', arrayJSON);

  let total = estatisticas.reduce((soma, e) => {
    return soma + e.acertos + e.erros + e.ajudas;
  }, 0);
  let totalAjuda = estatisticas.reduce((soma, e) => soma + e.ajudas, 0);
  let totalErros = estatisticas.reduce((soma, e) => soma + e.erros, 0);
  let totalAcertos = estatisticas.reduce((soma, e) => soma + e.acertos, 0);

  const porcentagens = {
    amarelo: (totalAjuda / total) * 100,
    vermelho: (totalErros / total) * 100,
    verde: (totalAcertos / total) * 100
  };

  const dados = {
    labels: ['Ajudas', 'Erros', 'Acertos'],
    datasets: [{
      data: [porcentagens.amarelo, porcentagens.vermelho, porcentagens.verde], 
      backgroundColor: ['#ffef5e', '#fc5b6b', '#63ff69'],
      borderWidth: 1
    }]
  };

  if (graficoPizza) {
    graficoPizza.destroy();
  }

  graficoPizza = new Chart(ctx, {
    type: 'pie',
    data: dados,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = dados.labels[index];
          const valor = dados.datasets[0].data[index];
          GerarListaVerbosEstatisticas(index)
        }
      }
    }
  });
}

function GerarListaVerbosEstatisticas(index) {
  const lista = document.getElementById("listaVerbosEstatisticas");
  lista.innerHTML = '';

  let verbosFiltrados = [];
  let displayValue = {
    acerto: '',
    erro: '',
    ajuda: ''
  }

  if (index === 0) {
    verbosFiltrados = estatisticas.filter(e => e.ajudas > 0).sort((a, b) => b.ajudas - a.ajudas);
    displayValue.acerto = 'none'
    displayValue.erro = 'none';
    displayValue.ajuda = '';
  } else if (index === 1) {
    verbosFiltrados = estatisticas.filter(e => e.erros > 0).sort((a, b) => b.erros - a.erros);
    displayValue.acerto = 'none'
    displayValue.erro = '';
    displayValue.ajuda = 'none';
  } else if (index === 2) {
    displayValue.acerto = ''
    displayValue.erro = 'none';
    displayValue.ajuda = 'none';
    verbosFiltrados = estatisticas.filter(e => e.acertos > 0).sort((a, b) => b.acertos - a.acertos);
  } else if (index == 3){
    verbosFiltrados = estatisticas.sort((a, b) => b.acertos - a.acertos);;
  }

  verbosPratica = [];

  verbosFiltrados.forEach(est => {
    const verbo = verbos.find(v => v.infinitivo === est.verbo);
    verbosPratica.push(verbo);
    if (!verbo) return; 

    const li = document.createElement("li");
    li.innerHTML = `
      <strong id="listaVerbosEstatisticas ">${verbo.infinitivo}</strong>
       <span class="estatisticas">
        <span style="display: ${displayValue.acerto}" class="acertos">✔️ ${est.acertos}</span>
        <span style="display: ${displayValue.erro}" class="erros">❌ ${est.erros}</span>
        <span style="display: ${displayValue.ajuda}" class="ajudas">💡 ${est.ajudas}</span>
      </span>
    `;
    li.style.cursor = 'pointer';

    li.addEventListener("click", () => {
      let esta = li.querySelector("span");
      if (li.querySelector("ul")) {
        li.removeChild(li.querySelector("ul")); 
        esta.style.display = '';
        return;
      }

      esta.style.display = 'none';

      const subLista = document.createElement("ul");
      subLista.style.marginTop = "5px";

      const passado = document.createElement("li");
      passado.textContent = `Passado: ${verbo.passadoSimples}`;

      const participio = document.createElement("li");
      participio.textContent = `Particípio: ${verbo.participioPassado}`;

      const traducao = document.createElement("li");
      traducao.textContent = `Tradução: ${verbo.traducao}`;

      subLista.appendChild(passado);
      subLista.appendChild(participio);
      subLista.appendChild(traducao);

      li.appendChild(subLista);
    });

    lista.appendChild(li);
  });
}

function praticar(){
  if (verbosPratica.length > 0){
    const verbo = document.getElementById("verbo");
    verbo.innerHTML = verbosPratica[0].infinitivo;
  }
  const card = document.getElementById("card");
  const adicionar = document.getElementById("tab-add");
  const lista = document.getElementById("tab-lista");
  const estatistica = document.getElementById("tab-estatistica");
  const jogo = document.getElementById("tab-jogo");
  const header = document.querySelector("header");

  document.body.style.backgroundImage = "url('fundo.png')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  const botao = document.createElement("button");
  botao.innerText = "Sair🔥👁️";
  botao.onclick = function () {
    location.reload();
  };
  card.appendChild(botao);

  abrirAba('jogo');
  jogo.style.backgroundColor = '#a60707';
  header.style.backgroundColor = '#8f2828';
  header.style.backgroundImage = "url('fundo.png')";
  adicionar.style.display = 'none';
  lista.style.display = 'none';
  estatistica.style.display = 'none';
}



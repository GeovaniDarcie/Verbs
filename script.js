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
  

document.getElementById("input").addEventListener("keydown", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    Verificar();
}
});

document.getElementById("lampada").addEventListener("click", () => {
  const valor = document.getElementById("verbo").innerText;
  const jogo = document.getElementById("tempo-verbal");

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

function definirCor(indice){
  const corPassado = '#e0f7fa';
  const corParticipioPassado = '#eee0d1';
  const corTraducao = '#fff9c4';

  const cores = [corPassado, corParticipioPassado, corTraducao];
  console.log(cores[indice])
  return cores[indice];
}

function definirJogo(indice){
  const jogo = ['Passado:', 'Particípio Passado:', 'Tradução:'];
  return jogo[indice];
}
  
function Verificar() {
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
    verbo.innerHTML = verbos[proximoVerboIndice].infinitivo;
    input.value = "";
    card.classList.add('success');
    setTimeout(() => card.classList.remove('success'), 800);
    const indiceProximoJogo = Math.floor(Math.random() * 3);
    card.style.backgroundColor = definirCor(indiceProximoJogo);
    jogo.innerHTML = definirJogo(indiceProximoJogo);
  } else {
    card.classList.add('error');
    setTimeout(() => card.classList.remove('error'), 800);
    input.value = "";
  }
}

function abrirAba(nome) {
  document.querySelectorAll('.aba').forEach(el => el.classList.remove('ativa'));
  document.getElementById(nome).classList.add('ativa');

  document.querySelectorAll('nav ul li').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${nome}`).classList.add('active');
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
  
  GerarListaVerbos();
  const card = document.getElementById("card");
  const jogo = document.getElementById("tempo-verbal");

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


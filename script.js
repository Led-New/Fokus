const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const BaneApp = document.querySelector('.app__image')
const Pausebane = document.querySelector('.app__card-primary-butto-icon')
const IniciaouPausebane = document.querySelector('.app__card-primary-butto-icon')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicasFocoBt = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const startpauseBt = document.querySelector('#start-pause')
const iniciarOuPausaBt = document.querySelector('#start-pause span')
const start = new Audio('sons/play.wav')
const pause = new Audio('sons/pause.mp3')
const beep = new Audio('sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicasFocoBt.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longBt.classList.add('active')
})

function alterarContexto(contexto) {
    MostraTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    BaneApp.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `     Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        beep.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    MostraTempo()
}
startpauseBt,addEventListener( 'click', iniciarOuPausar)

function zerar() {
    clearInterval(intervaloId) 
    intervaloId = null
    iniciarOuPausaBt.textContent = "Começar"
    IniciaouPausebane.setAttribute('src', `imagens/play_arrow.png`)
}
function iniciarOuPausar() {
    if(intervaloId){
        pause.play();
        zerar()
        return
    }
    start.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausaBt.textContent = "Pausar"
    IniciaouPausebane.setAttribute('src', `imagens/pause.png`)
}
function MostraTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempofomartado = tempo.toLocaleTimeString('pt-br', {minute : '2-digit', second : '2-digit'})
    tempoNaTela.innerHTML = `${tempofomartado}`
}
MostraTempo()
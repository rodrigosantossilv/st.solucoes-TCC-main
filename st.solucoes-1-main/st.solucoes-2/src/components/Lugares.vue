<template>
    <div class="sala-container">
      <!-- Lado esquerdo com imagem e gradiente -->
      <div class="left-side">
        <img src="/images/ST.png" alt="Logotipo" />
        <img src="/images/circulos.png" alt="Imagem de fundo" class="corner-img">
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>
  
      <!-- Lado direito com o formulário -->
      <div class="right-side">
        <div class="sala-box">
          <h2 class="sala-titulo">Escolha o seu lugar</h2>
          <div class="sala">
            <div
              v-for="lugar in lugares"
              :key="lugar.id"
              :class="['lugar', { selecionado: lugar.selecionado }]"
              @click="toggleSelecao(lugar.id)"
            >
              {{ lugar.fileira }}-{{ lugar.coluna }}
            </div>
          </div>
          <button class="btn-submit">Confirmar Seleção</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SalaVirtual',
    data() {
      return {
        numFileiras: 8, // Total de fileiras
        numLugaresPorFileira: [1, 7, 7, 7, 7, 7, 7, 7], // Lugares por fileira
        lugaresSelecionados: [] // Armazena os lugares selecionados
      };
    },
    computed: {
      lugares() {
        const lugares = [];
        this.numLugaresPorFileira.forEach((numLugares, i) => {
          for (let j = 0; j < numLugares; j++) {
            lugares.push({
              id: `${i}-${j}`,
              fileira: i + 1,
              coluna: j + 1,
              selecionado: this.lugaresSelecionados.includes(`${i}-${j}`)
            });
          }
        });
        return lugares;
      }
    },
    methods: {
      toggleSelecao(lugarId) {
        const index = this.lugaresSelecionados.indexOf(lugarId);
        if (index > -1) {
          this.lugaresSelecionados.splice(index, 1); // Desselecionar
        } else {
          this.lugaresSelecionados.push(lugarId); // Selecionar
        }
        this.salvarSelecao();
      },
      salvarSelecao() {
        console.log('Lugares selecionados:', this.lugaresSelecionados);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Reset básico */
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
  
  /* Container de seleção */
  .sala-container {
    display: flex;
    height: 100vh;
  }
  
  /* Lado esquerdo - Imagem com gradiente */
  .left-side {
    flex: 1;
    background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  /* Lado direito - Formulário de seleção */
  .right-side {
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Caixa de seleção */
  .sala-box {
    width: 85%;
    max-width: 550px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  /* Estilo do título */
  .sala-box h2 {
    margin-bottom: 20px;
    text-align: center;
    color: blue;
  }
  
  /* Sala de seleção - grid */
  .sala {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    gap: 10px;
    margin-bottom: 20px;
  }
  
  /* Estilo dos lugares */
  .lugar {
    width: 50px;
    height: 50px;
    background-color: #e0e0e0;
    border-radius: 10px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Lugar selecionado */
  .lugar.selecionado {
    background-color: #00ccff;
    color: white;
  }
  
  /* Botão de confirmação */
  .btn-submit {
    width: 100%;
    padding: 10px;
    background-color: rgb(8, 91, 143);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Efeito hover no botão */
  .btn-submit:hover {
    background-color: rgb(11, 55, 135);
  }
  
  /* Imagem no canto */
  .corner-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: auto;
  }
  
  /* Bubbles Animation */
  .bubbles {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
  }
  
  .bubble {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    animation: bubble 5s infinite;
  }
  
  .bubble:nth-child(1) {
    width: 60px;
    height: 60px;
    left: 10%;
    bottom: -100px;
    animation-duration: 7s;
  }
  
  .bubble:nth-child(2) {
    width: 100px;
    height: 100px;
    left: 30%;
    bottom: -150px;
    animation-duration: 9s;
  }
  
  .bubble:nth-child(3) {
    width: 80px;
    height: 80px;
    left: 50%;
    bottom: -200px;
    animation-duration: 6s;
  }
  
  .bubble:nth-child(4) {
    width: 120px;
    height: 120px;
    left: 70%;
    bottom: -250px;
    animation-duration: 8s;
  }
  
  .bubble:nth-child(5) {
    width: 90px;
    height: 90px;
    left: 80%;
    bottom: -300px;
    animation-duration: 10s;
  }
  
  @keyframes bubble {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-1000px) scale(0);
      opacity: 0;
    }
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .sala-container {
      flex-direction: column;
    }
  
    .left-side {
      display: none;
    }
  
    .right-side {
      flex: 1;
    }
  
    .corner-img {
      display: none;
    }
  }
  </style>
  
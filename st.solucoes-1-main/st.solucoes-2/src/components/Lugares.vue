<template>
    <!-- Template para a Sala Virtual -->
    <div class="sala">
      <!-- A estrutura dos lugares será gerada dinamicamente pelo Vue -->
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
      // Cria uma matriz de lugares com base em numLugaresPorFileira
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
      // Alterna o estado de seleção do lugar
      toggleSelecao(lugarId) {
        const index = this.lugaresSelecionados.indexOf(lugarId);
        if (index > -1) {
          this.lugaresSelecionados.splice(index, 1);
        } else {
          this.lugaresSelecionados.push(lugarId);
        }
        this.salvarSelecao();
      },
      // Salva a seleção dos lugares
      salvarSelecao() {
        console.log('Lugares selecionados:', this.lugaresSelecionados);
        // Aqui você pode adicionar o código para salvar a informação, por exemplo, enviar para um servidor
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para o corpo da página */
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }
  
  /* Estilos para o contêiner da sala */
  .sala {
    display: grid;
    grid-template-columns: 50px 50px 100px 50px 50px 50px 50px 50px; /* Adiciona 100px de espaço entre a 3ª e a 4ª coluna */
    grid-template-rows: repeat(8, 50px);
    gap: 5px;
  }
  
  /* Estilos para cada lugar */
  .lugar {
    width: 50px;
    height: 50px;
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  /* Estilos para os lugares selecionados */
  .lugar.selecionado {
    background-color: #00ccff;
    color: white;
  }
  </style>
  
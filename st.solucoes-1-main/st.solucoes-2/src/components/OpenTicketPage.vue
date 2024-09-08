<template>
  <div class="login-container">
    <div class="left-side">
      <img src="/images/ST.png" alt="Logotipo" />
      <img src="/images/circulos.png" alt="Circles" class="corner-img" />
    </div>

    <div class="right-side">
      <div class="login-box">
        <h2>Informe seu problema</h2>

        <b-form @submit.prevent="reportProblem">
          <b-form-group label="Bloco da sala*" label-for="bloco">
            <b-form-input v-model="bloco" id="bloco" required></b-form-input>
          </b-form-group>

          <b-form-group label="Número da sala*" label-for="numero-sala">
            <b-form-input v-model="numeroSala" id="numero-sala" required></b-form-input>
          </b-form-group>

          <b-form-group label="Código da máquina*" label-for="codigo-maquina">
            <b-form-input v-model="codigoMaquina" id="codigo-maquina" required></b-form-input>
          </b-form-group>

          <b-form-group label="Relatar problema*" label-for="relatar-problema">
            <b-form-textarea v-model="relatarProblema" id="relatar-problema" rows="4" required></b-form-textarea>
          </b-form-group>

          <b-form-group label="Categoria" label-for="categoria">
            <b-form-select v-model="categoria" id="categoria">
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="rede">Rede</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
            </b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Relatar Problema</b-button>

          <div id="feedback" class="mt-2">
            <b-alert v-if="feedbackMessage" :variant="feedbackVariant">{{ feedbackMessage }}</b-alert>
          </div>
        </b-form>

        <div class="text-center mt-3">
          <router-link to="/" class="btn btn-link">Voltar à página inicial</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { BForm, BFormGroup, BFormInput, BFormTextarea, BFormSelect, BButton, BAlert } from 'bootstrap-vue-3';

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormSelect,
    BButton,
    BAlert
  },
  data() {
    return {
      bloco: '',
      numeroSala: '',
      codigoMaquina: '',
      relatarProblema: '',
      categoria: '',  // Adicionando a variável para a categoria
      feedbackMessage: '',
      feedbackVariant: ''
    };
  },
  methods: {
    async reportProblem() {
      // Validação de entrada adicional
      if (this.bloco && this.numeroSala && this.codigoMaquina && this.relatarProblema) {
        const sanitizedProblem = this.sanitizeInput(this.relatarProblema);

        try {
          const response = await fetch('http://localhost:3000/report-problem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bloco: this.bloco,
              numeroSala: this.numeroSala,
              codigoMaquina: this.codigoMaquina,
              relatarProblema: sanitizedProblem,
              categoria: this.categoria  // Adicionando a categoria no corpo da requisição
            })
          });

          if (response.ok) {
            this.feedbackMessage = 'Seu problema foi relatado com sucesso!';
            this.feedbackVariant = 'success';
            Swal.fire({
              title: 'Ótimo trabalho!',
              text: 'Seu problema foi relatado com sucesso!',
              icon: 'success'
            });
            this.resetForm();
          } else {
            const data = await response.json();
            this.feedbackMessage = `Erro ao relatar problema: ${data.error}`;
            this.feedbackVariant = 'danger';
            Swal.fire({
              title: 'Erro!',
              text: 'Houve um problema ao relatar o seu problema. Tente novamente mais tarde.',
              icon: 'error'
            });
          }
        } catch (error) {
          this.feedbackMessage = `Erro ao conectar ao servidor: ${error.message}`;
          this.feedbackVariant = 'danger';
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao conectar ao servidor: ' + error.message,
            icon: 'error'
          });
        }
      } else {
        Swal.fire({
          title: 'Aviso!',
          text: 'Por favor, preencha todos os campos.',
          icon: 'warning'
        });
      }
    },
    sanitizeInput(input) {
      // Função de sanitização simples para remover caracteres indesejados
      return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    resetForm() {
      this.bloco = '';
      this.numeroSala = '';
      this.codigoMaquina = '';
      this.relatarProblema = '';
      this.categoria = '';  // Resetando a categoria
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

/* Container de login */
.login-container {
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

/* Lado direito - Formulário de login */
.right-side {
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Caixa de login */
.login-box {
    width: 85%;
    max-width: 400px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Estilo do título */
.login-box h2 {
    margin-bottom: 20px;
    text-align: center;
    color: blue;
}

/* Estilo dos inputs */
.login-box input,
.login-box textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
}

/* Botão de login */
.login-box button {
    width: 100%;
    padding: 11px;
    background-color: rgb(8, 91, 143);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Efeito de hover no botão */
.login-box button:hover {
    background-color: rgb(11, 55, 135);
}

/* Estilo do link "Crie uma" */
.login-box .btn-link {
    color: rgb(8, 91, 143);
    text-decoration: none;
}

.login-box .btn-link:hover {
    text-decoration: underline;
}

/* Imagem no canto */
.corner-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: auto;
}

/* Responsividade adicional */
@media (max-width: 768px) {
    .login-container {
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

/* Adiciona o container das bolhas e define a posição */
.bubbles {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Faz com que as bolhas não interfiram na interação com o formulário */
    overflow: hidden; /* Garante que as bolhas não saiam da área visível */
}

/* Define o estilo das bolhas */
.bubble {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 123, 255, 0.153); /* Cor das bolhas */
    border-radius: 50%;
    animation: float 10s infinite;
    opacity: 0;
}

/* Animação das bolhas */
@keyframes float {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    50% {
        transform: translateY(-50vh) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) scale(0);
        opacity: 0;
    }
}

/* Posiciona as bolhas em locais aleatórios e diferentes tamanhos dentro do lado direito */
.bubbles .bubble:nth-child(1) {
    right: 5%;
    animation-duration: 8s;
    animation-delay: 0s;
}
.bubbles .bubble:nth-child(2) {
    right: 10%;
    animation-duration: 10s;
    animation-delay: 2s;
}
.bubbles .bubble:nth-child(3) {
    right: 15%;
    animation-duration: 12s;
    animation-delay: 4s;
}
.bubbles .bubble:nth-child(4) {
    right: 20%;
    animation-duration: 15s;
    animation-delay: 6s;
}
.bubbles .bubble:nth-child(5) {
    right: 25%;
    animation-duration: 20s;
    animation-delay: 9s;
}
</style>

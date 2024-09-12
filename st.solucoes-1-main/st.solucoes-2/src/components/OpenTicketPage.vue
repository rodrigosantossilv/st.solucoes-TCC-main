<template>
  <div class="login-container">
    <div class="left-side">
      <!-- Container das bolhas -->
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <!-- Imagem do logotipo -->
      <img src="/images/ST.png" alt="Logotipo" />
      <!-- Imagem no canto -->
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

          <b-form-group label="Selecionar Sala*" label-for="SelecionarMaquina*">
            <b-form-select v-model="categoria" id="SelecionarMaquina" @change="navigateToLugar">
              <option value="" disabled selected>Selecione uma Sala</option>
              <option value="salaum">Sala 1</option>
              <option value="saladois">Sala 2</option>
              <option value="salatres">Sala 3</option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Selecionar Máquina*" label-for="selecionar-maquina">
            <b-form-input v-model="codigoMaquina" id="selecionar-maquina" required></b-form-input>
          </b-form-group>

          <b-form-group label="Relatar problema*" label-for="relatar-problema">
            <b-form-textarea v-model="relatarProblema" id="relatar-problema" rows="4" required></b-form-textarea>
          </b-form-group>

          <b-form-group label="Categoria*" label-for="categoria">
            <b-form-select v-model="categoriaProblema" id="categoria">
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="rede">Rede</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="infraestrutura">Infraestrutura</option>
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
import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormSelect,
  BButton,
  BAlert
} from 'bootstrap-vue-3';

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
      categoria: '',  // Categoria para a seleção de sala
      categoriaProblema: '',  // Categoria do problema (rede, hardware, software)
      feedbackMessage: '',
      feedbackVariant: ''
    };
  },
  methods: {
    navigateToLugar() {
      if (this.categoria === 'salaum') {
        this.$router.push('/lugar');  // Redireciona para a rota /lugar
      }
    },
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
              categoria: this.categoriaProblema  // Categoria do problema
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
      this.categoria = '';  // Resetando a categoria de sala
      this.categoriaProblema = '';  // Resetando a categoria do problema
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

/* Container de registro */
.login-container {
  display: flex;
  height: 100vh;
  position: relative; /* Necessário para a posição absoluta das bolhas */
}

/* Lado esquerdo - Imagem com gradiente e bolhas */
.left-side {
  flex: 1;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* Garante que as bolhas fiquem dentro do lado esquerdo */
}

/* Lado direito - Formulário de registro */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Caixa de registro */
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

/* Estilo dos inputs e textarea */
.login-box input,
.login-box textarea,
.login-box select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

/* Botão de envio */
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

/* Estilo do link */
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

/* Animação das bolhas no lado esquerdo */
.bubbles {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1; /* Garante que as bolhas fiquem atrás do conteúdo principal */
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2); /* Cor sutil para as bolhas */
  animation: bubble 5s infinite; /* Animação contínua */
}

/* Ajuste das bolhas no lado esquerdo */
.left-side .bubbles .bubble:nth-child(1) {
  width: 60px;
  height: 60px;
  left: 10%;
  bottom: -100px;
  animation-duration: 7s;
}

.left-side .bubbles .bubble:nth-child(2) {
  width: 100px;
  height: 100px;
  left: 30%;
  bottom: -150px;
  animation-duration: 9s;
}

.left-side .bubbles .bubble:nth-child(3) {
  width: 80px;
  height: 80px;
  left: 50%;
  bottom: -200px;
  animation-duration: 6s;
}

.left-side .bubbles .bubble:nth-child(4) {
  width: 120px;
  height: 120px;
  left: 70%;
  bottom: -250px;
  animation-duration: 8s;
}

.left-side .bubbles .bubble:nth-child(5) {
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

</style>

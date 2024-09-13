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
        <h2>Ola ,Informe seu problema</h2>

        <b-form-group label="Categoria*" label-for="categoria">
            <b-form-select v-model="categoriaProblema" id="categoria">
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="rede">Internet</option>
              <option value="hardware">Computador</option>
              <option value="software">Programas</option>
            </b-form-select>
          </b-form-group>
          
        <b-form-group label="Bloco da sala*" label-for="blocodasala">
            <b-form-select v-model="blocodaSala" id="blocodasala">
              <option value="" disabled selected>Selecione um Bloco da sala</option>
              <option value="BlocoE">Bloco E</option>
              <option value="Noa">NOA</option>
              <option value="BlocoE">Bloco E</option>
              <option value="BlocoC">Bloco C</option>
              <option value="BlocoF">Bloco F</option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Número da sala*" label-for="numerodasala">
            <b-form-select v-model="numerodaSala" id="numerodasala">
              <option value="" disabled selected>Selecione o Número da Sala</option>
              <option value="BlocoE1">Bloco E ,sala 1</option>
              <option value="BlocoE2">Bloco E ,sala 2</option>
              <option value="BlocoE3">Bloco E ,sala 3</option>
              <option value="BlocoE4">Bloco E ,sala 4</option>
              <option value="BlocoE5">Bloco E ,sala 5</option>
              <option value="BlocoE6">Bloco E ,sala 6</option>
              <option value="BlocoE7">Bloco E ,sala 7</option>
              <option value="BlocoE8">Bloco E ,sala 8</option>
              <option value="BlocoE9">Bloco E ,sala 9</option>
              <option value="BlocoE10">Bloco E ,sala10</option>

              <option value="BlocoC1">Bloco C ,sala 1</option>
              <option value="BlocoC2">Bloco C ,sala 2</option>
              <option value="BlocoC3">Bloco C ,sala 3</option>
              <option value="BlocoC4">Bloco C ,sala 4</option>
              <option value="BlocoC5">Bloco C ,sala 5</option>
              <option value="BlocoC6">Bloco C ,sala 6</option>
              <option value="BlocoC7">Bloco C ,sala 7</option> 
              <option value="BlocoC8">Bloco C ,sala 8</option>
              <option value="BlocoC9">Bloco C ,sala 9</option>
            


              <option value="BlocoF11">Bloco F ,sala 11</option>
              <option value="BlocoF13">Bloco F ,sala 13</option>
              <option value="BlocoF15">Bloco F ,sala 15</option>
              <option value="BlocoF18">Bloco F ,sala 18</option>
            </b-form-select>
          </b-form-group>

      <!-- Botão "Selecionar Máquina" -->
      <b-form-group label="Selecionar Maquina" label-for="SelecionarMaquina">
          <b-button id="SelecionarMaquina" variant="primary" @click="navigateToLugar">
            Selecionar Máquina
          </b-button>
        </b-form-group>


        

         
          <b-form-group label="Relatar problema*" label-for="relatar-problema">
            <b-form-textarea v-model="relatarProblema" id="relatar-problema" rows="4" required></b-form-textarea>
          </b-form-group>


          <b-button type="submit" variant="primary">Relatar Problema</b-button>

        

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
  BFormTextarea,
  BFormSelect,
  BButton
} from 'bootstrap-vue-3';

export default {
  components: {
    BForm,
    BFormGroup,
    BFormTextarea,
    BFormSelect,
    BButton
  },
  data() {
    return {
      categoriaProblema: '',
      blocodaSala: '',
      numerodaSala: '',
      relatarProblema: ''
    };
  },
  methods: {
    navigateToLugar() {
      // Certifique-se de que esta rota existe e está configurada no Vue Router
      this.$router.push('/lugar');
    },
    async reportProblem() {
      // Validação e relatórios do problema
      if (this.blocodaSala && this.numerodaSala && this.relatarProblema) {
        const sanitizedProblem = this.sanitizeInput(this.relatarProblema);
        try {
          const response = await fetch('http://localhost:3000/report-problem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bloco: this.blocodaSala,
              numeroSala: this.numerodaSala,
              relatarProblema: sanitizedProblem,
              categoria: this.categoriaProblema
            })
          });

          if (response.ok) {
            this.resetForm();
            Swal.fire({
              title: 'Ótimo trabalho!',
              text: 'Seu problema foi relatado com sucesso!',
              icon: 'success'
            });
          } else {
            const data = await response.json();
            Swal.fire({
              title: 'Erro!',
              text: `Erro ao relatar problema: ${data.error}`,
              icon: 'error'
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Erro!',
            text: `Erro ao conectar ao servidor: ${error.message}`,
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
      return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    resetForm() {
      this.blocodaSala = '';
      this.numerodaSala = '';
      this.relatarProblema = '';
      this.categoriaProblema = '';
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
  max-width: 600px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Estilo do título */
.login-box h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #0738b3;
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
  background-color:  #02298A;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Efeito de hover no botão */
.login-box button:hover {
  background-color: #2059ea;
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

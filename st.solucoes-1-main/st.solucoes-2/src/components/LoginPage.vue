<template>
  <div>
    <!-- Tela de Login -->
    <div class="login-container">
      <div class="left-side">
        <img src="/images/ST.png" alt="Logotipo" />
        <img src="/images/circulos.png" alt="Circles" class="corner-img" />
        
        <!-- Bubbles Animation (opcional) -->
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>

      <div class="right-side">
        <div class="login-box">
          <h2>Bem-vindo!</h2>
          <input type="text" placeholder="Usuário" v-model="usuario" />
          <p v-if="usuarioInvalido" class="error-text">Usuário inválido!</p>
          <div class="password-container">
            <input :type="passwordFieldType" placeholder="Senha" v-model="password" />
            <i @click="togglePasswordVisibility" class="password-icon">
              <span v-if="passwordFieldType === 'password'">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </i>
          </div>
          <p v-if="senhaInvalida" class="error-text">Senha inválida!</p>
          <button @click="login">Login</button>
          <div class="text-center mt-3">
            <p class="mb-0">
              Não tem uma conta?
              <router-link to="/register" class="btn btn-link">Crie uma</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      usuario: '',
      password: '',
      usuarioInvalido: false,
      senhaInvalida: false,
      passwordFieldType: 'password',
    };
  },
  methods: {
    login() {
      // Resetar erros
      this.usuarioInvalido = false;
      this.senhaInvalida = false;

      // Simulação de verificação de usuário e senha
      if (this.usuario === '') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Usuário não encontrado! Se não tem uma conta, crie uma.',
        });
      } else if (this.usuario === 'admin' && this.password === '123456') {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: 'Bem-vindo ao sistema!',
        }).then(() => {
          // Redirecionar para o dashboard
          this.$router.push('/openticketpage');
        });
      } else if (this.usuario === 'admin1' && this.password === '123456') {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: 'Bem-vindo ao sistema!',
        }).then(() => {
          // Redirecionar para o dashboard
          this.$router.push('/kanbanboard');
        });
      } else if (this.usuario !== 'admin') {
        this.usuarioInvalido = true;
      } else {
        this.senhaInvalida = true;
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
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
  position: relative; /* Necessário para a posição absoluta das bolhas */
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
  position: relative; /* Necessário para a posição absoluta das bolhas */
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
.login-box input {
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

/* Contêiner e ícone da senha */
.password-container {
  position: relative;
}

.password-container input {
  padding-right: 40px; /* Ajuste para o espaço do ícone */
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
  user-select: none; /* Impede a seleção do texto do ícone */
  transition: color 0.3s, transform 0.3s;
}

.password-icon:hover {
  color: #000; /* Cor do ícone ao passar o mouse */
  transform: scale(1.2); /* Aumenta o tamanho do ícone ao passar o mouse */
}

/* Bubbles Animation */
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

/* Ajuste das bolhas */
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

</style>

<template>
  <div class="register-container">
    <div class="left-side">
      <img src="/images/ST.png" alt="Logotipo"/>
      <img src="/images/circulos.png" alt="Circles" class="corner-img"/>
    </div>

    <div class="right-side">
      <div class="register-box">
        <h2>Cadastrar</h2>

        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="nome" placeholder="Nome completo" required />
          <input type="text" v-model="instituicao" placeholder="Instituição de ensino" required />
          <input type="text" v-model="cep" placeholder="CEP" v-mask="'###.###.###-##'" @blur="fetchCep" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="email" v-model="confirmEmail" placeholder="Confirmar email" required />
          
          <div class="password-container">
            <input :type="senhaFieldType" v-model="senha" placeholder="Senha" required @paste.prevent />
            <i @click="toggleSenhaVisibility" class="password-icon">
              <span v-if="senhaFieldType === 'password'" class="icon">👁</span>
              <span v-else class="icon">👁</span>
            </i>
          </div>
          
          <div class="password-container">
            <input :type="confirmSenhaFieldType" v-model="confirmSenha" placeholder="Confirmar senha" required @paste.prevent />
            <i @click="toggleConfirmSenhaVisibility" class="password-icon">
              <span v-if="confirmSenhaFieldType === 'password'" class="icon">👁</span>
              <span v-else class="icon">👁</span>
            </i>
          </div>

          <button type="submit">Cadastrar</button>

          <div v-if="feedback" :class="{'text-success': isSuccess, 'text-danger': !isSuccess}" class="mt-2">
            {{ feedback }}
          </div>
        </form>

        <div class="text-center mt-3">
          <p class="mb-0">
            Já tem uma conta? 
            <router-link to="/" class="btn btn-link">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      instituicao: '',
      cep: '',
      email: '',
      confirmEmail: '',
      senha: '',
      confirmSenha: '',
      feedback: '',
      isSuccess: false,
      senhaFieldType: 'password',
      confirmSenhaFieldType: 'password',
    };
  },
  methods: {
    handleSubmit() {
      this.feedback = '';
      this.isSuccess = false;

      if (!this.email.includes('@')) {
        this.feedback = 'Email inválido';
        this.isSuccess = false;
        return;
      }

      if (this.email !== this.confirmEmail) {
        this.feedback = 'Os emails não coincidem';
        this.isSuccess = false;
        return;
      }

      if (this.senha.length < 8) {
        this.feedback = 'A senha deve ter pelo menos 8 caracteres';
        this.isSuccess = false;
        return;
      }

      if (this.senha !== this.confirmSenha) {
        this.feedback = 'As senhas não coincidem';
        this.isSuccess = false;
        return;
      }

      this.feedback = 'Cadastro realizado com sucesso!';
      this.isSuccess = true;
    },

    fetchCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 11) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              this.feedback = 'CEP não encontrado';
              this.isSuccess = false;
            } else {
              // Preencher os campos adicionais se necessário
              console.log(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
            }
          })
          .catch(() => {
            this.feedback = 'Erro ao buscar CEP';
            this.isSuccess = false;
          });
      }
    },
    
    toggleSenhaVisibility() {
      this.senhaFieldType = this.senhaFieldType === 'password' ? 'text' : 'password';
    },
    
    toggleConfirmSenhaVisibility() {
      this.confirmSenhaFieldType = this.confirmSenhaFieldType === 'password' ? 'text' : 'password';
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

/* Container de cadastro */
.register-container {
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

/* Lado direito - Formulário de cadastro */
.right-side {
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Caixa de cadastro */
.register-box {
    width: 85%;
    max-width: 400px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Estilo do título */
.register-box h2 {
    margin-bottom: 20px;
    text-align: center;
    color: blue;
}

/* Estilo dos inputs */
.register-box input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
}

/* Botão de cadastro */
.register-box button {
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
.register-box button:hover {
    background-color: rgb(11, 55, 135);
}

/* Estilo do link */
.register-box .btn-link {
    color: rgb(8, 91, 143);
    text-decoration: none;
}

.register-box .btn-link:hover {
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
    .register-container {
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

/* Bolhas flutuantes no lado direito */
.bubbles {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.bubble {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 123, 255, 0.153);
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

/* Bolhas com diferentes tamanhos e posições */
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

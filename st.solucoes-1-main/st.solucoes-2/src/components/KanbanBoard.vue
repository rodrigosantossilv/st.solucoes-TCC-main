<template>
  <div>
    <!-- Cabeçalho -->
    <header class="header">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="header-image" alt="Descrição da Imagem">
        <h1 class="header-title">Dashboard</h1>
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="main-container">
      <!-- Sidebar (Dashboard) -->
      <nav class="sidebar">
        <h2>Menu</h2>
        <ul class="nav-list">
          <li class="nav-item">
            <a @click="HomePage" href="Home" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarChamados" href="#" class="nav-link">Chamados</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Pendente')" href="#" class="nav-link">Pendentes</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Andamento')" href="#" class="nav-link">Andamentos</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Concluído')" href="#" class="nav-link">Concluídos</a>
          </li>
        </ul>
      </nav>

      <!-- Conteúdo da Página -->
      <main class="content">
        <!-- Área Home -->
        <div v-show="paginaAtual === 'home'" class="home-content">
          <Chart type="doughnut" :data="chartData" :options="chartOptions" class="chart" />
        </div>

        <!-- Kanban Board -->
        <div v-show="paginaAtual === 'kanban'" class="kanban-container">
          <!-- Coluna Pendente -->
          <div
            v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'"
            class="kanban-column pending"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
          >
            <h3 class="kanban-header">Pendentes</h3>
            <div
              v-for="chamado in chamadosPendentes"
              :key="chamado.id"
              class="kanban-item"
              draggable="true"
              @dragstart="drag($event, chamado)"
            >
              <p><strong>{{ chamado.assunto }}</strong></p>
              <p><em>Responsável: {{ chamado.responsavel }}</em></p>
              <div class="tags">
                <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge">{{ etiqueta }}</span>
              </div>
              <div v-if="chamado.relacionados.length" class="related">
                <p><strong>Chamados Relacionados:</strong></p>
                <ul>
                  <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
                </ul>
              </div>
              <div class="comments">
                <p><strong>Comentários:</strong></p>
                <ul>
                  <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
                </ul>
                <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
              </div>
            </div>
          </div>

          <!-- Coluna Andamento -->
          <div
            v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'"
            class="kanban-column ongoing"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
          >
            <h3 class="kanban-header">Andamentos</h3>
            <div
              v-for="chamado in chamadosAndamento"
              :key="chamado.id"
              class="kanban-item"
              draggable="true"
              @dragstart="drag($event, chamado)"
            >
              <p><strong>{{ chamado.assunto }}</strong></p>
              <p><em>Responsável: {{ chamado.responsavel }}</em></p>
              <div class="tags">
                <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge">{{ etiqueta }}</span>
              </div>
              <div v-if="chamado.relacionados.length" class="related">
                <p><strong>Chamados Relacionados:</strong></p>
                <ul>
                  <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
                </ul>
              </div>
              <div class="comments">
                <p><strong>Comentários:</strong></p>
                <ul>
                  <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
                </ul>
                <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
              </div>
            </div>
          </div>

          <!-- Coluna Concluído -->
          <div
            v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'"
            class="kanban-column completed"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
          >
            <h3 class="kanban-header">Concluídos</h3>
            <div
              v-for="chamado in chamadosConcluidos"
              :key="chamado.id"
              class="kanban-item"
              draggable="true"
              @dragstart="drag($event, chamado)"
            >
              <p><strong>{{ chamado.assunto }}</strong></p>
              <p><em>Responsável: {{ chamado.responsavel }}</em></p>
              <div class="tags">
                <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge">{{ etiqueta }}</span>
              </div>
              <div v-if="chamado.relacionados.length" class="related">
                <p><strong>Chamados Relacionados:</strong></p>
                <ul>
                  <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
                </ul>
              </div>
              <div class="comments">
                <p><strong>Comentários:</strong></p>
                <ul>
                  <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
                </ul>
                <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HomePage from './HomePage.vue';

export default {
  data() {
    return {
      chamados: [],
      categoriaVisivel: null,
      mostrarTodosChamados: true,
      novoComentario: '',
      paginaAtual: 'home', // Inicia com Home por padrão
    };
  },
  computed: {
    chamadosPendentes() {
      return this.chamados.filter(chamado => chamado.status === 'Pendente');
    },
    chamadosAndamento() {
      return this.chamados.filter(chamado => chamado.status === 'Andamento');
    },
    chamadosConcluidos() {
      return this.chamados.filter(chamado => chamado.status === 'Concluído');
    }
  },
  methods: {
    async carregarChamados() {
      const resposta = await fetch('/api/chamados');
      this.chamados = await resposta.json();
    },
    mostrarHome() {
      this.paginaAtual = 'Home';
    },
    mostrarChamados() {
      this.paginaAtual = 'kanban';
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
    },
    mostrarCategoria(categoria) {
      this.paginaAtual = 'kanban';
      this.categoriaVisivel = categoria;
      this.mostrarTodosChamados = false;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event, chamado) {
      event.dataTransfer.setData('chamado', JSON.stringify(chamado));
    },
    drop(event) {
      event.preventDefault();
      const chamado = JSON.parse(event.dataTransfer.getData('chamado'));
      // Lógica de movimentação de chamado
    },
    adicionarComentario(chamado) {
      if (this.novoComentario.trim() !== '') {
        chamado.comentarios.push(this.novoComentario);
        this.novoComentario = '';
      }
    }
  },
  mounted() {
    this.carregarChamados();
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

/* Cabeçalho */
.header {
    width: 100%;
    background:  #0575E6 ;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-content {
    display: flex;
    align-items: center;
}

.header-image {
    height: 40px;
    width: auto;
}

.header-title {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
}

/* Sidebar */
.sidebar {
    width: 200px;
    background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
    padding: 15px;
    height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    margin-bottom: 10px;
}

.nav-link {
    text-decoration: none;
    color: #ffffff;
    font-size: 18px;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
}

.nav-link:hover {
    background: #ddd;
}

/* Conteúdo Principal */
.main-container {
    margin-left: 200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
}

/* Kanban Board */
.kanban-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.kanban-column {
    background: #ece8e8;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 500px;
    margin-right: 20px;
    flex: 0 0 auto;
}

.kanban-column.pending {
    border-left: 5px solid red;
}

.kanban-column.ongoing {
    border-left: 5px solid blue;
}

.kanban-column.completed {
    border-left: 5px solid green;
}

.kanban-header {
    font-size: 25px;
    margin-bottom: 15px;
}

.kanban-item {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    cursor: move;
}

.tags {
    margin-top: 10px;
}

.badge {
    background: #ddd;
    border-radius: 3px;
    padding: 3px 5px;
    margin-right: 5px;
}

.related {
    margin-top: 10px;
}

.comments {
    margin-top: 10px;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
}
</style>

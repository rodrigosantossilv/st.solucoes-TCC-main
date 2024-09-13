<!-- src/pages/ChamadosPage.vue -->
<template>
  <div>
    <!-- Cabeçalho -->
    <header class="header">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="header-image" alt="Descrição da Imagem">
        <h1 class="header-title">Home</h1>
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="main-container">
      <!-- Sidebar (Dashboard) -->
      <nav class="sidebar">
        <h2>Menu</h2>
        <ul class="nav-list">
          <li class="nav-item">
            <a @click="mostrarHome" href="#" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a @click="KanbanBoard" href="kanbanboard" class="nav-link">Chamados</a>
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
      <!-- Conteúdo principal (Kanban) -->
      
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    mostrarHome() {
      // Lógica para mostrar a página inicial
    },
    KanbanBoard() {
      // Lógica para mostrar o Kanban Board
    },
    mostrarCategoria(categoria) {
      // Lógica para mostrar a categoria selecionada
    }
  }
}
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
  background: #0575E6 ;
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
  background:linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  padding: 15px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
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

</style>

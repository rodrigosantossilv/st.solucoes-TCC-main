<template>
  <nav class="menu-lateral" :class="{ expandir: expanded }">
    <div class="btn-expandir" @click="toggleSidebar">
      <i class="bi bi-list-ul"></i>
    </div>
    <ul>
      <li class="item-menu" :class="{ ativo: activeLink === 'home' }" @click="setActiveLink('home')">
        <a href="#">
          <span class="icon"><i class="bi bi-house-door"></i></span>
          <span class="txt-link">Home</span>
        </a>
      </li>
      <li class="item-menu" :class="{ ativo: activeLink === 'kanban' }" @click="setActiveLink('kanban')">
        <a href="#">
          <span class="icon"><i class="bi bi-kanban"></i></span>
          <span class="txt-link">Kanban</span>
        </a>
      </li>
      <li class="item-menu" :class="{ ativo: activeLink === 'agenda' }" @click="setActiveLink('agenda')">
        <a href="#">
          <span class="icon"><i class="bi bi-calendar3"></i></span>
          <span class="txt-link">Agenda</span>
        </a>
      </li>
      <li class="item-menu" :class="{ ativo: activeLink === 'conta' }" @click="setActiveLink('conta')">
        <a href="#">
          <span class="icon"><i class="bi bi-person-circle"></i></span>
          <span class="txt-link">Conta</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      activeLink: 'home'
    };
  },
  methods: {
    toggleSidebar() {
      this.expanded = !this.expanded;
    },
    setActiveLink(link) {
      this.activeLink = link;
    }
  }
};
</script>

<style scoped>
.menu-lateral {
  width: 80px;
  height: 100%;
  background-color: rgb(5, 67, 120);
  padding: 40px 0 40px 1%;
  box-shadow: 3px 0 0 rgb(2, 45, 76);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: 0.2s;
}
.menu-lateral.expandir {
  width: 300px;
}
.btn-expandir {
  width: 100%;
  padding-left: 10px;
}
.btn-expandir > i {
  color: aliceblue;
  font-size: 24px;
  cursor: pointer;
}
ul {
  height: 100%;
  list-style-type: none;
}
ul li.item-menu {
  transition: 0.1s;
}
ul li.ativo {
  background-color: rgb(3, 49, 103);
}
ul li.item-menu:hover {
  background: rgb(3, 49, 103);
}
ul li.item-menu a {
  color: aliceblue;
  text-decoration: none;
  font-size: 20px;
  padding: 20px 4%;
  display: flex;
  margin-bottom: 20px;
  line-height: 40px;
}
ul li.item-menu a .txt-link {
  margin-left: 70px;
  transition: 0.7s;
  opacity: 0;
}
.menu-lateral.expandir .txt-link {
  margin-left: 40px;
  opacity: 1;
}
ul li.item-menu a .icon > i {
  font-size: 30px;
}
</style>

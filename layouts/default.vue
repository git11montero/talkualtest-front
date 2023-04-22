<template>
  <div>
    <nav class="navbar header has-shadow is-secondary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/icon.png" alt="icon" height="28" />
          <span>Talkual Tienda</span>
        </a>
        <a class="rigth" @click.prevent="handleLogout" v-if="isLoggedIn">
          Cerrar sesion
        </a>
      </div>
    </nav>

    <section class="main-content columns">

      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),

    showAlert: (cont) => {
      alert(cont)
    },

    async handleLogout() {
      const success = await this.logout();
      if (success) {
        this.$router.push('/login');
      } else {
        // Mostrar mensaje de error
      }
    }
  }
}
</script>

<style>
/* Globales sin scoped */
.pointer {
  cursor: pointer;
}
.rigth{
  position: absolute;
  right: 50px;
  top: 16px;
}
</style>

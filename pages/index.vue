<template>
  <section class="section">

    <b-dropdown v-if="!postalCode.value" aria-role="list">
      <template #trigger="{ active }">
        <b-button label="Filtrar por localidad" type="is-primary" :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>
      <b-dropdown-item aria-role="listitem" @click="postalCode = option" v-for="option in options"
        :key="option.value">{{ option.value }} - {{ option.text }}</b-dropdown-item>
    </b-dropdown>

    <b-dropdown aria-role="list">
        <template #trigger="{ active }">
          <b-button label="Productos por pagina" type="is-primary" :icon-right="active ? 'menu-up' : 'menu-down'" />
        </template>
        <b-dropdown-item aria-role="listitem" @click="numProd = 5; pagina = 1; getProducts();">5 Productos</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="numProd = 10; pagina = 1; getProducts(); ">10 Productos</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="numProd = 15; pagina = 1; getProducts(); ">15 Productos</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="numProd = 20; pagina = 1; getProducts(); ">20 Productos</b-dropdown-item>
        <b-dropdown-item aria-role="listitem" @click="numProd = 25; pagina = 1; getProducts(); ">25 Productos</b-dropdown-item>
      </b-dropdown>

      <b-dropdown aria-role="list">
          <template #trigger=" { active } ">
            <b-button label="Ordenar por" type="is-primary" :icon-right=" active ? 'menu-up' : 'menu-down' " />
          </template>
          <b-dropdown-item aria-role="listitem" @click="sort = 'Name'; getProducts();">Nombre</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="sort = 'createdAt'; getProducts(); ">Antiguos </b-dropdown-item>
        </b-dropdown>

    <div v-if="postalCode.value">
      <span>Localidad seleccionada: {{ postalCode.text }} ({{ postalCode.value }})</span>
      <button @click="postalCode = {}">
        <b-icon class="pointer" type="is-primary" icon="delete" size="is-small"></b-icon>
      </button>
    </div>
    <div class="pagination" v-if="meta.pagination && !postalCode.value">
      <span>Mostrando {{ products.length }}/{{ meta.pagination.total }} frutas - Pag. 
        <span @click="pagina = meta.pagination.page - 1; getProducts(); " v-if="meta.pagination.page > 1">
            <b-icon class="pointer" type="is-primary" icon="menu-left"></b-icon>
          </span>
        {{ meta.pagination.page }}/{{ meta.pagination.pageCount }} 
         <span @click=" pagina = meta.pagination.page + 1; getProducts(); " v-if="meta.pagination.page < meta.pagination.pageCount">
            <b-icon class="pointer" type="is-primary" icon="menu-right" ></b-icon>
          </span>
      </span>
    </div>



    <hr>

    <div class="min-width-250 flex-wrap" style="width: 100%;">
      <product-card class="pointer" v-for="(product, key) of products" :key="key" :title="product.attributes.Name"
        :src='API_URL + product.attributes.Image.data.attributes.url' v-if="!postalCode.value || product.attributes.PostalCode.some(obj => obj.code == postalCode.value)">
        <span>{{ product.attributes.Description }}</span>
      </product-card>
    </div>

  </section>
</template>

<script>
import Card from '~/components/Card'
import ProductCard from '~/components/ProductCard'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'IndexPage',
  middleware: 'auth',
  components: {
    Card, ProductCard
  },
  data() {
    return {
      products: [],
      meta: {},
      postalCode: {},
      pagina: 1,
      numProd: 25,
      sort: 'Name',
      API_URL: process.env.API_URL,
      options: [
        { text: 'Villauno', value: 10001 },
        { text: 'Poblaciondos', value: 10002 },
        { text: 'Ciudadtres', value: 10003 },
        { text: 'Aldeacuatro', value: 10004 },
      ]
    }
  },
  created() {
    
    import('fetch-headers').then(module => {
      const Headers = module.default || module;
      this.getProducts();
    })

  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  }, 
  methods: {
    getProducts() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
      let token = window.localStorage.getItem('jwt');

      //prefiero ajax de jQuery, pero por no generar mas codigo y usar solo lo que se ha pedido
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(process.env.API_URL + "/api/products?populate=*&pagination[page]=" + this.pagina + "&pagination[pageSize]=" + this.numProd + "&sort[0]=" + this.sort, requestOptions)
        .then(response => response.text())
        .then(result => { this.setProducts(result) })
        .catch(error => console.log('error', error));
    },
    setProducts(products) {
      this.products = JSON.parse(products).data;
      this.meta = JSON.parse(products).meta;
    }
  },
}
</script>

<style scoped>
button{
  border: none;
  background: none;
}
.min-width-250 .column{
  min-width: 300px;
  max-width: 300px;
}

.flex-wrap{
  display: flex;
  flex-wrap: wrap;  
}

.pagination{
  float: right;
}
</style>
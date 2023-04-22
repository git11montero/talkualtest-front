<template>
  <div class="column">
    <div class="card">
      <header class="card-header"  data-test="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <img class="img_product" :src="src" size="is-large" />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuefyCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
  .img_product{
    height: 200px;
  }
  .card-header {
    box-shadow: none;
  }

</style>
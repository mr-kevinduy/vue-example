<template>
  <div id="shop-layout">
    <Navigation />
    <router-view/>
  </div>
</template>

<style lang="scss">
</style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})

export default class ShopLayout extends Vue {

}
</script>

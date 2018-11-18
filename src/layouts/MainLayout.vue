<template>
  <div id="main-layout">
    <el-container>
      <el-header>
        <Navigation />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
  }
}
</style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})

export default class MainLayout extends Vue {

}
</script>

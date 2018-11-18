<template>
  <div class="auth-layout">
    <el-container>
      <el-header class="px-0">
        <Navigation />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss"></style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})

export default class AuthLayout extends Vue {

}
</script>

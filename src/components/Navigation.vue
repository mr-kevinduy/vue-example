<template>
  <div class="navigation">
    <el-menu default-active="1" class="site-navigation" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2"><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></el-menu-item>
      <el-menu-item index="3"><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></el-menu-item>
      <el-menu-item index="4"><LocaleChanger /></el-menu-item>
      <el-menu-item index="5"><router-link to="/login">{{ $t('auth.login') }}</router-link></el-menu-item>
      <el-menu-item index="6"><router-link to="/register">{{ $t('auth.register') }}</router-link></el-menu-item>
      <el-menu-item index="7"><a href="javascript:void(0)" @click="logout">{{ $t('auth.logout') }}</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import firebase from '@/services/firebase';
import { Component, Vue } from 'vue-property-decorator';
import LocaleChanger from '@/components/LocaleChanger.vue';

@Component({
  components: {
    LocaleChanger,
  },
})

export default class Navigation extends Vue {
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/login');
      }).catch(error => {
        this.$message(this.$t('error.AUTH003'));
      });
  }
}
</script>

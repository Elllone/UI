<template>
  <nav-bar></nav-bar>
  <router-view/>
</template>

<script>
import navBar from './components/navBar.vue';

export default{
  components:{
    navBar
  }
}

</script>

<style lang="scss">
::-webkit-scrollbar{
  display: none;
}
</style>
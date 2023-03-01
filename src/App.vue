<template>
  <Menubar :model="NAVBAR_ITEMS" />
  <router-view/>
</template>

<script setup>
import { NAVBAR_ITEMS } from './constants'; 
import Menubar from 'primevue/menubar';
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
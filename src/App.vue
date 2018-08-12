<template>
  <div id="app">
    <div class="game">
      <div class="container">
        <h1 class="title">
          Jokenpo
        </h1>
        <p class="subtitle">
          Welcome to the VueJS Jokenpo game!
        </p>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 10px;
}
</style>

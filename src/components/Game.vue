<template>
  <div class="game">
    <div class="container">
      <h1 class="title">
        Jokenpo
      </h1>
      <p class="subtitle">
        Start the game below!
      </p>
      <div class="columns is-mobile">
        <Player></Player>
        <Board></Board>
        <Player></Player>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player';
import Board from '@/components/Board';

export default {
  name: 'Game',
  components: { Player, Board },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

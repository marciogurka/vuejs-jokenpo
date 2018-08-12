<template>
  <div>
    <router-link to="game" exact
      class="button is-success is-outlined is-large is-fullwidth"
      id="start-game">
      <span class="icon is-large">
        <i class="fas fa-hand-scissors"></i>
      </span>
      <span>Start a game</span>
    </router-link>
    <a class="button is-outlined is-large is-fullwidth" href="https://pt.wikipedia.org/wiki/Pedra-papel-tesoura-lagarto-Spock" target="_blank">
      <span class="icon is-large">
        <i class="fas fa-question-circle"></i>
      </span>
      <span>What's Jokenpo?</span>
    </a>
    <a class="button is-outlined is-large is-fullwidth" href="https://github.com/marciogurka/vuejs-jokenpo" target="_blank">
      <span class="icon is-large">
        <i class="fas fa-code"></i>
      </span>
      <span>See the source code</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  margin-bottom: 30px;
}

.button:last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 425px) {
  div > .button {
    font-size: large;
  }
}


</style>

<template>
<div class="column is-one-quarter-desktop is-one-third-tablet player-column">
  <div class="box">
      <div class="title title-name">
        {{ (!gameHasStarted && !isComputer) ? 'Welcome!' : name }}
      </div>
      <div v-if="isComputer">
        <img src="../assets/bot.jpg" alt="Computer profile image"/>
      </div>
      <div class="field" v-if="!isComputer && !gameHasStarted">
        <div class="control">
          <label for="name"> Please write your name below </label>
          <input class="input is-info name-input" id="name" type="text"
          placeholder="Put your name here" v-model="name">
        </div>
        <div class="control">
          <a class="button is-medium is-fullwidth is-success submit-name"
            @click.prevent="startGame"
            :disabled="!name">
            Play a match
          </a>
        </div>
      </div>
      <div class="field has-addons options-player" v-if="!isComputer && gameHasStarted">
        <div class="play-title-div">
          <h6 class="title is-6 play-options-title">Choose your play:</h6>
        </div>
        <div class="play-options">
          <a class="button is-large lizard-opt" @click="playerChoose(playerOptions.lizard)">
            <span class="icon is-medium">
              <font-awesome-icon icon="hand-lizard"></font-awesome-icon>
            </span>
          </a>
          <a class="button is-large rock-opt" @click="playerChoose(playerOptions.rock)">
            <span class="icon is-medium">
              <font-awesome-icon icon="hand-rock"></font-awesome-icon>
            </span>
          </a>
          <a class="button is-large scissors-opt" @click="playerChoose(playerOptions.scissors)">
            <span class="icon is-medium">
              <font-awesome-icon icon="hand-scissors"></font-awesome-icon>
            </span>
          </a>
          <a class="button is-large spock-opt" @click="playerChoose(playerOptions.spock)">
            <span class="icon is-medium">
              <font-awesome-icon icon="hand-spock"></font-awesome-icon>
            </span>
          </a>
          <a class="button is-large paper-opt" @click="playerChoose(playerOptions.paper)">
            <span class="icon is-medium">
              <font-awesome-icon icon="hand-paper"></font-awesome-icon>
            </span>
          </a>
        </div>
      </div>
      <router-link to="/" exact class="button is-small is-fullwidth back-button" v-if="!isComputer">
        <span>Back to menu</span>
      </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'Player',
  props: ['isComputer', 'gameHasStarted', 'playerOptions'],
  data() {
    return {
      name: 'Bot',
    };
  },
  methods: {
    startGame() {
      if (this.name) {
        this.$emit('startGame', this.name);
      }
    },
    playerChoose(option) {
      this.$emit('playerChoose', option);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-column {
  display: flex;
  height: auto;
  padding: 0.75rem;
}

@media screen and (max-width: 768px) {
  .player-column {
    padding: 0.75rem 1.5rem;
  }
}

.player-column > .box {
  width: 100%;
}

.title-name {
  min-height: 36px;
  font-size: larger;
  margin-bottom: 0px;
}

.name-input {
  margin-bottom: 10px;
}

.options-player {
  flex-flow: wrap;
  justify-content: center;
}

.options-player > .play-title-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 425px) and (max-width: 768px) {
  .options-player h6 {
    margin: 0;
  }
}

.play-options-title {
  margin-bottom: 10px;
}

.play-options > a {
  margin: 5px;
}

.play-options {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
</style>

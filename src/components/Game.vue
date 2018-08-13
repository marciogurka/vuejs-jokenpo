<template>
<div class="columns game">
  <Player :isComputer="false"
    :playerOptions="playerOptions"
    v-bind:gameHasStarted="gameHasStarted"
    @startGame="startGame"
    @playerChoose="playerChoose">
  </Player>
  <Board v-if="gameHasStarted"
    v-bind:playerOption="playerOption"
    v-bind:computerOption="computerOption"
    v-bind:winner="winner">
  </Board>
  <Player v-if="gameHasStarted" :isComputer="true"></Player>
</div>
</template>

<script>
import Player from '@/components/Player';
import Board from '@/components/Board';

const playerOptions = {
  lizard: {
    value: 0,
    icon: 'hand-lizard',
    name: 'Lizard',
  },
  rock: {
    value: 1,
    icon: 'hand-rock',
    name: 'Rock',
  },
  scissors: {
    value: 2,
    icon: 'hand-scissors',
    name: 'Scissors',
  },
  spock: {
    value: 3,
    icon: 'hand-spock',
    name: 'Spock',
  },
  paper: {
    value: 4,
    icon: 'hand-paper',
    name: 'Paper',
  },
};

export default {
  name: 'Game',
  components: {
    Player,
    Board,
  },
  data() {
    return {
      gameHasStarted: false,
      playerOption: {
        icon: 'question',
      },
      computerOption: {
        icon: 'question',
      },
      winner: '',
      playerOptions,
    };
  },
  methods: {
    startGame() {
      this.gameHasStarted = true;
      // reseting the board icons
      this.playerOption = {
        icon: 'question',
      };
      this.computerOption = {
        icon: 'question',
      };
      this.winner = '';
    },
    playerChoose(option) {
      this.playerOption = option;
      const botOption = this.generateComputerOption();
      this.computerOption = botOption;
      this.winner = this.checkWinner(option.value, botOption.value);
    },
    generateComputerOption() {
      const computerOptValue = Math.floor(Math.random() * 4);
      return Object.keys(playerOptions)
        .map(option => playerOptions[option])
        .find(option => option.value === computerOptValue);
    },
    checkWinner(playerOpt, computerOpt) {
      if (playerOpt === computerOpt) {
        return 'tie';
      } else if (playerOpt === undefined || playerOpt === null) {
        throw new Error('Opção inválida! Tente Novamente');
      } else if (computerOpt === undefined || computerOpt === null) {
        throw new Error('Opção inválida! Tente Novamente');
      }

      switch (playerOpt) {
        case 0:
          if (Math.abs(playerOpt - computerOpt) > 2) {
            return 'p1';
          }
          return 'p2';
        case 1:
          if (Math.abs(playerOpt - computerOpt) <= 1) {
            return 'p1';
          }
          return 'p2';
        case 2:
          if (Math.abs(playerOpt - computerOpt) === 2) {
            return 'p1';
          }
          return 'p2';
        case 3:
          switch (computerOpt) {
            case 1:
            case 2:
              return 'p1';
            case 0:
            case 4:
              return 'p2';
            default:
              throw new Error('Opção inválida! Tente Novamente');
          }
        case 4:
          if ((playerOpt - computerOpt) % 2 !== 0) {
            return 'p1';
          }
          return 'p2';
        default:
          throw new Error('Opção inválida! Tente Novamente');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  justify-content: center;
}
</style>

<template>
  <div class="column board-column">
    <div class="box">
      <div class="results">
        <div>
          <font-awesome-icon :icon="playerOption.icon"></font-awesome-icon>
          <span>{{ playerOption.name }}</span>
        </div>
        <h5>VS</h5>
        <div>
          <font-awesome-icon :icon="computerOption.icon"></font-awesome-icon>
          <span>{{ computerOption.name }}</span>
        </div>
      </div>
      <div class="info-message tile notification" v-bind:class="classObject">
        {{ checkMessage() }}
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu';

export const GameTexts = {
  waitingPlayer: 'Waiting for the player to choose',
  playerWin: 'You won!',
  playerDefeat: 'You lose!',
  waiting: 'Waiting...',
  tie: 'It\'s a tie!',
};

export default {
  name: 'Board',
  components: { Menu },
  props: ['playerOption', 'computerOption', 'winner'],
  data() {
    return {
      message: GameTexts.waitingPlayer,
    };
  },
  computed: {
    classObject() {
      return {
        'is-success': this.winner.indexOf('p1') > -1,
        'is-danger': this.winner.indexOf('p2') > -1,
        'is-warning': this.winner.indexOf('tie') > -1,
      };
    },
  },
  methods: {
    checkMessage() {
      if (this.winner) {
        switch (this.winner) {
          case 'p1':
            this.message = GameTexts.playerWin;
            break;
          case 'p2':
            this.message = GameTexts.playerDefeat;
            break;
          default:
            this.message = GameTexts.tie;
        }
      } else {
        this.message = GameTexts.waitingPlayer;
      }
      return this.message;
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board-column {
  height: auto;
  display: flex;
  padding: 0.75rem;
}

@media screen and (max-width: 768px) {
  .board-column {
    padding: 0.75rem 1.5rem;
  }
}

.board-column > .box {
  width: 100%;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  display: flex;
}

.results {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.results > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: 100%;
}

.results > div > svg {
  width: 50%;
  height: auto;
}

@media screen and (max-width: 425px) {
  .results > div > svg {
    width: 90%;
    height: auto;
  }
}

.result > div > h5 {
  font-size: larger;
}

.info-message {
  max-height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>

import { mount } from '@vue/test-utils';
import Board from '@/components/Board';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion);

const GameTexts = {
  waitingPlayer: 'Waiting for the player to choose',
  playerWin: 'You won!',
  playerDefeat: 'You lose!',
  waiting: 'Waiting...',
  tie: 'It\'s a tie!',
};

describe('BoardSpec.vue', () => {
  let cmp;
  // stubs object to avoid error rendering custom elements
  const stubs = {
    'font-awesome-icon': FontAwesomeIcon,
  };
  // Method to create component with custom props
  const createCmp = propsData => mount(Board, { propsData, stubs });

  /* Mouting the component before each test */
  beforeEach(() => {
    const props = {
      playerOption: {
        icon: 'question',
      },
      computerOption: {
        icon: 'question',
      },
      winner: '',
    };
    cmp = createCmp(props);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });

  it('is a Vue Component', () => {
    expect(cmp.isVueInstance()).toBe(true);
  });

  it('is a Board component', () => {
    expect(cmp.is(Board)).toBe(true);
  });

  describe('When the game has started', () => {
    it('has a waiting message being displayed', () => {
      expect(cmp.find('.info-message').text()).toBe(GameTexts.waitingPlayer);
    });

    it('if the user wins, shows a win message', () => {
      const testProps = {
        playerOption: {
          icon: 'question',
        },
        computerOption: {
          icon: 'question',
        },
        winner: 'p1',
      };
      cmp = createCmp(testProps);
      expect(cmp.find('.info-message').text()).toBe(GameTexts.playerWin);
    });

    it('if the user lose, shows a defeat message', () => {
      const testProps = {
        playerOption: {
          icon: 'question',
        },
        computerOption: {
          icon: 'question',
        },
        winner: 'p2',
      };
      cmp = createCmp(testProps);
      expect(cmp.find('.info-message').text()).toBe(GameTexts.playerDefeat);
    });

    it('if the game has a tie, show a tie message', () => {
      const testProps = {
        playerOption: {
          icon: 'question',
        },
        computerOption: {
          icon: 'question',
        },
        winner: 'tie',
      };
      cmp = createCmp(testProps);
      expect(cmp.find('.info-message').text()).toBe(GameTexts.tie);
    });
  });
});

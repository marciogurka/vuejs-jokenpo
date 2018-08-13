import { mount, RouterLinkStub } from '@vue/test-utils';
import Game from '@/components/Game';
import Player from '@/components/Player';
import Board from '@/components/Board';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion);

const mockMath = Object.create(global.Math);
mockMath.random = () => 1;
global.Math = mockMath;

describe('GameSpec.vue', () => {
  let cmp;
  // stubs object to avoid error rendering custom elements
  const stubs = {
    RouterLink: RouterLinkStub,
    'font-awesome-icon': FontAwesomeIcon,
  };
  // Method to create component with custom props
  const createCmp = propsData => mount(Game, { propsData, stubs });
  /* Mouting the component before each test */
  beforeEach(() => {
    cmp = createCmp({});
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });

  it('is a Vue Component', () => {
    expect(cmp.isVueInstance()).toBe(true);
  });

  it('is a Game component', () => {
    expect(cmp.is(Game)).toBe(true);
  });

  describe('Before the game starts', () => {
    /* Mouting the component before each test */
    beforeEach(() => {
      cmp = createCmp({});
    });
    it('has a Player component', () => {
      expect(cmp.contains(Player)).toBe(true);
    });

    it('has not a Board component', () => {
      expect(cmp.contains(Board)).toBe(false);
    });

    it('has only one Player component being displayed', () => {
      expect(cmp.findAll(Player).length).toBe(1);
    });

    it('has only one Player that is not a bot component being displayed', () => {
      expect(cmp.findAll(Player).at(0).props().isComputer).toBe(false);
    });

    it('Calls startGame when @startGame happens', () => {
      const stub = jest.fn();
      cmp.setMethods({ startGame: stub });

      cmp.find(Player).vm.$emit('startGame', 'Bot');
      expect(stub).toBeCalledWith('Bot');
    });
  });

  describe('When the game starts', () => {
    /* Mouting the component before each test */
    beforeEach(() => {
      cmp = createCmp({
        playerOption: {
          icon: 'question',
        },
        computerOption: {
          icon: 'question',
        },
      });
      cmp.vm.gameHasStarted = true;
    });

    it('this.winner is empty when you start a game the checkResult method', () => {
      expect(cmp.vm.$data.winner).toBe('');
    });

    it('playerOption has default value', () => {
      expect(cmp.vm.$data.playerOption).toEqual({ icon: 'question' });
    });

    it('computerOption has default value', () => {
      expect(cmp.vm.$data.computerOption).toEqual({ icon: 'question' });
    });

    it('has 2 Player components being displayed', () => {
      expect(cmp.findAll(Player).length).toBe(2);
    });

    it('has a Player component that is not a bot', () => {
      expect(cmp.findAll(Player).at(0).props().isComputer).toBe(false);
    });

    it('has a Player component that is a bot', () => {
      expect(cmp.findAll(Player).at(1).props().isComputer).toBe(true);
    });

    it('has a Board component', () => {
      expect(cmp.contains(Board)).toBe(true);
    });

    describe('And the user choose an option', () => {
      it('calls playerChoose when @playerChoose happens', () => {
        const stub = jest.fn();
        cmp.setMethods({ playerChoose: stub });
        cmp.findAll(Player).at(0).vm.$emit('playerChoose');
        expect(stub).toHaveBeenCalled();
      });

      describe('And its a lizard option', () => {
        it('calls playerChoose with lizard option when @playerChoose with lizard option happens', () => {
          const stub = jest.fn();
          cmp.setMethods({ playerChoose: stub });
          cmp.find(Player).find('.lizard-opt').trigger('click');
          expect(stub).toBeCalledWith(cmp.vm.$data.playerOptions.lizard);
        });

        it('and bot choose lizard, its a tie', () => {
          expect(cmp.vm.checkWinner(0, 0)).toBe('tie');
        });

        it('and bot choose rock, its a bot win', () => {
          expect(cmp.vm.checkWinner(0, 1)).toBe('p2');
        });

        it('and bot choose scissors, its a bot win', () => {
          expect(cmp.vm.checkWinner(0, 2)).toBe('p2');
        });

        it('and bot choose spock, its a player win', () => {
          expect(cmp.vm.checkWinner(0, 3)).toBe('p1');
        });

        it('and bot choose paper, its a player win', () => {
          expect(cmp.vm.checkWinner(0, 4)).toBe('p1');
        });
      });

      describe('And its a rock option', () => {
        it('calls playerChoose with rock option when @playerChoose with rock option happens', () => {
          const stub = jest.fn();
          cmp.setMethods({ playerChoose: stub });
          cmp.find(Player).find('.rock-opt').trigger('click');
          expect(stub).toBeCalledWith(cmp.vm.$data.playerOptions.rock);
        });

        it('and bot choose rock, its a tie', () => {
          expect(cmp.vm.checkWinner(1, 1)).toBe('tie');
        });

        it('and bot choose lizard, its a player win', () => {
          expect(cmp.vm.checkWinner(1, 0)).toBe('p1');
        });

        it('and bot choose scissors, its a player win', () => {
          expect(cmp.vm.checkWinner(1, 2)).toBe('p1');
        });

        it('and bot choose spock, its a bot win', () => {
          expect(cmp.vm.checkWinner(1, 3)).toBe('p2');
        });

        it('and bot choose paper, its a bot win', () => {
          expect(cmp.vm.checkWinner(1, 4)).toBe('p2');
        });
      });

      describe('And its a scissors option', () => {
        it('calls playerChoose with scissors option when @playerChoose with scissors option happens', () => {
          const stub = jest.fn();
          cmp.setMethods({ playerChoose: stub });
          cmp.find(Player).find('.scissors-opt').trigger('click');
          expect(stub).toBeCalledWith(cmp.vm.$data.playerOptions.scissors);
        });

        it('and bot choose scissors, its a tie', () => {
          expect(cmp.vm.checkWinner(2, 2)).toBe('tie');
        });

        it('and bot choose lizard, its a player win', () => {
          expect(cmp.vm.checkWinner(2, 0)).toBe('p1');
        });

        it('and bot choose rock, its a bot win', () => {
          expect(cmp.vm.checkWinner(2, 1)).toBe('p2');
        });

        it('and bot choose spock, its a bot win', () => {
          expect(cmp.vm.checkWinner(2, 3)).toBe('p2');
        });

        it('and bot choose paper, its a player win', () => {
          expect(cmp.vm.checkWinner(2, 4)).toBe('p1');
        });
      });
      describe('And its a spock option', () => {
        it('calls playerChoose with spock option when @playerChoose with spock option happens', () => {
          const stub = jest.fn();
          cmp.setMethods({ playerChoose: stub });
          cmp.find(Player).find('.spock-opt').trigger('click');
          expect(stub).toBeCalledWith(cmp.vm.$data.playerOptions.spock);
        });

        it('and bot choose spock, its a tie', () => {
          expect(cmp.vm.checkWinner(3, 3)).toBe('tie');
        });

        it('and bot choose lizard, its a bot win', () => {
          expect(cmp.vm.checkWinner(3, 0)).toBe('p2');
        });

        it('and bot choose paper, its a player win', () => {
          expect(cmp.vm.checkWinner(3, 1)).toBe('p1');
        });

        it('and bot choose scissors, its a player win', () => {
          expect(cmp.vm.checkWinner(3, 2)).toBe('p1');
        });

        it('and bot choose paper, its a bot win', () => {
          expect(cmp.vm.checkWinner(3, 4)).toBe('p2');
        });
      });
      describe('And its a paper option', () => {
        it('calls playerChoose with paper option when @playerChoose with paper option happens', () => {
          const stub = jest.fn();
          cmp.setMethods({ playerChoose: stub });
          cmp.find(Player).find('.paper-opt').trigger('click');
          expect(stub).toBeCalledWith(cmp.vm.$data.playerOptions.paper);
        });

        it('and bot choose paper, its a tie', () => {
          expect(cmp.vm.checkWinner(4, 4)).toBe('tie');
        });

        it('and bot choose lizard, its a bot win', () => {
          expect(cmp.vm.checkWinner(4, 0)).toBe('p2');
        });

        it('and bot choose rock, its a player win', () => {
          expect(cmp.vm.checkWinner(4, 1)).toBe('p1');
        });

        it('and bot choose scissors, its a bot win', () => {
          expect(cmp.vm.checkWinner(4, 2)).toBe('p2');
        });

        it('and bot choose spock, its a player win', () => {
          expect(cmp.vm.checkWinner(4, 3)).toBe('p1');
        });
      });
    });
  });
  describe('Functions tests', () => {
    beforeEach(() => {
      cmp = createCmp({
        playerOption: {
          icon: 'question',
        },
        computerOption: {
          icon: 'question',
        },
      });
      cmp.vm.gameHasStarted = true;
    });

    it('should throw an error if no player option is passed', () => {
      expect(() => { cmp.vm.checkWinner(null, 0); }).toThrow(new Error('Opção inválida! Tente Novamente'));
    });

    it('should throw an error if no bot option is passed', () => {
      expect(() => { cmp.vm.checkWinner(0, null); }).toThrow(new Error('Opção inválida! Tente Novamente'));
    });

    it('should throw an error if get a default option in player switch function', () => {
      expect(() => { cmp.vm.checkWinner(7, 1); }).toThrow(new Error('Opção inválida! Tente Novamente'));
    });

    it('should throw an error if get a default option in bot switch function', () => {
      expect(() => { cmp.vm.checkWinner(3, 6); }).toThrow(new Error('Opção inválida! Tente Novamente'));
    });

    it('generate a random number for the bot', () => {

    });

    it('this.winner is not null after the checkResult method', () => {

    });
  });
});

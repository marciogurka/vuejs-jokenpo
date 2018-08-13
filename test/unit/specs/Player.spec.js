import { mount, RouterLinkStub } from '@vue/test-utils';
import Player from '@/components/Player';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHandLizard, faHandRock, faHandPaper, faHandSpock, faHandScissors, faQuestion);

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


describe('PlayerSpec.vue', () => {
  let cmp;
  // stubs object to avoid error rendering custom elements
  const stubs = {
    RouterLink: RouterLinkStub,
    'font-awesome-icon': FontAwesomeIcon,
  };
  // Method to create component with custom props
  const createCmp = propsData => mount(Player, { propsData, stubs });

  it('has the expected html structure', () => {
    cmp = createCmp();
    expect(cmp.element).toMatchSnapshot();
  });

  it('is a Vue Component', () => {
    cmp = createCmp();
    expect(cmp.isVueInstance()).toBe(true);
  });

  it('is a Player component', () => {
    cmp = createCmp();
    expect(cmp.is(Player)).toBe(true);
  });

  describe('Before the game start', () => {
    it('when it loads, ask the user his name', () => {
      cmp = createCmp();
      expect(cmp.contains('.name-input')).toBe(true);
    });

    it('when the name is empty, the submit button is desactivated', () => {
      cmp = createCmp();
      cmp.vm.name = '';
      expect(cmp.find('.submit-name').attributes().disabled).toBe('disabled');
    });

    it('when the name is filled, the submit button is activated', () => {
      cmp = createCmp();
      expect(cmp.element).toMatchSnapshot();
      expect(cmp.find('.submit-name').attributes().disabled).toBe(undefined);
    });

    it('when the submit name button is clicked, triggers a startGame method', () => {
      const stub = jest.fn();
      cmp = createCmp();
      cmp.setMethods({ startGame: stub });
      cmp.find('.submit-name').trigger('click');
      expect(stub).toBeCalled();
    });

    it('dont trigger a startGame event with rock option when a startGame method is called and has no name', () => {
      cmp = createCmp();
      cmp.vm.name = '';
      const stub = jest.fn();
      cmp.vm.$on('startGame', stub);
      cmp.find('.submit-name').trigger('click');
      expect(stub).not.toHaveBeenCalled();
    });

    it('triggers a startGame event with rock option when a startGame method is called and has a name', () => {
      cmp = createCmp();
      const stub = jest.fn();
      cmp.vm.$on('startGame', stub);
      cmp.find('.submit-name').trigger('click');
      expect(stub).toBeCalledWith('Bot');
    });

    it('has a back option', () => {
      cmp = createCmp();
      expect(cmp.find('.back-button').exists()).toBe(true);
    });
  });

  describe('After the game start', () => {
    it('has 5 options to choose', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      expect(cmp.findAll('.play-options .button').length).toBe(5);
    });

    it('has a back option', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      expect(cmp.find('.back-button').exists()).toBe(true);
    });

    it('if is the bot player, has no back option displayed', () => {
      cmp = createCmp({ isComputer: true, gameHasStarted: true, playerOptions });
      expect(cmp.find('.back-button').exists()).toBe(false);
    });

    it('if is the bot player, has no options displayed', () => {
      cmp = createCmp({ isComputer: true, gameHasStarted: true, playerOptions });
      expect(cmp.findAll('.play-options .button').length).toBe(0);
    });

    it('when you click the lizard option, it triggers a method to inform the choosen option', () => {
      const stub = jest.fn();
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      cmp.setMethods({ playerChoose: stub });
      cmp.find('.lizard-opt').trigger('click');
      expect(stub).toBeCalled();
    });

    it('triggers a playerChoose event with lizard option when a playerChoose method is called', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      const stub = jest.fn();
      cmp.vm.$on('playerChoose', stub);
      cmp.find('.lizard-opt').trigger('click');
      expect(stub).toBeCalledWith(playerOptions.lizard);
    });

    it('when you click the rock option, it triggers a method to inform the choosed option', () => {
      const stub = jest.fn();
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      cmp.setMethods({ playerChoose: stub });
      cmp.find('.rock-opt').trigger('click');
      expect(stub).toBeCalled();
    });

    it('triggers a playerChoose event with rock option when a playerChoose method is called', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      const stub = jest.fn();
      cmp.vm.$on('playerChoose', stub);
      cmp.find('.rock-opt').trigger('click');
      expect(stub).toBeCalledWith(playerOptions.rock);
    });

    it('when you click the scissors option, it triggers a method to inform the choosed option', () => {
      const stub = jest.fn();
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      cmp.setMethods({ playerChoose: stub });
      cmp.find('.scissors-opt').trigger('click');
      expect(stub).toBeCalled();
    });

    it('triggers a playerChoose event with scissors option when a playerChoose method is called', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      const stub = jest.fn();
      cmp.vm.$on('playerChoose', stub);
      cmp.find('.scissors-opt').trigger('click');
      expect(stub).toBeCalledWith(playerOptions.scissors);
    });

    it('when you click the spock option, it triggers a method to inform the choosed option', () => {
      const stub = jest.fn();
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      cmp.setMethods({ playerChoose: stub });
      cmp.find('.spock-opt').trigger('click');
      expect(stub).toBeCalled();
    });

    it('triggers a playerChoose event with spock option when a playerChoose method is called', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      const stub = jest.fn();
      cmp.vm.$on('playerChoose', stub);
      cmp.find('.spock-opt').trigger('click');
      expect(stub).toBeCalledWith(playerOptions.spock);
    });

    it('when you click the paper option, it triggers a method to inform the choosed option', () => {
      const stub = jest.fn();
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      cmp.setMethods({ playerChoose: stub });
      cmp.find('.paper-opt').trigger('click');
      expect(stub).toBeCalled();
    });

    it('triggers a playerChoose event with paper option when a playerChoose method is called', () => {
      cmp = createCmp({ isComputer: false, gameHasStarted: true, playerOptions });
      const stub = jest.fn();
      cmp.vm.$on('playerChoose', stub);
      cmp.find('.paper-opt').trigger('click');
      expect(stub).toBeCalledWith(playerOptions.paper);
    });
  });
});

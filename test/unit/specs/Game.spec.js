import { mount } from '@vue/test-utils';
import Game from '@/components/Game';
import Player from '@/components/Player';
import Board from '@/components/Board';

describe('GameSpec.vue', () => {
  let cmp;

  /* Mouting the component before each test */
  beforeEach(() => {
    cmp = mount(Game, {});
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

  it('has 2 Player component', () => {
    const numberPlayers = cmp.findAll(Player).length;
    expect(numberPlayers).toBe(2);
  });

  it('has a Board component', () => {
    expect(cmp.contains(Board)).toBe(true);
  });
});

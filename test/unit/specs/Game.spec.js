import { shallowMount } from '@vue/test-utils';
import Game from '@/components/Game';

describe('GameSpec.vue', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Game, {});
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});

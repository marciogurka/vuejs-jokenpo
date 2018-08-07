import { mount } from '@vue/test-utils';
import Game from '@/components/Game';

describe('HelloWorld.vue', () => {
  const wrapper = mount(Game);
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain('<div class="game"></div>');
  });
});

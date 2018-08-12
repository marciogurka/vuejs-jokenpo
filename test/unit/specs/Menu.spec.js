import { mount, RouterLinkStub } from '@vue/test-utils';
import Menu from '@/components/Menu';

describe('MenuSpec.vue', () => {
  let cmp;

  /* Mouting the component before each test */
  beforeEach(() => {
    cmp = mount(Menu, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });

  it('has a /game link option', () => {
    expect(cmp.find('.button').attributes().id).toBe('start-game');
  });
});

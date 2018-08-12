import { mount, RouterLinkStub } from '@vue/test-utils';
import Welcome from '@/components/Welcome';
import Menu from '@/components/Menu';

describe('WelcomeSpec.vue', () => {
  let cmp;

  /* Mouting the component before each test */
  beforeEach(() => {
    cmp = mount(Welcome, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });

  it('is a Vue Component', () => {
    expect(cmp.isVueInstance()).toBe(true);
  });

  it('is a Welcome component', () => {
    expect(cmp.is(Welcome)).toBe(true);
  });

  it('has a Menu component', () => {
    expect(cmp.contains(Menu)).toBe(true);
  });
});

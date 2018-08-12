import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Game from '@/components/Game';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
    },
  ],
});

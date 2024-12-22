import GamesIndex from '@/views/games/Index.vue';

export default [
    {
      path: '/games',
      name: 'games',
      component: GamesIndex,
      meta: {
        requiresAuth: true
      }
    },
  ];
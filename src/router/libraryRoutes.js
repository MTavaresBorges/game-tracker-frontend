import LibraryIndex from '@/views/library/Index.vue';

export default [
    {
      path: '/libraries',
      name: 'libraries',
      component: LibraryIndex,
      meta: {
        requiresAuth: true
      }
    },
  ];
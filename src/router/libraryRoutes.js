import LibraryIndex from '@/views/library/Index.vue';
import LibraryCreate from '@/views/library/Create.vue';

export default [
    {
      path: '/libraries',
      name: 'libraries',
      component: LibraryIndex,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/libraries/create',
      name: 'library-create',
      component: LibraryCreate,
      meta: {
        requiresAuth: true
      }
    }

  ];
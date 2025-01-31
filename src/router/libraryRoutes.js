import LibraryIndex from '@/views/libraries/Index.vue';
import LibraryEdit from '@/views/libraries/Edit.vue';

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
      path: '/libraries/:id/edit',
      name: 'library-edit',
      component: LibraryEdit,
      meta: {
        requiresAuth: true
      }
    }

  ];
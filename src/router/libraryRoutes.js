import LibraryIndex from '@/views/library/Index.vue';
import LibraryEdit from '@/views/library/Edit.vue';

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
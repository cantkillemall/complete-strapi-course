module.exports = [
  {
    method: 'GET',
    path: '/repos',
    handler: 'getReposController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false
    },
  },
  {
    method: 'POST',
    path: '/project',
    handler: 'projectController.create',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false
    },
  },
  {
    method: 'POST',
    path: '/projects',
    handler: 'projectController.createAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false
    },
  },
  {
    method: 'DELETE',
    path: '/projects',
    handler: 'projectController.deleteAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false
    },
  },
];

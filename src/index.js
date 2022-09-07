'use strict';

const { likePostMutation, getLikePostResolver, likePostMutationConfig } = require('./api/post/graphql/post')

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');
    // extensionService.shadowCRUD('api::post.post').disable();
    // extensionService.shadowCRUD('api::post.post').disableQueries();
    // extensionService.shadowCRUD('api::post.post').disableMutations();
    // extensionService.shadowCRUD('api::tag.tag').disableActions(['update']);
    const extension = ({ nexus }) => ({
      // GraphQL SDL
      typeDefs: likePostMutation,
      resolvers: {
        Mutation: {
          likePost: getLikePostResolver(strapi)
        },
      },
      resolversConfig: {
        'Mutation.likePost': likePostMutationConfig
      },
    });
    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};

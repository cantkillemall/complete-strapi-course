'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    await strapi.service('api::post.post').exampleService({ myParam: "param" })
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  async find(ctx) {
    // Solution 1: fetch all posts (including premium) then filter

    // const { data, meta } = await super.find(ctx)
    // if (ctx.state.user) return { data, meta }
    // const filteredData = data.filter(post => !post.attributes.premium)
    // return { data: filteredData, meta }

    // Solution 2: rewrite the action to fetch only the needed posts

    // if the request is authenticated
    // const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false
    // if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)
    // const filteredPosts = await strapi.service('api::post.post').find({
    //   ...ctx.query,
    //   filters: {
    //     ...ctx.query.filters,
    //     premium: false
    //   }
    // })
    // const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx)
    // return this.transformResponse(sanitizedPosts)

    // Solution 3:

    // if the request is authenticated
    const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false
    if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)
    // if the request is public
    const publicPosts = await strapi.service('api::post.post').findPublic(ctx.query)
    const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx)
    return this.transformResponse(sanitizedPosts)

    // Method 2: Wrapping a core action (leaves core logic in place)
    // some custom logic here
    // ctx.query = { ...ctx.query, local: 'en' }
    // Calling the default core action
    // const { data, meta } = await super.find(ctx);
    // some more custom logic
    // meta.date = Date.now()
    // return { data, meta };

    // Method 3: Replacing a core action
    // ctx.query = { ...ctx.query, local: 'en' }
    // console.log(ctx.query)
    // const entity = await strapi.service('api::post.post').find(ctx.query);
    // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // const transformedResults = this.transformResponse(sanitizedEntity);
    // transformedResults.data.attributes = [...transformedResults.data.attributes.results]
    // const { page, pageSize, pageCount, total } = sanitizedEntity.pagination
    // transformedResults.meta.page = page
    // transformedResults.meta.pageSize = pageSize
    // transformedResults.meta.pageCount = pageCount
    // transformedResults.meta.total = total
    // return transformedResults
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    if (ctx.state.user) return await super.findOne(ctx)

    const { id } = ctx.params;
    const { query } = ctx;

    const postIfPublic = await strapi.service('api::post.post').findOneIfPublic({ id, query })
    const sanitizedPost = await this.sanitizeOutput(postIfPublic, ctx)
    return this.transformResponse(sanitizedPost)

    // const { id } = ctx.params;
    // const { query } = ctx;

    // const entity = await strapi.service('api::post.post').findOne(id, query);
    // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // return this.transformResponse(sanitizedEntity);
  },

  async likePost(ctx) {
    // We block public users to access this route !!
    // if (!ctx.state.user) return ctx.forbidden("Only authenticated users can like posts")

    const user = ctx.state.user
    const postId = ctx.params.id
    const { query } = ctx
    const updatedPost = await strapi.service('api::post.post').likePost({
      postId,
      userId: user.id,
      query,
    })
    const sanitizedPost = await this.sanitizeOutput(updatedPost, ctx)
    return this.transformResponse(sanitizedPost)
  }
}));

'use strict';

/**
 * `check-role` policy
 */

module.exports = (policyContext, config, { strapi }) => {
  const { userRole } = config
  const isEligible = policyContext.state.user && policyContext.state.user.role.name === userRole;
  // Add your own logic here.
  // strapi.log.info('In is-admin policy.');
  // console.log(isEligible);

  // const canDoSomething = true;

  console.log(strapi)

  if (isEligible) {
    return true;
  }

  return false;
};

import User, { resolver as user } from './get-user';
import Me, { resolver as me } from './get-me';
import CreateUser, { resolver as create_user } from './create-user';
import UpdateUser, { resolver as update_user } from './update-user';

const BaseUserType = `
interface BaseUser {
  id: Int!
  name: String,
  email: String!
}
`;

// Resolve type for BaseUser Interface
const BaseUser = {
  __resolveType: () => 'BaseUser'
};

export default {
  typeDefs: [BaseUserType, ...User, ...CreateUser, ...UpdateUser, ...Me],
  queries: { user, me },
  mutations: { create_user, update_user },
  BaseUser
};

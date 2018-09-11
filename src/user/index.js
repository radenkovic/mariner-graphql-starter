import User, { resolver as user } from './get-user';
import MeType, { resolver as me } from './get-me';
import CreateUser, { resolver as create_user } from './create-user';
import UpdateUser, { resolver as update_user } from './update-user';

const BaseUserType = `
interface BaseUser {
  id: UUID!
  name: String,
  email: String!,
  username: String!,
  created_at: DateTime!,
  updated_at: DateTime!
}
`;

// Resolve type for BaseUser Interface
const BaseUser = {
  __resolveType: () => 'BaseUser'
};

export default {
  typeDefs: [BaseUserType, ...User, ...CreateUser, ...UpdateUser, ...MeType],
  queries: { user, me },
  mutations: { create_user, update_user },
  BaseUser
};

// @flow
import Auth from './auth';

type Login = {
  user: Object,
  accessToken: string
};

/*
  Description: will send a cookie to user
  @param response {Object}: express res
  @param value {String}: string to be sent as cookie
*/

function issueCookie(response: Object, value: string): void {
  response.cookie('graphql-cookie', value, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
}

export default (response: Object, user: Object): Login => {
  delete user.password;
  const accessToken = user.access_token || Auth.sign(user);
  issueCookie(response, accessToken);
  return {
    user,
    accessToken
  };
};

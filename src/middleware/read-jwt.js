import Auth from '@/authenticate/auth';

export default (req, res, next) => {
  let jwt;
  // From Cookie
  jwt = req.cookies['graphql-cookie'];
  // From Headers-Authentication
  const { authorization } = req.headers;
  if (authorization && authorization.includes('Bearer ')) {
    jwt = authorization.split('Bearer ')[1]; // eslint-disable-line
  }

  try {
    // Decode the jwt and attach it to ctx.user
    req.user = Auth.verify(jwt);
  } catch (e) {
    // NO_OP
  }

  return next();
};

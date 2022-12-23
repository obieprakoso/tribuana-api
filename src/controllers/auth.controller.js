const { errorHandler, withTransaction } = require("../util");
const { authService } = require("../service");

const signup = errorHandler(
  withTransaction(async (req, res, session) => {
    return authService.signupService(req, res, session);
  })
);

const login = errorHandler(
  withTransaction(async (req, res, session) => {
    return authService.loginService(req, res, session);
  })
);

const newRefreshToken = errorHandler(
  withTransaction(async (req, res, session) => {
    return authService.newRefreshToken(req, res, session);
  })
);

const newAccessToken = errorHandler(async (req, res) => {
  return authService.newAccessToken(req, res);
});

const logout = errorHandler(
  withTransaction(async (req, res, session) => {
    return authService.logout(req, res, session);
  })
);

const logoutAll = errorHandler(
  withTransaction(async (req, res, session) => {
    return authService.logoutAll(req, res, session);
  })
);

module.exports = {
  signup,
  login,
  newRefreshToken,
  newAccessToken,
  logout,
  logoutAll,
};

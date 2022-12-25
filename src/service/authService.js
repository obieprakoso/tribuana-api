const jwt = require("jsonwebtoken");
const models = require("../models");
const argon2 = require("argon2");
const { HttpError } = require("../error");

//Create User (Admin,User)
async function signupService(req, res, session) {
  const userDuplicate = await models.User.findOne({
    email: req.body.email,
  }).exec();
  if (userDuplicate) {
    throw new HttpError(401, "Email Duplicate");
  }
  const userDoc = models.User({
    email: req.body.email,
    name: req.body.name,
    no_unit: req.body.no_unit,
    no_tlp: req.body.no_tlp,
    is_active: req.body.is_active,
    role: req.body.role,
    password: await argon2.hash(req.body.password),
  });
  const refreshTokenDoc = models.RefreshToken({
    owner: userDoc.id,
  });

  await userDoc.save({ session });
  await refreshTokenDoc.save({ session });

  const refreshToken = createRefreshToken(
    userDoc.id,
    refreshTokenDoc.id,
    userDoc.role
  );
  const accessToken = createAccessToken(userDoc.id, userDoc.role);

  return {
    id: userDoc.id,
    accessToken,
    refreshToken,
  };
}

//Login
async function loginService(req, res, session) {
  const userDoc = await models.User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!userDoc) {
    throw new HttpError(401, "Wrong email or password");
  }
  await verifyPassword(userDoc.password, req.body.password);

  const refreshTokenDoc = models.RefreshToken({
    owner: userDoc.id,
  });

  await refreshTokenDoc.save({ session });

  const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
  const accessToken = createAccessToken(userDoc.id);

  return {
    id: userDoc.id,
    accessToken,
    refreshToken,
  };
}

//Create Refresh Token Code
function createRefreshToken(userId, refreshTokenId, role) {
  return jwt.sign(
    {
      userId: userId,
      tokenId: refreshTokenId,
      role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
    }
  );
}

//Create Access Token Code
function createAccessToken(userId, role) {
  return jwt.sign(
    {
      userId: userId,
      role: role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
    }
  );
}

//Cek Password Match
async function verifyPassword(hashedPassword, rawPassword) {
  if (await argon2.verify(hashedPassword, rawPassword)) {
    // password matches
  } else {
    throw new HttpError(401, "Wrong email or password");
  }
}

//Reload Refresh Token Code
async function newRefreshToken(req, res, session) {
  const currentRefreshToken = await validateRefreshToken(req.body.refreshToken);
  const refreshTokenDoc = models.RefreshToken({
    owner: currentRefreshToken.userId,
  });

  await refreshTokenDoc.save({ session });
  await models.RefreshToken.deleteOne(
    { _id: currentRefreshToken.tokenId },
    { session }
  );

  const refreshToken = createRefreshToken(
    currentRefreshToken.userId,
    refreshTokenDoc.id,
    currentRefreshToken.role
  );
  const accessToken = createAccessToken(
    currentRefreshToken.userId,
    currentRefreshToken.role
  );

  return {
    id: currentRefreshToken.userId,
    accessToken,
    refreshToken,
  };
}

//Reload Token Code
async function newAccessToken(req, res) {
  const refreshToken = await validateRefreshToken(req.body.refreshToken);
  const accessToken = createAccessToken(refreshToken.userId, refreshToken.role);

  return {
    id: refreshToken.userId,
    accessToken,
    refreshToken: req.body.refreshToken,
  };
}

//Logout Account
async function logout(req, res, session) {
  const refreshToken = await validateRefreshToken(req.body.refreshToken);
  await models.RefreshToken.deleteOne(
    { _id: refreshToken.tokenId },
    { session }
  );
  return { success: true };
}

//Logout All Account
async function logoutAll(req, res, session) {
  const refreshToken = await validateRefreshToken(req.body.refreshToken);
  await models.RefreshToken.deleteMany(
    { owner: refreshToken.userId },
    { session }
  );
  return { success: true };
}

//Checking Refresh Token Code
async function validateRefreshToken(token) {
  const decodeToken = () => {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      // err
      throw new HttpError(401, "Unauthorised");
    }
  };

  const decodedToken = decodeToken();
  const tokenExists = await models.RefreshToken.exists({
    _id: decodedToken.tokenId,
    owner: decodedToken.userId,
  });
  if (tokenExists) {
    return decodedToken;
  } else {
    throw new HttpError(401, "Unauthorised");
  }
}

module.exports = {
  signupService,
  loginService,
  logout,
  logoutAll,
  newRefreshToken,
  newAccessToken,
  createRefreshToken,
  createAccessToken,
  verifyPassword,
  validateRefreshToken,
};

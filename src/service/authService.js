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
    device: req.body.device,
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
async function loginWebService(req, res, session) {
  try {
    const userWebDoc = await models.User.findOne({
      email: req.body.email,
      device: "web",
    })
      .select("+password")
      .exec();
    if (!userWebDoc) {
      throw new HttpError(401, "Wrong email or password");
    }
    if (!userWebDoc.is_active) {
      throw new HttpError(401, "Account is lock");
    }
    await verifyPassword(userWebDoc.password, req.body.password);

    const refreshTokenDoc = models.RefreshToken({
      owner: userWebDoc.id,
    });

    await refreshTokenDoc.save({ session });

    const refreshToken = createRefreshToken(userWebDoc.id, refreshTokenDoc.id);
    const accessToken = createAccessToken(userWebDoc.id);

    return {
      id: userWebDoc.id,
      email: userWebDoc.email,
      name: userWebDoc.name,
      no_tlp: userWebDoc.no_tlp,
      role: userWebDoc.role,
      no_unit: userWebDoc.no_unit,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log(error);
    throw new HttpError(500, error);
  }
}

async function loginService(req, res, session) {
  const userDoc = await models.User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!userDoc) {
    throw new HttpError(401, "Wrong email or password");
  }
  if (!userDoc.is_active) {
    throw new HttpError(401, "Account is lock");
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
    email: userDoc.email,
    name: userDoc.name,
    no_tlp: userDoc.no_tlp,
    role: userDoc.role,
    no_unit: userDoc.no_unit,
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
  const userDoc = await models.User.findById(currentRefreshToken.userId).exec();
  return {
    id: currentRefreshToken.userId,
    email: userDoc.email,
    name: userDoc.name,
    no_tlp: userDoc.no_tlp,
    role: userDoc.role,
    no_unit: userDoc.no_unit,
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
  loginWebService,
  logout,
  logoutAll,
  newRefreshToken,
  newAccessToken,
  createRefreshToken,
  createAccessToken,
  verifyPassword,
  validateRefreshToken,
};

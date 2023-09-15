const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const UserDao = require("../dao/UserDao");
const RoleDao = require("../dao/RoleDao");
const responseHandler = require("../helper/responseHandler");
const logger = require("../config/logger");
const { userConstant } = require("../config/constant");
const userDto = require("../dto/userDto");

class UserService {
  constructor() {
    this.userDao = new UserDao();
    this.roleDao = new RoleDao();
  }

  /**
   * Create a user
   * @param {Object} userBody
   * @returns {Object}
   */
  createUser = async (userBody) => {
    try {
      let message =
        "Successfully Registered the account! Please Verify your email.";
      if (await this.userDao.isEmailExists(userBody.email)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Email already taken"
        );
      }
      let roleData = await this.roleDao.findById(userBody.role_id);
      if (!roleData) {
        message = "Role not found";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      } else if (!roleData.is_active) {
        message = "Role not active";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      const uuid = uuidv4();
      userBody.email = userBody.email.toLowerCase();
      userBody.password = bcrypt.hashSync(userBody.password, 8);
      userBody.uuid = uuid;
      userBody.status = userConstant.STATUS_ACTIVE;
      userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;

      let userData = await this.userDao.create(userBody);
      if (!userData) {
        message = "Registration Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      userData = userData.toJSON().map((each) => new userDto(each));

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        userData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  /**
   * Get user
   * @param {String} email
   * @returns {Object}
   */

  isEmailExists = async (email) => {
    const message = "Email found!";
    if (!(await this.userDao.isEmailExists(email))) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email not Found!!"
      );
    }
    return responseHandler.returnSuccess(httpStatus.OK, message);
  };

  getUserByUuid = async (uuid) => {
    return this.userDao
      .findOneByWhere({ uuid })
      .map((each) => new userDto(each));
  };

  getUserByid = async (id) => {
    try {
      let message = "Successfully get detail user";
      let dataUser = await this.userDao.findById(id);
      if (!dataUser) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "User Not found!"
        );
      }
      dataUser = new userDto(dataUser);
      return responseHandler.returnSuccess(httpStatus.OK, message, dataUser);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  getAllUser = async (status) => {
    try {
      let message = "Successfully get all user";
      var dataAllUser = JSON.stringify(
        await this.userDao.findByWhere({
          status,
        }),
        null,
        null
      );
      let AllUser = JSON.parse(dataAllUser).map((user) => new userDto(user));

      return responseHandler.returnSuccess(httpStatus.OK, message, AllUser);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  changePassword = async (data, uuid) => {
    let message = "Login Successful";
    let statusCode = httpStatus.OK;
    let user = await this.userDao.findOneByWhere({ uuid });

    if (!user) {
      return responseHandler.returnError(
        httpStatus.NOT_FOUND,
        "User Not found!"
      );
    }

    if (data.password !== data.confirm_password) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Confirm password not matched"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.old_password,
      user.password
    );
    user = user.toJSON();
    delete user.password;
    if (!isPasswordValid) {
      statusCode = httpStatus.BAD_REQUEST;
      message = "Wrong old Password!";
      return responseHandler.returnError(statusCode, message);
    }
    const updateUser = await this.userDao.updateWhere(
      { password: bcrypt.hashSync(data.password, 8) },
      { uuid }
    );

    if (updateUser) {
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Password updated Successfully!",
        {}
      );
    }

    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Password Update Failed!"
    );
  };
}

module.exports = UserService;

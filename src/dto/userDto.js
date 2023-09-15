class userDto {
  id;
  name;
  email;
  status;
  email_verified;
  address;
  phone_number;
  number_unit;

  constructor(user) {
    this.id = user.id;
    this.name = `${user.first_name} ${user.last_name}`.trimEnd();
    this.email = user.email;
    this.status = user.status;
    this.email_verified = user.email_verified;
    this.address = user.address;
    this.phone_number = user.phone_number;
    this.number_unit = user.number_unit;
  }
}

module.exports = userDto;

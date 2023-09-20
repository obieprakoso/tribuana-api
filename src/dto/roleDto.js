class roleDto {
  id;
  name;
  is_active;

  constructor(role) {
    this.id = role.id;
    this.name = role.name;
    this.is_active = role.is_active;
  }
}

module.exports = roleDto;

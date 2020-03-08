import JwtDecode from "jwt-decode";

export default class User {
  static from(token) {
    try {
      let obj = JwtDecode(token);
      return new User(obj.user[0]);
    } catch (err) {
      return err;
    }
  }

  constructor({ id, role_name, username, email, lang }) {
    this.id = id;
    this.username = username;
    this.role = role_name;
    this.email = email;
    this.lang = lang;
  }

  get getRole() {
    return this.role;
  }
}
export class validator {
  static checkTodo(todo) {
    return this.#isExistString(todo) && this.#isString(todo);
  }

  static checkAccount(email, password) {
    return this.#checkEmail(email) && this.#checkPassword(password);
  }

  static #checkEmail(email) {
    return this.#hasAtSign(email);
  }

  static #checkPassword(password) {
    return this.#isMinimumLength(password);
  }

  static #isExistString(string) {
    return string.trim().length > 0;
  }

  static #isString(value) {
    return typeof value === 'string';
  }

  static isSame(array) {
    const lastValue = array.pop();
    return array.every((value) => lastValue === value);
  }

  static #hasAtSign(value) {
    return value.includes('@');
  }

  static #isMinimumLength(value) {
    return value.length >= 8;
  }
}

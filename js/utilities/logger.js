export default class Logger {
  static i(string, tag) {
    console.log(`INFO: ${tag || ""} || ${string}`);
  }

  static e(string, tag) {
    console.error(`ERR: ${tag || ""} || ${string}`);
  }
}

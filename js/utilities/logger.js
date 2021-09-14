export default class Logger {
  static i(string, tag) {
    console.log(`INFO: ${tag || ""} || ${string}`);
  }

  static e(string) {
    console.error(`ERR: ${tag || ""} || ${string}`);
  }
}

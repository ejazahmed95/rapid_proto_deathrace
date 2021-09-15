export default class Logger {
  static i(logString: string, tag?: string) {
    console.log(`INFO: ${tag || ""} || ${logString}`);
  }

  static e(logString: string, tag?: string) {
    console.error(`ERR: ${tag || ""} || ${logString}`);
  }
}

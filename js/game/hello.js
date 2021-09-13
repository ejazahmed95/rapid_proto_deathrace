export default class Hello {
  constructor() {
    this.a = "Hello World Field";
  }

  print() {
    console.log("Greeting:: ", this["a"]);
  }
}

export default class DI {
  // static objects;

  static Register(type, obj) {
    DI.objects[type] = obj;
  }

  static Get(type) {
    return DI.objects[type];
  }
}

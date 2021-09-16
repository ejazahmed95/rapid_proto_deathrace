export default class EventManager {
    private eventHandlers: Record<string, Function[]> = {};
    constructor() {
    }
  
    public addHandler(eventName:string, handler: Function) {
      if(this.eventHandlers[eventName] == null) {
        this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(handler);
    }
  
    public removeHandler(eventName: string, handler: Function) {
      if(this.eventHandlers[eventName]) {
        let index = this.eventHandlers[eventName].indexOf(handler);
        if(index >= 0) {
          this.eventHandlers[eventName] = this.eventHandlers[eventName].splice(index, 1);
        }
      }
    }
  
    public sendEvent(eventName: string, eventData?: object) {
        console.log('Send Event ' + eventName);
      let handlers = this.eventHandlers[eventName] || [];
      console.log(handlers.length);
      for(let handler of handlers) {
        handler(eventData);
      }
    }

    public clearAll() {
        this.eventHandlers = {};
    }
  }
  
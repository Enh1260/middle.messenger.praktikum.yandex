type TListener = Record<string, {(...args: unknown[]):void|unknown[]} []>

export default class EventBus {
  protected listeners: TListener = {};

  public on(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      console.log(`Нет события: ${event}`);
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

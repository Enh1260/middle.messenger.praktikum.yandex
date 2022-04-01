import set from '/src/utils/set.ts';
import EventBus from '/src/utils/eventBus.ts';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();

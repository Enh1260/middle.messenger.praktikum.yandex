import set from '../utils/set';
import EventBus from '../utils/eventBus';
import { IStoreState } from '../types/store-state.interface';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: IStoreState = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, { path });
  }
}

export default new Store();

import store from '../store/store';
import { IStoreState } from '../types/store-state.interface';
import Block, { TComponentProps } from './block';

export const connect = (mapStateToProps: (state: IStoreState) => Record<string, unknown>) =>
  (Component: typeof Block) => class extends Component {
    constructor(props: TComponentProps) {
      const state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      store.on('updated', (arg: Record<string, string>) => {
        const { path } = arg;
        const newProps = mapStateToProps(store.getState());

        if (this.isPropsKeysInState(path, newProps)) {
          this.setProps({ ...newProps });
        }
      });
    }
  };
export default connect;

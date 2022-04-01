import store from '/src/store/store.ts';

export const connect = (mapStateToProps: (state)) => (Component) => class extends Component {
  constructor(props) {
    const state = store.getState();
    super({ ...props, ...mapStateToProps(state) });

    store.on('updated', () => {
      this.setProps({ ...mapStateToProps(store.getState()) });
    });
  }
};
export default connect;

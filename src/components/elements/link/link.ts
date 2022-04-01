import Block from '/src/utils/block.ts';
import template from './link.pug';
import router from '/src/router/index.ts';

class Link extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click(event) {
          event.preventDefault();
          router.go(this.props.href);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;

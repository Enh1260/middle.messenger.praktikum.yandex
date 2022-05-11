import Block, { TComponentProps } from '../../../utils/block';
import template from './link.pug';
import router from '../../../router/index';

class Link extends Block {
  constructor(props: TComponentProps) {
    super({
      ...props,
      events: {
        click(event: any) {
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

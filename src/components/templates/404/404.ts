import Block from '/src/utils/block.ts';
import template from './404.pug';

class Page404 extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Page404;

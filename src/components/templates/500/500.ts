import Block from '/src/utils/block.ts';
import template from './500.pug';

class Page500 extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Page500;

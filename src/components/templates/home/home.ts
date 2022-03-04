import template from './home.pug';
import Block from '/src/utils/block.ts';

class HomePage extends Block {
  render() {
    return this.compile(template, {});
  }
}

export default HomePage;

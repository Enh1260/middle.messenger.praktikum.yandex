import Block from '/src/utils/block.ts';
import template from './input.pug';

class Input extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
export default Input;

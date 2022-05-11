import Block from '../../../utils/block';
import template from './button.pug';

class Button extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;

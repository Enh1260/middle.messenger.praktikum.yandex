import Block from '/src/utils/block.ts';
import template from './fieldsetInput.pug';
import Input from '../input/input.ts';

class FieldsetInput extends Block {
  constructor(props) {
    super(props);
    this.props.isValid = false;
  }

  render() {
    this.children.input = new Input(this.props.inputProps);

    return this.compile(template, { ...this.props });
  }
}
export default FieldsetInput;

import Block from '/src/utils/block.ts';
import template from './fieldsetInput.pug';
import Input from '/src/components/elements/input/input.ts';
import Validator from '/src/utils/validator.ts';

export type FieldsetInputProps = {
  formFieldClassName: string;
  labelClassName: string;
  errorText?: string;
  text: string;
  isValid: boolean;
  inputProps: {
    textBtn: string;
    className: string;

  }
}

class FieldsetInput extends Block {
  fieldSetValidate(data) {
    const { validationType } = this.props;
    const { isValid, errorMessage } = Validator.validate(validationType, data);

    const errorSpan = this.getContent().querySelector('span') as HTMLElement;

    if (isValid) {
      errorSpan.textContent = '';
    } else {
      errorSpan.textContent = errorMessage;
    }
  }

  initChildren() {
    if (!this.children.input) {
      this.children.input = new Input(this.props.inputProps);
    }

    this.children.input.eventBus().on(
      'validate',
      this.fieldSetValidate.bind(this),
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default FieldsetInput;

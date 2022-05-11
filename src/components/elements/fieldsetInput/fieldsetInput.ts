import Block from '../../../utils/block';
import template from './fieldsetInput.pug';
import Input from '../../../components/elements/input/input';
import Validator from '../../../utils/validator';

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
  fieldSetValidate(data: string) {
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

    (this.children.input as Block).eventBus.on(
      'validate',
      this.fieldSetValidate.bind(this),
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default FieldsetInput;

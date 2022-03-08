import Block from '/src/utils/block.ts';
import template from './form.pug';
import Button from '/src/components/elements/button/index.ts';
import FieldsetInput from '../fieldsetInput/index.ts';
import HTTPTransport from '/src/utils/HTTPTransport.ts';

class Form extends Block {
  protected validate(data: number | string): void {
    const span: HTMLElement = this.getContent().querySelector('span');
    const regExp = new RegExp(this.props.regExp);
    const isValid: boolean = regExp.test(data);

    if (isValid) {
      span.style.visibility = 'hidden';
    } else {
      span.style.visibility = 'visible';
    }
    this.props.isValid = isValid;
  }

  protected getFormData(): Record<string, string | number> {
    const inputEl: HTMLElement = this.getContent();
    const inputs: [HTMLElement] = inputEl.querySelectorAll('input');

    const data: Record<string, string | number> = {};
    Object.entries(inputs).forEach((input) => {
      const name: string = input[1].getAttribute('name');
      data[name] = input[1].value;
    });
    return data;
  }

  initChildren() {
    this.children.fieldsetInputs = this.createBlocks(this.props.propsFieldsetInputs, FieldsetInput);
    this.children.fieldsetInputs.forEach((fieldsetInput) => {
      fieldsetInput.children.input.eventBus().on('validate', this.validate.bind(fieldsetInput));
    });
    this.children.btn = new Button({
      textBtn: this.props.textBtn,
      className: 'default-button auth-form__button',
      events: {
        click: (event) => {
          event.preventDefault();
          const { fieldsetInputs } = this.children;
          fieldsetInputs.forEach((fieldset) => {
            const inputData = fieldset.children.input.getContent().value;
            fieldset.children.input.eventBus().emit('validate', inputData);
          });
          const isValidForm = fieldsetInputs.every((fieldset) => fieldset.props.isValid);

          if (isValidForm) {
            const { method } = this.props.httpOptions;
            const url = `/${this.props.httpOptions.url}`;
            const fetch = new HTTPTransport();
            fetch[method](url, { data: this.getFormData() });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Form;

import Block from '/src/utils/block.ts';
import template from './formAvatar.pug';
import Button from '/src/components/elements/button/index.ts';
import Input from '/src/components/elements/input/index.ts';

class FormAvatar extends Block {
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
    this.children.input = new Input({
      className: 'auth-form__input',
      name: 'avatar',
      type: 'file',
    });
    this.children.btn = new Button({
      textBtn: 'Поменять',
      className: 'default-button auth-form__button',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default FormAvatar;

import Block from '../../../utils/block';
import template from './formAvatar.pug';
import Button from '../../../components/elements/button/index';
import Input from '../../../components/elements/input/index';

class FormAvatar extends Block {
  protected getFormData(): Record<string, string | number> {
    const inputEl: HTMLElement = this.getContent();
    const inputs: NodeListOf<HTMLInputElement> = inputEl.querySelectorAll('input');

    const data: Record<string, string | number> = {};
    Object.entries(inputs).forEach((input) => {
      const name = input[1].getAttribute('name') as string;
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

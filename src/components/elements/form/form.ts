import Block from '/src/utils/block.ts';
import template from './form.pug';
import Button from '/src/components/elements/button/index.ts';

class Form extends Block {
  constructor(props) {
    super({ ...props, content: [] });
  }

  protected getFormData(): Record<string, string | number> | null {
    const inputEl: HTMLElement = this.getContent();
    const inputs: [HTMLElement] = inputEl.querySelectorAll('input');

    const data: Record<string, string | number> = {};
    if (!inputs) return null;
    Object.entries(inputs).forEach((input) => {
      const name: string = input[1].getAttribute('name');
      data[name] = input[1].value;
    });
    return data;
  }

  initChildren() {
    if (this.props.contentProps) {
      this.children.content = this.props.contentProps?.map((item) =>
        new item.component(item.props));
    }

    this.children.btnSubmit = new Button({
      textBtn: this.props.btnSubmit?.textBtn || '',
      className: this.props.btnSubmit?.className || 'default-button',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Form;

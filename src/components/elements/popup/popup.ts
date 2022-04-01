import Block from '/src/utils/block.ts';
import template from './popup.pug';
import Button from '/src/components/elements/button/index.ts';

class Popup extends Block {
  initChildren() {
    this.children.btnClose = new Button({
      className: 'popup__btn-close',
      events: {
        click: () => {
          this.hide();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Popup;

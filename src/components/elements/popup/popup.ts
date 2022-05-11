import Block from '../../../utils/block';
import template from './popup.pug';
import Button from '../../../components/elements/button/index';

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
    this.bindPopupCloseHandler(this.children.content);
  }

  private bindPopupCloseHandler(content: Block | Block[]) {
    if (!content || typeof content !== 'object') return;

    if (Array.isArray(content)) {
      content.forEach((contentBlock) => {
        contentBlock.eventBus.on('hidePopup', this.hide.bind(this));
      });
    } else {
      content.eventBus.on('hidePopup', this.hide.bind(this));
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Popup;

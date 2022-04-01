import Block from '/src/utils/block.ts';
import template from './backPage.pug';
import Button from '/src/components/elements/button/index.ts';
import router from '/src/router/index.ts';

class BackPage extends Block {
  initChildren() {
    this.children.btnBack = new Button({
      className: 'profile__back',
      events: {
        click: () => {
          router.go(this.props.href);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default BackPage;

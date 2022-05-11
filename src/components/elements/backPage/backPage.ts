import Block from '../../../utils/block';
import template from './backPage.pug';
import Button from '../../../components/elements/button/index';
import router from '../../../router/index';

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

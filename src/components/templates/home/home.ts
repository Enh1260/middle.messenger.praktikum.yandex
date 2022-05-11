import template from './home.pug';
import Block from '../../../utils/block';
import Link from '../../../components/elements/link/index';

class HomePage extends Block {
  initChildren() {
    this.children.linkSignUp = new Link({
      text: 'Нет аккаунта?',
      href: '/sign-up',
      className: 'default-link',
    });
    this.children.linkSignIn = new Link({
      text: 'Войти',
      href: '/sign-in',
      className: 'default-link',
    });
  }

  render() {
    console.log(this);
    return this.compile(template, {});
  }
}

export default HomePage;

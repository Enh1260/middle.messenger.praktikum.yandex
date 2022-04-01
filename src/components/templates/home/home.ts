import template from './home.pug';
import Block from '/src/utils/block.ts';
import Link from '/src/components/elements/link/index.ts';

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
    return this.compile(template, {});
  }
}

export default HomePage;

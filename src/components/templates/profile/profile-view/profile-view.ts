import Block from '/src/utils/block.ts';
import template from './profile-view.pug';
import FieldsetInfo from '/src/components/elements/fieldset-info/index.ts';
import Link from '/src/components/elements/link/index.ts';
import store from '/src/store/store.ts';
import AuthController from '/src/controllers/Auth.controller.ts';
import BackPage from '/src/components/elements/backPage/index.ts';

class ProfileViewPage extends Block {
  constructor(props) {
    super(props);
    AuthController.getUser();
  }

  initChildren() {
    const propsFieldsetInfo: [{
      label: string,
      data: string
    }] = [
      {
        label: 'Почта',
        data: store.state?.currentUser?.email || null,
      },
      {
        label: 'Логин',
        data: store.state?.currentUser?.login || null,
      },
      {
        label: 'Имя',
        data: store.state?.currentUser?.first_name,
      },
      {
        label: 'Фамилия',
        data: store.state?.currentUser?.second_name,
      },
      {
        label: 'Имя в чате',
        data: store.state?.currentUser?.display_name,
      },
      {
        label: 'Телефон',
        data: store.state?.currentUser?.phone,
      },
    ];
    this.children.fieldsets = this.createBlocks(propsFieldsetInfo, FieldsetInfo);
    this.children.backPage = new BackPage({ href: '/messenger' });
    this.children.linkProfileEdit = new Link({
      href: '/settings-edit',
      className: 'default-link',
      text: 'Редактировать профиль',
    });
    this.children.linkPasswordEdit = new Link({
      href: '/settings-password',
      className: 'default-link',
      text: 'Сменить пароль',
    });
  }

  render() {
    return this.compile(template, {
      userName: `${store.state.currentUser?.first_name} ${store.state.currentUser?.second_name}`,
      linkBack: '/messenger',
    });
  }
}
export default ProfileViewPage;

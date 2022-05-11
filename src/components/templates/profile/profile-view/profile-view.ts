import Block, { TComponentProps } from '../../../../utils/block';
import template from './profile-view.pug';
import FieldsetInfo from '../../../../components/elements/fieldset-info/index';
import Link from '../../../../components/elements/link/index';
import store from '../../../../store/store';
import AuthController from '../../../../controllers/Auth.controller';
import BackPage from '../../../../components/elements/backPage/index';

interface TProfileProps extends TComponentProps{
  currentUser: any
}
class ProfileViewPage extends Block {
  constructor(props: TProfileProps) {
    super(props);
    AuthController.getUser();
  }

  initChildren() {
    const propsFieldsetInfo: {
      label: string,
      data: string | null
    }[] = [
      {
        label: 'Почта',
        data: (store.getState())?.currentUser?.email || null,
      },
      {
        label: 'Логин',
        data: (store.getState())?.currentUser?.login || null,
      },
      {
        label: 'Имя',
        data: (store.getState())?.currentUser?.first_name || null,
      },
      {
        label: 'Фамилия',
        data: (store.getState())?.currentUser?.second_name || null,
      },
      {
        label: 'Имя в чате',
        data: (store.getState())?.currentUser?.display_name || null,
      },
      {
        label: 'Телефон',
        data: (store.getState())?.currentUser?.phone || null,
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
      userName: `${
        (store.getState())?.currentUser?.first_name} 
        ${(store.getState())?.currentUser?.second_name}`,
      linkBack: '/messenger',
    });
  }
}
export default ProfileViewPage;

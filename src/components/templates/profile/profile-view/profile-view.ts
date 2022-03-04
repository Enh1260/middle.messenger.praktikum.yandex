import Block from '/src/utils/block.ts';
import template from './profile-view.pug';
import FieldsetInfo from '/src/components/elements/fieldset-info/index.ts';

const propsFieldsetInfo: [{
  label: string,
  data: string
}] = [
  {
    label: 'Почта',
    data: 'pochta@yandex.ru',
  },
  {
    label: 'Логин',
    data: 'ivanivanov',
  },
  {
    label: 'Имя',
    data: 'Иван',
  },
  {
    label: 'Фамилия',
    data: 'Иванов',
  },
  {
    label: 'Имя в чате',
    data: 'Иван',
  },
  {
    label: 'Телефон',
    data: '+7 (909) 967 30 30',
  },

];

class ProfileViewPage extends Block {
  initChildren() {
    this.children.fieldsets = this.createBlocks(propsFieldsetInfo, FieldsetInfo);
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/pages/chat/chat.html',
    });
  }
}
export default ProfileViewPage;

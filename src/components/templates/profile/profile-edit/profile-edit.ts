import Block from '/src/utils/block.ts';
import template from './profile-edit.pug';
import Form from '/src/components/elements/form/form/index.ts';

const propsFieldsetInputs: [{
  formFieldClassName: string,
  labelClassName: string,
  text: string,
  errorText?: string,
  errorClassName? : string,
  regExp?: RegExp,
  inputProps: {
    className: string,
    placeholder: string,
    name: string,
    events: Record<string, () => void>
  }
}] = [
  {
    formFieldClassName: 'profile__form-field',
    labelClassName: 'profile__form-label',
    text: 'Почта',
    errorText: 'Неверный формат почты',
    errorClassName: 'profile__error-span',
    regExp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi,
    inputProps: {
      className: 'profile__input',
      placeholder: 'pochta@yandex.ru',
      name: 'email',
      events: {
        blur() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
        focus() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
      },
    },
  },
  {
    formFieldClassName: 'profile__form-field',
    labelClassName: 'profile__form-label',
    text: 'Логин',
    errorText: 'Введите логин от 3-х символов без пробела',
    errorClassName: 'profile__error-span',
    regExp: /[\SA-Za-z0-9]{3,20}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: 'ivanivanov',
      name: 'login',
      events: {
        blur() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
        focus() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
      },
    },
  },
  {
    formFieldClassName: 'profile__form-field',
    labelClassName: 'profile__form-label',
    text: 'Имя',
    inputProps: {
      className: 'profile__input',
      placeholder: 'Иван',
      name: 'first_name',
    },
  },
  {
    formFieldClassName: 'profile__form-field',
    labelClassName: 'profile__form-label',
    text: 'Имя в чате',
    inputProps: {
      className: 'profile__input',
      placeholder: 'Иван',
      name: 'second_name',
    },
  },
  {
    formFieldClassName: 'profile__form-field',
    labelClassName: 'profile__form-label',
    text: 'Телефон',
    errorText: 'Неверный формат телефона',
    errorClassName: 'profile__error-span',
    regExp: /^([0-9+])[0-9]{10,15}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: '+7 (909) 967 30 30',
      name: 'phone',
      events: {
        blur() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
        focus() {
          const data = this.getContent().value;
          this.eventBus().emit('validate', data);
        },
      },
    },
  },
];

class ProfileEditPage extends Block {
  initChildren() {
    this.children.form = new Form({
      httpOptions: {
        url: 'profile_edit',
        method: 'put',
      },
      formClassName: 'profile__form',
      propsFieldsetInputs,
      textBtn: 'Сохранить',
    });
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/pages/profile/profile-view/profile-view.html',
    });
  }
}
export default ProfileEditPage;

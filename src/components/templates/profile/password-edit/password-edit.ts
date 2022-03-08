import Block from '/src/utils/block.ts';
import template from './password-edit.pug';
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
    text: 'Старый пароль',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'profile__error-span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: 'Пароль',
      name: 'oldPassword',
      type: 'password',
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
    text: 'Повторите новый пароль',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'profile__error-span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: 'Пароль',
      name: 'checkPassword',
      type: 'password',
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
    text: 'Старый пароль',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'profile__error-span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: 'Пароль',
      name: 'oldPassword',
      type: 'password',
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

class PasswordEditPage extends Block {
  initChildren() {
    this.children.form = new Form({
      httpOptions: {
        url: 'password_edit',
        method: 'put',
      },
      formClassName: 'profile__form-edit',
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
export default PasswordEditPage;

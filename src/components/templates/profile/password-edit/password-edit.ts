import Block from '/src/utils/block.ts';
import template from './password-edit.pug';
import Form from '/src/components/elements/form/index.ts';
import FieldsetInput from '/src/components/elements/fieldsetInput/index.ts';
import UserController from '/src/controllers/User.controller.ts';
import BackPage from '/src/components/elements/backPage/index.ts';

const formContentProps = [
  {
    component: FieldsetInput,
    props: {
      formFieldClassName: 'profile__form-field',
      labelClassName: 'profile__form-label',
      text: 'Новый пароль',
      validationType: 'password',
      inputProps: {
        placeholder: 'Новый пароль',
        className: 'profile__input',
        name: 'newPassword',
        type: 'password',
        events: {
          focus(event) {
            this.eventBus().emit('validate', event.target.value);
          },
          blur(event) {
            this.eventBus().emit('validate', event.target.value);
          },
        },
      },
    },
  },
  {
    component: FieldsetInput,
    props: {
      formFieldClassName: 'profile__form-field',
      labelClassName: 'profile__form-label',
      text: 'Повторите новый пароль',
      validationType: 'password',
      inputProps: {
        placeholder: 'Повторите новый пароль',
        className: 'profile__input',
        name: 'confirm_password',
        type: 'password',
        events: {
          focus(event) {
            this.eventBus().emit('validate', event.target.value);
          },
          blur(event) {
            this.eventBus().emit('validate', event.target.value);
          },
        },
      },
    },
  },
  {
    component: FieldsetInput,
    props: {
      formFieldClassName: 'profile__form-field',
      labelClassName: 'profile__form-label',
      text: 'Старый пароль',
      validationType: 'password',
      inputProps: {
        placeholder: 'Старый пароль',
        className: 'profile__input',
        name: 'oldPassword',
        type: 'password',
        events: {
          focus(event) {
            this.eventBus().emit('validate', event.target.value);
          },
          blur(event) {
            this.eventBus().emit('validate', event.target.value);
          },
        },
      },
    },
  },
];

/* const propsFieldsetInputs: [{
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
    text: 'Новый пароль',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'profile__error-span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'profile__input',
      placeholder: 'Пароль',
      name: 'newPassword',
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
      name: 'password_confirm',
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
]; */

class PasswordEditPage extends Block {
  initChildren() {
    this.children.backPage = new BackPage({ href: '/settings' });
    this.children.form = new Form({
      className: 'profile__form',
      btnSubmit: {
        className: 'default-button',
        textBtn: 'Сохранить',
      },
      events: {
        submit(event) {
          event.preventDefault();
          const fieldsetInputs = this.children.content;
          const resultValidation: boolean[] = [];
          fieldsetInputs.forEach((fieldset) => {
            const inputData = fieldset.children.input.getContent().value;
            fieldset.children.input.eventBus().emit('validate', inputData);
            const errorSpan = this.getContent().querySelector('span').textContent;
            resultValidation.push(!errorSpan);
          });
          const isValidForm = resultValidation.every((value) => value);

          if (isValidForm) {
            UserController.updatePassword(JSON.stringify(this.getFormData()));
          }
        },
      },
      contentProps: formContentProps,
    });
    /*    this.children.form = new Form({
      formClassName: 'profile__form-edit',
      propsFieldsetInputs,
      textBtn: 'Сохранить',
      events: {
        submit(event) {
          event.preventDefault();
          const { fieldsetInputs } = this.children;

          const resultValidation: boolean[] = []
          fieldsetInputs.forEach((fieldset) => {
            const inputData = fieldset.children.input.getContent().value;
            fieldset.children.input.eventBus().emit('validate', inputData)
            const errorSpan = this.getContent().querySelector('span').textContent
            resultValidation.push(!errorSpan)
          });
          const isValidForm = resultValidation.every(value => value)

          if (isValidForm) {
            UserController.updatePassword(JSON.stringify(this.getFormData()));
          }
        },
      },
    }); */
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/settings',
    });
  }
}
export default PasswordEditPage;

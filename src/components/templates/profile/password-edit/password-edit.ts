import Block from '../../../../utils/block';
import template from './password-edit.pug';
import Form from '../../../../components/elements/form/index';
import FieldsetInput from '../../../../components/elements/fieldsetInput/index';
import UserController from '../../../../controllers/User.controller';
import BackPage from '../../../../components/elements/backPage/index';

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
          focus(event: any) {
            this.eventBus.emit('validate', event.target.value);
          },
          blur(event: any) {
            this.eventBus.emit('validate', event.target.value);
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
          focus(event: any) {
            this.eventBus.emit('validate', event.target.value);
          },
          blur(event: any) {
            this.eventBus.emit('validate', event.target.value);
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
          focus(event: any) {
            this.eventBus.emit('validate', event.target.value);
          },
          blur(event: any) {
            this.eventBus.emit('validate', event.target.value);
          },
        },
      },
    },
  },
];

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
        submit(event: any) {
          event.preventDefault();
          const fieldsetInputs = this.children.content;
          const resultValidation: boolean[] = [];
          fieldsetInputs.forEach((fieldset: any) => {
            const inputData = fieldset.children.input.getContent().value;
            fieldset.children.input.eventBus.emit('validate', inputData);
            const errorSpan = this.getContent().querySelector('span').textContent;
            resultValidation.push(!errorSpan);
          });
          const isValidForm = resultValidation.every((value) => value);

          if (isValidForm) {
            UserController.updatePassword(this.getFormData());
          }
        },
      },
      contentProps: formContentProps,
    });
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/settings',
    });
  }
}
export default PasswordEditPage;

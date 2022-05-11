import Block from '../../../utils/block';
import template from './registration.pug';
import Form from '../../../components/elements/form/index';
import AuthController from '../../../controllers/Auth.controller';
import Link from '../../../components/elements/link/index';
import FieldsetInput from '../../../components/elements/fieldsetInput/index';

const formContentProps = [
  {
    component: FieldsetInput,
    props: {
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Почта',
      validationType: 'email',
      inputProps: {
        placeholder: 'Почта',
        className: 'auth-form__input',
        name: 'email',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Имя',
      validationType: 'first_name',
      inputProps: {
        placeholder: 'Имя',
        className: 'auth-form__input',
        name: 'first_name',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Фамилия',
      validationType: 'second_name',
      inputProps: {
        placeholder: 'Фамилия',
        className: 'auth-form__input',
        name: 'second_name',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Логин',
      validationType: 'login',
      inputProps: {
        placeholder: 'Логин',
        className: 'auth-form__input',
        name: 'login',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Телефон',
      validationType: 'phone',
      inputProps: {
        placeholder: 'Телефон',
        className: 'auth-form__input',
        name: 'phone',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Пароль',
      validationType: 'password',
      inputProps: {
        placeholder: 'Пароль',
        className: 'auth-form__input',
        name: 'password',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Пароль еще раз',
      inputProps: {
        placeholder: 'Пароль',
        className: 'auth-form__input',
        name: 'confirm_password',
        type: 'password',
      },
    },
  },
];

class RegistrationPage extends Block {
  initChildren() {
    this.children.linkSignIn = new Link({
      text: 'Войти',
      href: '/sign-in',
      className: 'default-link',
    });
    this.children.form = new Form({
      className: 'auth-form__form',
      btnSubmit: {
        className: 'default-button',
        textBtn: 'Зарегистрироваться',
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
            AuthController.registration(this.getFormData());
          }
        },
      },
      contentProps: formContentProps,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default RegistrationPage;

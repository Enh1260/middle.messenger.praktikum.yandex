import Block from '/src/utils/block.ts';
import template from './registration.pug';
import Form from '/src/components/elements/form/index.ts';
import AuthController from '/src/controllers/Auth.controller.ts';
import Link from '/src/components/elements/link/index.ts';
import FieldsetInput from '/src/components/elements/fieldsetInput/index.ts';

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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Имя',
      validationType: 'first_name',
      inputProps: {
        placeholder: 'Имя',
        className: 'auth-form__input',
        name: 'first_name',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Фамилия',
      validationType: 'second_name',
      inputProps: {
        placeholder: 'Фамилия',
        className: 'auth-form__input',
        name: 'second_name',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Логин',
      validationType: 'login',
      inputProps: {
        placeholder: 'Логин',
        className: 'auth-form__input',
        name: 'login',
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
      formFieldClassName: 'auth-form__field',
      labelClassName: 'auth-form__label',
      text: 'Телефон',
      validationType: 'phone',
      inputProps: {
        placeholder: 'Телефон',
        className: 'auth-form__input',
        name: 'phone',
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
            AuthController.registration(JSON.stringify(this.getFormData()));
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

import Block from '/src/utils/block.ts';
import template from './login.pug';
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
];

class LoginPage extends Block {
  initChildren() {
    this.children.linkSignUp = new Link({
      text: 'Нет аккаунта?',
      href: '/sign-up',
      className: 'default-link',
    });
    this.children.form = new Form({
      className: 'auth-form__form',
      btnSubmit: {
        className: 'default-button',
        textBtn: 'Войти',
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
            AuthController.login(JSON.stringify(this.getFormData()));
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
export default LoginPage;

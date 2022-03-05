import Block from '/src/utils/block.ts';
import template from './login.pug';
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
    formFieldClassName: 'auth-form__field',
    labelClassName: 'auth-form__label',
    text: 'Логин',
    errorText: 'Введите логин от 3-х символов без пробела',
    errorClassName: 'auth-form__span',
    regExp: /[\SA-Za-z0-9]{3,20}/g,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Логин',
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
    formFieldClassName: 'auth-form__field',
    labelClassName: 'auth-form__label',
    text: 'Пароль',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'auth-form__span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Пароль',
      name: 'password',
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

class LoginPage extends Block {
  initChildren() {
    this.children.form = new Form({
      httpOptions: {
        url: 'login',
        method: 'post',
      },
      formClassName: 'auth-form__form',
      textBtn: 'Войти',
      propsFieldsetInputs,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default LoginPage;

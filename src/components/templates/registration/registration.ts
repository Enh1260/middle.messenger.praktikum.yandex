import Block from '/src/utils/block.ts';
import template from './registration.pug';
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
    text: 'Почта',
    errorText: 'Неверный формат почты',
    errorClassName: 'auth-form__span',
    regExp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Почта',
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
    text: 'Имя',
    errorText: 'Имя должно начинаться с заглавной буквы без цифр и пробела',
    errorClassName: 'auth-form__span',
    regExp: /^([A-ZА-Я])[A-ZА-Яа-яa-z\S\D]+/g,
    inputProps: {
      regExp: /^([A-ZА-Я])[A-ZА-Яа-яa-z\S\D]+/g,
      className: 'auth-form__input',
      placeholder: 'Имя',
      name: 'first_name',
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
    text: 'Фамилия',
    errorText: 'Фамилия должна начинаться с заглавной буквы без цифр и пробела',
    errorClassName: 'auth-form__span',
    regExp: /^([A-ZА-Я])[A-ZА-Яа-яa-z\S\D]+/g,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Фамилия',
      name: 'second_name',
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
    text: 'Телефон',
    errorText: 'Неверный формат телефона',
    errorClassName: 'auth-form__span',
    regExp: /^([0-9+])[0-9]{10,15}/g,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Телефон',
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
  {
    formFieldClassName: 'auth-form__field',
    labelClassName: 'auth-form__label',
    text: 'Пароль еще раз',
    errorText: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    errorClassName: 'auth-form__span',
    regExp: /(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g,
    inputProps: {
      className: 'auth-form__input',
      placeholder: 'Пароль',
      name: 'password_check',
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

class RegistrationPage extends Block {
  initChildren() {
    this.children.form = new Form({
      httpOptions: {
        url: 'registration',
        method: 'post',
      },
      formClassName: 'auth-form__form',
      propsFieldsetInputs,
      textBtn: 'Зарегистрироваться',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default RegistrationPage;

import Block from '/src/utils/block.ts';
import template from './profile-edit.pug';
import Form from '/src/components/elements/form/index.ts';
import FieldsetInput from '/src/components/elements/fieldsetInput/index.ts';
import UserController from '/src/controllers/User.controller.ts';
import Button from '/src/components/elements/button/index.ts';
import FormAvatar from '/src/components/elements/formAvatar/index.ts';
import Popup from '/src/components/elements/popup/index.ts';
import AuthController from '/src/controllers/Auth.controller.ts';
import BackPage from '/src/components/elements/backPage/index.ts';

class ProfileEditPage extends Block {
  componentDidMount() {
    AuthController.getUser();
  }

  initChildren() {
    const avatarPopup = new Popup({
      title: 'Загрузите файл',
      content: new FormAvatar({
        events: {
          submit(event) {
            event.preventDefault();
            const form = new FormData(this.getContent());
            UserController.updateAvatar(form);
            AuthController.getUser();
            this.hide();
          },
        },
      }),
    });

    const formContentProps = [
      {
        component: FieldsetInput,
        props: {
          formFieldClassName: 'profile__form-field',
          labelClassName: 'profile__form-label',
          text: 'Почта',
          validationType: 'email',
          inputProps: {
            placeholder: 'Почта',
            className: 'profile__input',
            name: 'email',
            value: this.props.currentUser?.email,
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
          text: 'Имя',
          validationType: 'first_name',
          inputProps: {
            placeholder: 'Имя',
            className: 'profile__input',
            name: 'first_name',
            value: this.props.currentUser?.first_name,
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
          text: 'Фамилия',
          validationType: 'second_name',
          inputProps: {
            placeholder: 'Фамилия',
            className: 'profile__input',
            name: 'second_name',
            value: this.props.currentUser?.second_name,
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
          text: 'Имя в чате',
          inputProps: {
            placeholder: 'Имя в чате',
            className: 'profile__input',
            name: 'display_name',
            value: this.props.currentUser?.display_name,
          },
        },
      },
      {
        component: FieldsetInput,
        props: {
          formFieldClassName: 'profile__form-field',
          labelClassName: 'profile__form-label',
          text: 'Логин',
          validationType: 'login',
          inputProps: {
            placeholder: 'Логин',
            className: 'profile__input',
            name: 'login',
            value: this.props.currentUser?.login,
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
          text: 'Телефон',
          validationType: 'phone',
          inputProps: {
            placeholder: 'Телефон',
            className: 'profile__input',
            name: 'phone',
            value: this.props.currentUser?.phone,
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
    /*    const propsFieldsetInputs: [{
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
          placeholder: store.state.currentUser?.email,
          value: store.state.currentUser?.email,
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
          placeholder: store.state.currentUser?.login,
          value: store.state.currentUser?.login,
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
          placeholder: store.state.currentUser?.first_name,
          value: store.state.currentUser?.first_name,
          name: 'first_name',
        },
      },
      {
        formFieldClassName: 'profile__form-field',
        labelClassName: 'profile__form-label',
        text: 'Фамилия',
        inputProps: {
          className: 'profile__input',
          placeholder: store.state.currentUser?.second_name,
          value: store.state.currentUser?.second_name,
          name: 'second_name',
        },
      },
      {
        formFieldClassName: 'profile__form-field',
        labelClassName: 'profile__form-label',
        text: 'Имя в чате',
        inputProps: {
          className: 'profile__input',
          placeholder: store.state.currentUser?.display_name,
          value: store.state.currentUser?.display_name,
          name: 'display_name',
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
          placeholder: store.state.currentUser?.phone,
          value: store.state.currentUser?.phone,
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
    ]; */
    this.children.backPage = new BackPage({ href: '/settings' });
    this.children.btnAvatar = new Button({
      textBtn: 'Поменять аватар',
      className: 'button-avatar',
      events: {
        click: () => {
          this.children.avatarPopup.show();
        },
      },

    });
    this.children.avatarPopup = avatarPopup;
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
            UserController.updateUser(JSON.stringify(this.getFormData()));
          }
        },
      },
      contentProps: formContentProps,
    });
    /*    this.children.form = new Form({
      httpOptions: {
        url: 'profile_edit',
        method: 'put',
      },
      events: {
        submit(event) {
          event.preventDefault();
          const { fieldsetInputs } = this.children;
          fieldsetInputs.forEach((fieldset) => {
            const inputData = fieldset.children.input.getContent().value;
            fieldset.children.input.eventBus().emit('validate', inputData);
          });
          const isValidForm = fieldsetInputs.every((fieldset) => fieldset.props.isValid);

          if (isValidForm) {
            UserController.updateUser(JSON.stringify(this.getFormData()));
          }
        },
      },
      formClassName: 'profile__form',
      propsFieldsetInputs,
      textBtn: 'Сохранить',
    }); */
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/settings',
    });
  }
}
export default ProfileEditPage;

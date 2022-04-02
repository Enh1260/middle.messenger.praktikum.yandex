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
  constructor(props) {
    super(props);
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
  }

  render() {
    return this.compile(template, {
      userName: 'Иван Иванов',
      linkBack: '/settings',
    });
  }
}
export default ProfileEditPage;

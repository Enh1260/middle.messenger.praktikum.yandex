import Block, { TComponentProps } from '../../../../utils/block';
import template from './profile-edit.pug';
import Form from '../../../../components/elements/form/index';
import FieldsetInput from '../../../../components/elements/fieldsetInput/index';
import UserController from '../../../../controllers/User.controller';
import Button from '../../../../components/elements/button/index';
import FormAvatar from '../../../../components/elements/formAvatar/index';
import Popup from '../../../../components/elements/popup/index';
import AuthController from '../../../../controllers/Auth.controller';
import BackPage from '../../../../components/elements/backPage/index';

class ProfileEditPage extends Block {
  constructor(props: TComponentProps) {
    super(props);
    AuthController.getUser();
  }

  initChildren() {
    const avatarPopup = new Popup({
      title: 'Загрузите файл',
      content: new FormAvatar({
        events: {
          submit(event: any) {
            event.preventDefault();
            const form = new FormData(this.getContent());
            UserController.updateAvatar(form);
            AuthController.getUser();
            this.eventBus.emit('hidePopup');
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
          text: 'Имя',
          validationType: 'first_name',
          inputProps: {
            placeholder: 'Имя',
            className: 'profile__input',
            name: 'first_name',
            value: this.props.currentUser?.first_name,
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
          text: 'Фамилия',
          validationType: 'second_name',
          inputProps: {
            placeholder: 'Фамилия',
            className: 'profile__input',
            name: 'second_name',
            value: this.props.currentUser?.second_name,
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
          text: 'Телефон',
          validationType: 'phone',
          inputProps: {
            placeholder: 'Телефон',
            className: 'profile__input',
            name: 'phone',
            value: this.props.currentUser?.phone,
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

    this.children.backPage = new BackPage({ href: '/settings' });
    this.children.btnAvatar = new Button({
      textBtn: 'Поменять аватар',
      className: 'button-avatar',
      events: {
        click: () => {
          (this.children.avatarPopup as Block).show();
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
        submit(event: any) {
          event.preventDefault();
          const fieldsetInputs = this.children.content;
          const resultValidation: boolean[] = [];
          fieldsetInputs.forEach((fieldset: FieldsetInput) => {
            const inputEl = ((fieldset.children.input as Block).getContent() as HTMLInputElement);
            const inputData = inputEl.value;
            (fieldset.children.input as Block).eventBus.emit('validate', inputData);
            const errorSpan = this.getContent().querySelector('span').textContent;
            resultValidation.push(!errorSpan);
          });
          const isValidForm = resultValidation.every((value) => value);

          if (isValidForm) {
            UserController.updateUser(this.getFormData());
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

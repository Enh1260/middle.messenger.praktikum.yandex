type ValidatorResult = {
  isValid: boolean;
  errorMessage: string;
}

class Validator {
  login(data): ValidatorResult {
    return {
      isValid: new RegExp(/[\SA-Za-z0-9]{3,20}/g).test(data) as boolean,
      errorMessage: 'Введите логин от 3-х символов без пробела',
    };
  }

  password(data): ValidatorResult {
    return {
      isValid: new RegExp(/(?=.*([0-9])|(?=.*[A-ZА-Я])).{8,40}/g).test(data),
      errorMessage: 'Пароль должен быть от 8 до 40 символов и содержать заглавную букву или цифру',
    };
  }

  firstName(data): ValidatorResult {
    return {
      isValid: new RegExp(/^([A-ZА-Я])[A-ZА-Яа-яa-z\S\D]+/g).test(data) as boolean,
      errorMessage: 'Имя должно начинаться с заглавной буквы без цифр и пробела',
    };
  }

  secondNname(data): ValidatorResult {
    return {
      isValid: new RegExp(/^([A-ZА-Я])[A-ZА-Яа-яa-z\S\D]+/g).test(data) as boolean,
      errorMessage: 'Фамилия должна начинаться с заглавной буквы без цифр и пробела',
    };
  }

  email(data): ValidatorResult {
    return {
      isValid: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi)
        .test(data) as boolean,
      errorMessage: 'Неверный формат почты',
    };
  }

  phone(data): ValidatorResult {
    return {
      isValid: new RegExp(/^([0-9+])[0-9]{10,15}/g).test(data) as boolean,
      errorMessage: 'Неверный формат телефона',
    };
  }

  validate(type: string, data): ValidatorResult {
    switch (type) {
      case ('login'):
        return this.login(data);
      case ('password'):
        return this.password(data);
      case ('email'):
        return this.email(data);
      case ('first_name'):
        return this.firstName(data);
      case ('second_name'):
        return this.secondNname(data);
      case ('phone'):
        return this.phone(data);
      default:
        return {
          isValid: !!data.length,
          errorMessage: '',
        };
    }
  }
}

export default new Validator();

import React from 'react';
import FormElement from '../common/FormElement';
import Modal from '../common/Modal/Modal';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      email: '',
      password: '',
      repeatPassword: '',
      formErrorLogin: '',
      formErrorEmail: '',
      formErrorPassword: '',
      formErrorRepeatPassword: '',
      isLoginValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      isRepeatPasswordMatch: false,
      isFormValid: false,
      isModalOpenSuccess: false,
      isModalOpenError: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  errorClass = error => {
    return (error === ('') ? '' : error === ('valid') ? 'input_done' : 'input_error');
  };

  validateLogin = async () => {
    const {login} = this.state;

    if (login.length >= 2) {
      await this.setState({isLoginValid: true});
      this.setState({formErrorLogin: 'valid'});
    } else {
      await this.setState({isLoginValid: false});
      this.setState({formErrorLogin: 'invalid'});
    }
  };

  validateEmail = async () => {
    const {email} = this.state;

    if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      await this.setState({isEmailValid: true});
      this.setState({formErrorEmail: 'valid'});
    } else {
      await this.setState({isEmailValid: false});
      this.setState({formErrorEmail: 'invalid'});
    }
  };

  validatePassword = async () => {
    const {password} = this.state;

    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g)) {
      await this.setState({isPasswordValid: true});
      this.setState({formErrorPassword: 'valid'});
    } else {
      await this.setState({isPasswordValid: false});
      this.setState({formErrorPassword: 'invalid'});
    }
  };

  validateRepeatPassword = async () => {
    const {repeatPassword, password} = this.state;

    if (repeatPassword === password && repeatPassword !== '') {
      await this.setState({isRepeatPasswordValid: true});
      this.setState({formErrorRepeatPassword: 'valid'});
    } else {
      await this.setState({isRepeatPasswordValid: false});
      this.setState({formErrorRepeatPassword: 'invalid'});
    }
  };

  validateForm = async () => {
    const {isLoginValid, isEmailValid, isPasswordValid, isRepeatPasswordMatch} = this.state;

    if (isLoginValid && isEmailValid && isPasswordValid && isRepeatPasswordMatch) {
      await this.setState({isFormValid: true});
    } else {
      await this.setState({isFormValid: false});
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const {login, email, password, isFormValid} = this.state;

    this.validateForm();

    let formData = new FormData();
    formData.append('login', login);
    formData.append('email', email);
    formData.append('password', password);

    if (isFormValid) {
      fetch('/mail3.php', {
        method: 'POST',
        body: formData
      })
        .then(() => {
          this.setState({isModalOpenSuccess: true})
        })
        .catch(response => {
          this.setState({isModalOpenError: true})
        })
    } else {
      let inputValidateClass = document.querySelectorAll('.js_validateClass');

      for (let i = 0; i < inputValidateClass.length; i++) {
        console.log(inputValidateClass[i]);
        console.log(!inputValidateClass[i].classList.contains('valid'));
        if (!inputValidateClass[i].classList.contains('input_done')) {
          inputValidateClass[i].classList.add('input_error');
        }
      }
    }
  };

  modalCloseHandlerSuccess = () => {
    this.setState({isModalOpenSuccess: false});
  };

  modalCloseHandlerError = () => {
    this.setState({isModalOpenError: false});
  };

  render() {
    const {isModalOpenSuccess, isModalOpenError} = this.state;
    let modal;

    if (isModalOpenSuccess) {
      modal = <Modal modalText="Вы успешно зарегистрированы." clickHandler={this.modalCloseHandlerSuccess} />;
    }

    if (isModalOpenError) {
      modal = <Modal modalText="Что-то пошло не так... попробуйте позже." clickHandler={this.modalCloseHandlerError} />;
    }

    return (
      <main className="main">
        <form className="form" onSubmit={this.handleSubmit}>
          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Логин"
            inputType="text"
            inputID="inputLogin"
            inputName="login"
            inputPlaceholder="Введите логин*"
            inputChange={this._onChange}
            inputValidate={this.validateLogin}
            inputError={this.errorClass(this.state.formErrorLogin)}
          />

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Email"
            inputType="email"
            inputID="inputEmail"
            inputName="email"
            inputPlaceholder="Введите email *"
            inputChange={this._onChange}
            inputValidate={this.validateEmail}
            inputError={this.errorClass(this.state.formErrorEmail)}
          />

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Пароль"
            inputType="password"
            inputID="inputPassword"
            inputName="password"
            inputPlaceholder="Введите пароль*"
            inputChange={this._onChange}
            inputValidate={this.validatePassword}
            inputError={this.errorClass(this.state.formErrorPassword)}
          />

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Повторите пароль"
            inputType="password"
            inputID="inputRepeatPassword"
            inputName="repeatPassword"
            inputPlaceholder="Повторите пароль*"
            inputChange={this._onChange}
            inputValidate={this.validateRepeatPassword}
            inputError={this.errorClass(this.state.formErrorRepeatPassword)}
          />

          <FormElement
            inputType="submit"
            inputID="submit"
            inputName="submit"
            inputValue="Зарегистрироваться"
          />
        </form>
        {modal}
      </main>
    );
  }
};
import React from 'react';
import FormElement from '../common/FormElement';

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

    this.validateForm;

    let formData = new FormData();
    formData.append('login', login);
    formData.append('email', email);
    formData.append('password', password);

    if (isFormValid) {
      fetch('/mail2.php', {
        method: 'POST',
        body: formData
      })
      .then(() => alert('Ваше письмо отправлено. В ближайшее время с вами свяжется наш менеджер.'))
      .catch(response => console.log(response))
    } else {
      alert('Заполните все поля.')
    }

  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <FormElement
          labelText="Login"
          inputType="text"
          inputID="inputLogin"
          inputName="login"
          inputPlaceholder="Enter login *"
          inputChange={this._onChange}
          inputValidate={this.validateLogin}
          inputError={this.errorClass(this.state.formErrorLogin)}
        />

        <FormElement
          labelText="Email"
          inputType="email"
          inputID="inputEmail"
          inputName="email"
          inputPlaceholder="Enter email *"
          inputChange={this._onChange}
          inputValidate={this.validateEmail}
          inputError={this.errorClass(this.state.formErrorEmail)}
        />

        <FormElement
          labelText="Password"
          inputType="password"
          inputID="inputPassword"
          inputName="password"
          inputPlaceholder="Enter password *"
          inputChange={this._onChange}
          inputValidate={this.validatePassword}
          inputError={this.errorClass(this.state.formErrorPassword)}
        />

        <FormElement
          labelText="Repeat Password"
          inputType="password"
          inputID="inputRepeatPassword"
          inputName="repeatPassword"
          inputPlaceholder="Repeat password here *"
          inputChange={this._onChange}
          inputValidate={this.validateRepeatPassword}
          inputError={this.errorClass(this.state.formErrorRepeatPassword)}
        />

        <FormElement
          inputType="submit"
          inputID="submit"
          inputName="submit"
          inputValue="Send"
        />
      </form>
    );
  }
}
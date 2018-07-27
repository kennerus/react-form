import React from 'react';
import MaskedInput from 'react-maskedinput';
import DatePicker from 'react-datepicker';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import FormElement from '../common/FormElement';import Modal from '../common/Modal/Modal';

export default class AboutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      email: '',
      experience: '',
      birthDate: '',
      city: '',
      social: '',
      maritalStatus: '',
      education: '',
      hobbies: '',
      skills: '',
      wage: '',
      schedule: '',
      comments: '',
      formErrorName: '',
      formErrorPhone: '',
      formErrorEmail: '',
      formErrorExperience: '',
      isNameValid: false,
      isPhoneValid: false,
      isEmailValid: false,
      isExperienceValid: false,
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

  validateName = async () => {
    const {name} = this.state;

    if (name.length >= 5) {
      await this.setState({isNameValid: true});
      this.setState({formErrorName: 'valid'});
    } else {
      await this.setState({isNameValid: false});
      this.setState({formErrorName: 'invalid'});
    }
  };

  validatePhone = async () => {
    const {phone} = this.state;

    if (phone.match(/^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+38\(0[0-9]{2}\)[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$/)) {
      await this.setState({isPhoneValid: true});
      this.setState({formErrorPhone: 'valid'});
    } else {
      await this.setState({isPhoneValid: false});
      this.setState({formErrorPhone: 'invalid'});
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

  validateExperience = async () => {
    const {experience} = this.state;

    if (experience.length >= 5) {
      await this.setState({isExperienceValid: true});
      this.setState({formErrorExperience: 'valid'});
    } else {
      await this.setState({isExperienceValid: false});
      this.setState({formErrorExperience: 'invalid'});
    }
  };

  validateForm = async () => {
    const {isNameValid, isPhoneValid, isEmailValid, isExperienceValid} = this.state;

    if (isNameValid && isPhoneValid && isEmailValid && isExperienceValid) {
      await this.setState({isFormValid: true});
    } else {
      await this.setState({isFormValid: false});
    }
  };

  handleChangeDate = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const {name, phone, email, experience, isFormValid} = this.state;

    this.validateForm();

    let formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('experience', experience);

    if (isFormValid) {
      fetch('/mail2.php', {
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
            labelText="Ф.И.О."
            inputType="text"
            inputID="inputName"
            inputName="name"
            inputPlaceholder="Введите ваше Ф.И.О.*"
            inputChange={this._onChange}
            inputValidate={this.validateName}
            inputError={this.errorClass(this.state.formErrorName)}
          />


          <div className="form__element">
            <label className="label" htmlFor="inputPhone">Введите ваш телефон</label>

            <MaskedInput
              className={`input ${this.errorClass(this.state.formErrorPhone)} js_validateClass`}
              id="inputPhone"
              mask="+38(011)111-11-11"
              name="phone"
              value={this.state.phone}
              onChange={this._onChange}
              onBlur={this.validatePhone}
            />
          </div>

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Email"
            inputType="email"
            inputID="inputEmail"
            inputName="email"
            inputPlaceholder="Введите ваш email*"
            inputChange={this._onChange}
            inputValidate={this.validateEmail}
            inputError={this.errorClass(this.state.formErrorEmail)}
          />

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Опыт работы"
            inputType="text"
            inputID="inputExperience"
            inputName="experience"
            inputPlaceholder="Опыт работы*"
            inputChange={this._onChange}
            inputValidate={this.validateExperience}
            inputError={this.errorClass(this.state.formErrorExperience)}
          />

          <div className="form__element">
            <label className="label" htmlFor="inputBirthDate">Введите дату рождения</label>

            <DatePicker
              popperPlacement="top-start"
              id="inputBirthDate"
              className="input"
              onChange={this.handleChangeDate}
              locale="ru"
              placeholderText="Выберите дату рождения"
            />
          </div>

          <FormElement
            labelText="Город проживания"
            inputType="text"
            inputID="inputCity"
            inputName="city"
            inputPlaceholder="Введите город проживания"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Аккаунты в соц. сетях"
            inputType="text"
            inputID="inputSocial"
            inputName="social"
            inputPlaceholder="Ваши аккаунты в соц. сетях"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Семейное положение"
            inputType="text"
            inputID="inputMaritalStatus"
            inputName="maritalStatus"
            inputPlaceholder="Семейное положение"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Образование"
            inputType="text"
            inputID="inputEducation"
            inputName="education"
            inputPlaceholder="Образование"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Хобби"
            inputType="text"
            inputID="inputHobbies"
            inputName="hobbies"
            inputPlaceholder="Хобби"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Ваши навыки"
            inputType="text"
            inputID="inputSkills"
            inputName="skills"
            inputPlaceholder="Ваши навыки"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Желаемый уровень заработной платы"
            inputType="text"
            inputID="inputWage"
            inputName="wage"
            inputPlaceholder="Желаемый уровень заработной платы"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Желаемый режим работы"
            inputType="text"
            inputID="inputSchedule"
            inputName="schedule"
            inputPlaceholder="Желаемый режим работы"
            inputChange={this._onChange}
          />

          <FormElement
            labelText="Желаемый уровень заработной платы"
            inputType="text"
            inputID="inputWage"
            inputName="wage"
            inputPlaceholder="Желаемый уровень заработной платы"
            inputChange={this._onChange}
          />

          <div className="form__element">
            <label className="label" htmlFor="inputBirthDate">Дополнительная информация</label>

            <textarea
              className="input"
              id="textareaComments"
              name="comments"
            />
          </div>

          <FormElement
            inputType="submit"
            inputID="submit"
            inputName="submit"
            inputValue="Отправить анкету"
          />
        </form>
      </main>
    );
  }
};
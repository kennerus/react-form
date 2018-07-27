import React from 'react';
import MaskedInput from 'react-maskedinput';
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
      scope: '',
      age: '',
      sex: '',
      experience: '',
      city: '',
      social: '',
      education: '',
      skills: '',
      wage: '',
      schedule: '',
      hobbies: '',
      comments: '',
      formErrorName: '',
      formErrorEmail: '',
      formErrorExperience: '',
      isNameValid: false,
      isEmailValid: false,
      isExperienceValid: false,
      isFormValid: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSelectScope = (e) => {
    this.setState({scope: e.target.value});
  };

  handleSelectSex = (e) => {
    this.setState({sex: e.target.value});
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
    const {isNameValid, isEmailValid, isExperienceValid} = this.state;

    if (isNameValid && isEmailValid && isExperienceValid) {
      await this.setState({isFormValid: true});
    } else {
      await this.setState({isFormValid: false});
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const {name, phone, email, experience, age, sex, city, social, education, hobbies, wage, schedule, comments, skills, scope, isFormValid} = this.state;

    this.validateForm();

    let formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('scope', scope);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('experience', experience);
    formData.append('city', city);
    formData.append('social', social);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('wage', wage);
    formData.append('schedule', schedule);
    formData.append('hobbies', hobbies);
    formData.append('comments', comments);


    if (isFormValid) {
      fetch('/request/default/save-f', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          this.setState({isModalOpenSuccess: true});
        })
        .catch(response => {
          this.setState({isModalOpenError: true});
        })
    } else {
      console.log('not valid');
      let inputValidateClass = document.querySelectorAll('.js_validateClass');

      for (let i = 0; i < inputValidateClass.length; i++) {
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
            labelText="Ф.И.О.*"
            inputType="text"
            inputID="inputName"
            inputName="name"
            inputPlaceholder="Введите ваше Ф.И.О."
            inputChange={this._onChange}
            inputValidate={this.validateName}
            inputError={this.errorClass(this.state.formErrorName)}
          />

          <div className="form__element">
            <label className="label" htmlFor="inputPhone">Введите ваш телефон</label>

            <MaskedInput
              className={`input`}
              id="inputPhone"
              mask="+38(011)111-11-11"
              name="phone"
              value={this.state.phone}
              onChange={this._onChange}
            />
          </div>

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Email*"
            inputType="email"
            inputID="inputEmail"
            inputName="email"
            inputPlaceholder="Email"
            inputChange={this._onChange}
            inputValidate={this.validateEmail}
            inputError={this.errorClass(this.state.formErrorEmail)}
          />

          <div className="form__element">
            <label className="label" htmlFor="inputScope">Сфера деятельности*</label>

            <select className="input" id="inputScope" name="scope" onClick={this.handleSelectScope}>
              <option>Backend</option>
              <option>Frontend</option>
              <option>Web-дизайнер </option>
              <option>Тестировщик</option>
              <option>SMM-менеджер</option>
              <option>SEO-специалист</option>
              <option>Интернет-маркетолог </option>
              <option>Менеджер по продажам IТ-услуг</option>
              <option>PR-менеджер</option>
            </select>
          </div>

          <FormElement
            labelText="Ваш возраст"
            inputType="text"
            inputID="inputAge"
            inputName="age"
            inputPlaceholder="Введите ваш возраст"
            inputChange={this._onChange}
          />

          <div className="form__element">
            <label className="label" htmlFor="inputSex">Ваш пол</label>

            <select className="input" id="inputSex" name="sex" onClick={this.handleSelectSex}>
              <option>Мужской</option>
              <option>Женский</option>
            </select>
          </div>

          <FormElement
            inputValidateClass="js_validateClass"
            labelText="Опыт работы*"
            inputType="text"
            inputID="inputExperience"
            inputName="experience"
            inputPlaceholder="Опыт работы"
            inputChange={this._onChange}
            inputValidate={this.validateExperience}
            inputError={this.errorClass(this.state.formErrorExperience)}
          />

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
            labelText="Образование"
            inputType="text"
            inputID="inputEducation"
            inputName="education"
            inputPlaceholder="Образование"
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
            labelText="Хобби"
            inputType="text"
            inputID="inputHobbies"
            inputName="hobbies"
            inputPlaceholder="Хобби"
            inputChange={this._onChange}
          />

          <div className="form__element">
            <label className="label" htmlFor="textareaComments">Дополнительная информация</label>

            <textarea
              className="input input_textarea"
              id="textareaComments"
              name="comments"
              onChange={this._onChange}
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
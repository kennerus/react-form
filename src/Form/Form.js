import React, {Component} from 'react';
import FormElement from './FormElement';
import Input from './Input';
import Label from './Label';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('login', login);
    formData.append('email', email);
    formData.append('password', password);

    fetch('/mail2.php', {
      method: 'POST',
      body: formData
    })
      .then(() => alert('Ваше письмо отправлено. В ближайшее время с вами свяжется наш менеджер.'))
      .catch(response => console.log(response))

  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormElement>
          <Label labelText="Login"/>

          <Input
            inputType="text"
            inputPlaceholder="Enter login here"
            inputName="login"
          />
        </FormElement>

        <FormElement>
          <Label labelText="Email"/>

          <Input
            inputType="email"
            inputPlaceholder="Enter your email here"
            inputName="email"
          />
        </FormElement>

        <FormElement>
          <Label labelText="Password"/>

          <Input
            inputType="password"
            inputPlaceholder="Enter  password here"
            inputName="password"
          />
        </FormElement>

        <FormElement>
          <Label labelText="Repeat password"/>

          <Input
            inputType="password"
            inputPlaceholder="Repeat password here"
            inputName="repeatPassword"
          />
        </FormElement>

        <FormElement>
          <Input
            inputType="submit"
            inputStyle="submit"
            inputValue="Submit"
            inputName="submit"
          />
        </FormElement>
      </Form>
    );
  }
}

export default Form;

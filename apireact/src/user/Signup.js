import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    axios
      .get('http://localhost:8080/')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:8080/signup', user)
      .then((response) => {
        console.log(response.data);
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className='main'>
        <div className='container py-5'>
          <div className='w-50 mx-auto my-5'>
            <div className='card border'>
              <div className='card-header bg-light text-muted'>
                <h2 className='mt-2'>Signup</h2>
              </div>

              <form>
                <div className='card-body'>
                  <div className='form-outline mb-4'>
                    <input
                      type='text'
                      id='name'
                      className='form-control border-bottom rounded-0'
                      onChange={this.handleChange('name')}
                      value={name}
                    />
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                  </div>
                  <div className='form-outline mb-4'>
                    <input
                      type='email'
                      id='email'
                      className='form-control border-bottom rounded-0'
                      onChange={this.handleChange('email')}
                      value={email}
                    />
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                  </div>
                  <div className='form-outline mb-4'>
                    <input
                      type='password'
                      id='password'
                      className='form-control border-bottom rounded-0'
                      onChange={this.handleChange('password')}
                      value={password}
                    />
                    <label htmlFor='pass' className='form-label'>
                      Password
                    </label>
                  </div>
                </div>
              </form>
              <div className='card-footer bg-light py-3'>
                <button
                  onClick={this.clickSubmit}
                  className='btn btn-raised btn-primary btn-lg float-right'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

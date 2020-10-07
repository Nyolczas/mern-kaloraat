import React from 'react';

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
  render() {
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
                    />
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                  </div>
                  <div className='form-outline mb-4'>
                    <input
                      type='password'
                      id='pass'
                      className='form-control border-bottom rounded-0'
                    />
                    <label htmlFor='pass' className='form-label'>
                      Password
                    </label>
                  </div>
                </div>
                <div className='card-footer bg-light pt-3'>
                  <button className='btn btn-raised btn-primary btn-lg float-right mb-3'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

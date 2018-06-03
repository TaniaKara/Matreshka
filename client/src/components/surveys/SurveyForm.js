import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom';

class UserForm extends Component {
  renderFields () {
    return (
      <div>
        <Field label= "label goes here" type='text' name='title' component={SurveyField} />
      </div>
    )
  }
  render () {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => console.log(values))}
          className='col s12'
        >
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>cancel</Link>
          <button type='submit' className='teal btn-flat right white-text'>Next
          <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate (values) {
  const errors ={};

  if (!values.title) {
    errors.title = 'You need to enter a title';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'userForm'
})(UserForm);

/* <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  placeholder='Placeholder'
                  type='text'
                  className='validate'
                  value={this.state.first_name}
                />
                <label for='first_name'>First Name</label>
              </div>
              <div className='input-field col s6'>
                <input id='last_name'
                type='text'
                className='validate'
                value={this.state.last_name}
                />
                <label for='last_name'>Last Name</label>
              </div>
            </div>
          </form>
        </div>

         <Field
            type='text'
            name='firstName'
            placeholder='First Name'
            className='validate'
            component='input'
          />
        */

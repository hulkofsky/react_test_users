import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Form, Button} from 'semantic-ui-react';

class AddUserForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        const submit = (values) => {};

        return (
            <Form onSubmit={handleSubmit(submit)}>
                <Field name='username' component='input'/>
                <Field name='password' component='input'/>    
                <Field name='email' component='input'/>
                <Field name='photo' type='file' component='input'/>
                <Button type='submit'>Add</Button>
            </Form>
        );
    };
};

AddUserForm = reduxForm({
    form: 'AddUserForm',
    onSubmit: values => console.log('sended', values),
})(AddUserForm); 

export default AddUserForm;
import React from 'react'
import AddUserForm from '../components/addUserForm'


class AddUserPage extends React.Component {
    handleSubmit = (values) => {
        return values;
    }

    render() {
        return (
            <AddUserForm onSubmit={this.handleSubmit} />
        );
    }
}


export default AddUserPage;
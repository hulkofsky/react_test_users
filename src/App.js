import React, { Component } from 'react'
//import bcrypt from 'bcrypt'
import {connect} from 'react-redux'
import { Grid, Image, List, Input, Container, Button, Modal } from 'semantic-ui-react'
import './App.css';

const doc = document;

class App extends Component {
  
  fileToBase64(file) {
    return new Promise ( (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =  () => {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
  };

  addUser(values) {
    console.log(values);
    const name = doc.querySelector('input[placeholder=Name]').value;
    
    let password = doc.querySelector('input[placeholder=Password]').value;
          //   bcrypt.genSalt(10, (err, salt) => {
          //      bcrypt.hash(password, salt, (err, hash) => {
          //         password = hash;
          //      });
          //  });
           
    const email = doc.querySelector('input[placeholder=Email]').value;
    const photo = doc.querySelector('input[type=file]');

    const emailPattern = /^\w+@\w+\.\w{2,4}$/i;
    const namePattern = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;

    const showError = (message) => {
      let errorDiv = document.createElement('div');

      if(doc.querySelector('.error')) doc.querySelector('.error').remove();
      errorDiv.classList.add('error');
      errorDiv.innerHTML = message;
      doc.querySelector('button[name=addUser]').parentElement.appendChild(errorDiv);
    };

    const file = photo.files[0];
  

    if(name.search(namePattern))  {
      showError('Invalid name!');
      return;
    };
    
    this.fileToBase64(file)
        .then(image => {
          const newUser = {
            username: name,
            password: password,
            email: email,
            photo: image
          };

          this.props.onAddUser(newUser);
        });
 
    

    if(email.search(emailPattern)) {
      showError('Invalid email!');
      return;
    };

    

    if(doc.querySelector('.error')) doc.querySelector('.error').remove();

    
  }

  deleteUser(index){
    this.props.onDeleteUser(index);
  }

  updateUser(index){
    const file = doc.querySelector('input[type=file]').files[0];

    this.fileToBase64(file)
        .then(image => {
          const payload = { index: index,
                            user: {
                                    username: doc.querySelector('input[name=name]').value,
                                    password: doc.querySelector('input[name=pass]').value,
                                    email: doc.querySelector('input[name=email]').value,
                                    photo: image
                                  }
                                }

        this.props.onUpdateUser(payload);
        })
  }

  findUser() {
    const searchCriteria = doc.querySelector('input[name=search]').value;
    this.props.onFindUser(searchCriteria);
  }

  render() {


    return (
      <Grid>
        <Grid.Row>
          <Input name='search' icon='search' iconPosition='left' placeholder='Search users...' onChange={this.findUser.bind(this)}/>
        </Grid.Row>
        <Grid.Row>
          <List celled verticalAlign='middle'>
            {this.props.users.map((user, index) => 
              <List.Item key={index}>
                <Image avatar src={user.photo}/>
                <List.Content>
                    <List.Header>{user.username}</List.Header>
                    {user.email}
                </List.Content>
                <Container className="right aligned">
                  
                  <Modal trigger={<Button size='mini' color='yellow'>Update</Button>}>
                    <Modal.Header>Update user info</Modal.Header>
                    <Modal.Content>
                      <Grid>
                        <Grid.Row>
                          <Input name='name' placeholder={user.username}/>
                        </Grid.Row>
                        <Grid.Row>
                          <Input name='pass' placeholder={user.company}/>
                        </Grid.Row>
                        <Grid.Row>
                          <Input name='email' placeholder={user.email}/>
                        </Grid.Row>
                        <Grid.Row>
                          <Input type='file'/>
                        </Grid.Row>
                        <Grid.Row>
                          <Button name='addUser' size='large' color='green' onClick={() => {this.updateUser(index)}}>Change</Button>
                        </Grid.Row>
                      </Grid>
                    </Modal.Content>
                  </Modal>   
                  <Button size='mini' color='red' onClick={() => {this.deleteUser(index)}}>Delete</Button>
                </Container>
              </List.Item>
            )}
          </List>
        </Grid.Row>
        
        <Grid.Row>
          <Modal trigger={<Button size='large' color='green'>Add</Button>}>
            <Modal.Header>Add User</Modal.Header>
            <Modal.Content>
              <Grid>
                <Grid.Row>
                  <Input placeholder='Name'/>
                </Grid.Row>
                <Grid.Row>
                  <Input placeholder='Password'/>
                </Grid.Row>
                <Grid.Row>
                  <Input placeholder='Email'/>
                </Grid.Row>
                <Grid.Row>
                  <Input type='file'/>
                </Grid.Row>
                <Grid.Row>
                  <Button name='addUser' size='large' color='green' onClick={() => {this.addUser()}}>Add</Button>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>   
        </Grid.Row>  
      </Grid>
    );
  }
}

export default connect(
  state => ({
    users: state.users
    // .filter(user =>  user.name.toLowerCase().includes(state.filterUsers.toLowerCase())),
  }),
  dispatch => ({
    onAddUser: (newUser) => {
      dispatch({type: 'ADD_USER', payload: newUser});
    },

    onDeleteUser: (index)  => {
      dispatch({type: 'DELETE_USER', payload: index});
    },

    onUpdateUser: (payload) => {
      dispatch({type: 'UPDATE_USER', payload: payload})
    },

    onFindUser: (searchCriteria) => {
      dispatch({ type: 'FIND_USER', payload: searchCriteria })
    }
  })
)(App);

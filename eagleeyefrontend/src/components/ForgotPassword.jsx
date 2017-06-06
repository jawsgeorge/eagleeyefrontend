import React from 'react';
import ReactDOM from 'react-dom';
import {connect, ReactRedux} from 'react-redux'
import {darkWhite, blue500} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import {Button} from 'react-bootstrap'
import axios from 'axios';
const styles = {
  
 floatingLabelStyle: {
    color: darkWhite,
  },
  floatingLabelFocusStyle: {
    color: darkWhite,
  },
   underlineStyle: {
    borderColor: darkWhite,
  },
};

let ForgotPassword = React.createClass({
    contextTypes : {
    router: React.PropTypes.object
  },
  getInitialState : function(){
    return(
        {
            firstName : ''
        }
    )
  },
  changeFirstName : function(e){
        this.setState({
          firstName : e.target.value
        })
      },
      changeUserPassword : function(){
        // do axios call request for change password
      },
    render : function(){
        return(
            <div className="regDiv">
                <TextField
      hintText="Please enter your first Name here"
      floatingLabelText="First Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value = {this.state.firstName}
      onChange={this.changeFirstName}
    /><br />
    <Button className='forgotPasswordButton' onClick={this.changeUserPassword}>Change Password</Button>
            </div>
        )
    }
})

export default ForgotPassword;
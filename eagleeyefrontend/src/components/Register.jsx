import React from 'react';
import ReactDOM from 'react-dom';
import {connect, ReactRedux} from 'react-redux'
import {darkWhite, blue500} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import {Button} from 'react-bootstrap'
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



let Register = React.createClass({

contextTypes : {
    router: React.PropTypes.object
  },
  adduser : function(){
      this.context.router.push('/register');
  },


    
    render : function(){
        return(
            <div className="regDiv">
    <div className="regFields">
    <TextField
      hintText="Please enter your first Name here"
      floatingLabelText="First Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    /><br />
     <TextField
      hintText="Please enter your first Name here"
      floatingLabelText="Last Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    /><br />
     <TextField
      hintText="Please enter your first Name here"
      floatingLabelText="Mobile No"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    /><br />
     <TextField
       hintText="Please enter your first Name here"
      floatingLabelText="Email Id"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    /><br />
    <Button className='regbtn' onClick={this.adduser}>ADD</Button>
    </div>            
            </div>
        )
    }
})

function mapMeetingtoProps(store) {
      return {

            };
}
// export default connect(mapMeetingtoProps)(Register);
export default Register;

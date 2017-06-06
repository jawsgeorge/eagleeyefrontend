import React from 'react';
import ReactDOM from 'react-dom';
import {connect, ReactRedux} from 'react-redux'
import {darkWhite, blue500} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import {Button,select} from 'react-bootstrap'
import axios from 'axios';
import GenericHeader from './GenericHeader.jsx';
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
    getInitialState : function(){
        return({
        firstName : '',
        lastName : '',
        mobileNo : '',
        emailId : ''  ,
        selectedDropDown : 'default',
        presentRoles : []
        })
      },
      componentDidMount : function(){
        let _this = this;
        axios.get("http://localhost:8080/rest/eagleeye/getRoles").then(function(response){
          console.log("Role array whihc is omin is",JSON.stringify(response.data));
          let roleArr  = response.data;
          _this.setState({
            presentRoles : roleArr
          })
        }).catch(function(err){
          _this.setState({
            presentRoles : []
          })
        });
      },
      changeFirstName : function(e){
        this.setState({
          firstName : e.target.value
        })
      },
      changeLastName : function(e){
        this.setState({
          lastName : e.target.value
        })
      },
      changeMobileNo :  function(e){
        this.setState({
          mobileNo : e.target.value
        })
      },
      changeEmailId : function(e){
        this.setState({
          emailId : e.target.value
        })
      },
      myDropDownEditSelect : function(){
        let selectedValue = this.refs.listOfRolesForAddUser.value;
        this.setState({
          selectedDropDown : selectedValue
        })
      },
      adduser : function(){
        let _this = this;
        let givenEmailId = this.state.emailId;
        let atpos = givenEmailId.indexOf("@");
        let dotpos = givenEmailId.lastIndexOf(".");
        if(atpos < 1 || dotpos<atpos+2 || dotpos+2 >=givenEmailId.length || this.state.firstName.length <= 0 || this.state.selectedDropDown == 'default'){
          alert("Kindly enter a valid email address , First Name , role");
        }
        else{
          let roleInfo = {
          "role_id" : this.state.selectedDropDown
        }

        let reqdObj = {
          userName : this.state.firstName,
          email : this.state.emailId,
          role : roleInfo
        };
        console.log("Required obj ",reqdObj);
        axios.post("http://localhost:8080/rest/eagleeye/adduser",reqdObj).then(function(response){
          console.log("Received response is ",response);
          _this.context.router.push('/userList');
        }).catch(function(error){
          console.log("Error happening");
          _this.context.router.push('/userList');
        })
        }
        
        // need to check for mandatory fields 

          // this.context.router.push('/register');
      },
    render : function(){
      console.log("The coming roles are ",this.state.presentRoles);
      let items = [];
      for(let k=0;k<this.state.presentRoles.length;k++){
        items.push(<option className="myCustomOption" value={this.state.presentRoles[k].role_id}>{this.state.presentRoles[k].roleName}</option>);
      }
        return(
            <div className="regDiv">
             <GenericHeader buttonText="" headerText="Register Page" goToUrl="" backUrl="userList" />
    <div className="regFields">
    <TextField
      hintText="Please enter your first Name here"
      floatingLabelText="First Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value = {this.state.firstName}
      onChange={this.changeFirstName}
    /><br />
     <TextField
       hintText="Please enter your first Name here"
      floatingLabelText="Email Id"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value={this.state.emailId}
      onChange={this.changeEmailId}
    /><br />
    <select ref="listOfRolesForAddUser" value={this.state.selectedDropDown} className="roleListDropDown"onChange={this.myDropDownEditSelect}>
                          <option className="myCustomOption" value="default">Select Role</option>
                          {items}
    </select>  
    <Button className='regbtn myUSerAddButton' onClick={this.adduser}>ADD</Button>
    </div>            
            </div>
        )
    }
})

// export default connect(mapMeetingtoProps)(Register);
export default Register;
/*<TextField
      hintText="Please enter your first Name here"
      floatingLabelText="Mobile No"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value ={this.state.mobileNo}
      onChange={this.changeMobileNo}
    /><br />*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, Col, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
import {Grid,Row,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import axios from 'axios';
let Login = React.createClass({
    
    getInitialState: function() {
    return {
          userName:'',
          password:'',

   }
  },
    contextTypes : {
    router: React.PropTypes.object,
    loginURL : React.PropTypes.string,
    getAllRoles : React.PropTypes.string
  },
  componentWillMount() {
     
  },
  
  changeName : function(e){
        this.setState({
          userName : e.target.value
        });
  },
   changePwd : function(e){
        this.setState({
          password : e.target.value
        });
  },
    validateUser : function() {
      let name = this.state.userName;
      let pwd = this.state.password;
      let that = this;
      if(name == null || name == "null" || name == undefined || name.trim()  == "" ){
        alert("Please enter the username");
      }
      else if(pwd == null || pwd == "null" || pwd == undefined || pwd.trim()  == "" ){
        alert("Please enter the password");
      }
      else{
        // code needs to added for server authentication
        let myObj = {
          userName : name,
          password : pwd
        }
        console.log("THe url which is coming here ", this.context)
        this.context.router.push('/homePage');
          axios.post(this.context.loginURL,myObj).then(function(response){
            // push to next page
            console.log("The response received is ",response);
            let receivedResponse = response.data.responseCode;
            console.log("THe received response is ",receivedResponse);
            if(receivedResponse == "200"){
              // console.log("THis is coming here")
              that.context.router.push({
                pathname : '/homePage',
                state : {
                  MenuArr : response.data.object
                }
              })
              // this.context.router.push('/homePage');
            }
            else{
              alert("Please try with valid credentials");
              that.setState({
                userName:'',
                password:'',
      
              })
            }
          }).catch(function(error){
            // show error details 
          });
          // this.context.router.push('/homePage');
      }
    },
    redirectToChangePassword : function(e){
      e.preventDefault();
      // console.log("Its reaching here");
      this.context.router.push('/forgotPasssword');  
    },
    
    render : function(){
        return(
            <div id="loginPage">
              <div id="content">
                <Grid fluid={true}>
                  <img  className="loginLogo" src='Assets/SB-LOGO.png'/>
                     <Row className="show-grid  textAlignCenter topMarginDecider">
                             <Col md ={4} sm={4} xs={4}></Col>
                             <Col md={3} xs={4} sm={3}>
                             <label className="loginDetailsColor labelLoginDetailsAlign ">User Login</label>
                             </Col>
                       </Row>
                <Row className="show-grid  textAlignCenter">
                       <Col md ={4} sm={4} xs={4}></Col>
                       <Col className="textAlignCenterWidth loginTextAlign" md={4} xs={4} sm={3}><label className="loginDetailsColor ">User Name</label>   </Col>
                     <Col md={2} xs={4} sm={3} className="loginFieldsPositioning">
                       <input  type="text" value={this.state.userName} onChange={this.changeName} className="form-control inputFieldClass borderLoginFields loginWidth loginFieldBackColor" ref="userName"  placeholder="" autoFocus>
                       </input>
                       </Col>
                 </Row>
                 <Row className="show-grid alignLoginFields textAlignCenter">
                         <Col md ={4} sm={4} xs={4}></Col>
                         <Col className="textAlignCenterWidth loginTextAlign" md={4} xs={4} sm={3}><label className="loginDetailsColor passPosition">Password</label></Col>
                         <Col md={2} xs={4} sm={3} className="loginFieldsPositioning">
                         <input  type="password" value={this.state.password} onChange={this.changePwd} className=" form-control inputFieldClass borderLoginFields loginWidth loginFieldBackColor" ref="pwd" placeholder="">
                        </input>
                         </Col>
                   </Row>
                   <Row className="show-grid alignLoginFields">
                           <Col className="textAlignCenterWidthBtn " md ={6} xs={4} sm={4}> </Col>
                           <Col md={2} sm={3} xs={4} className="buttonAlignWithFields">
                           <Button bsStyle="form-control submitButtonStyling borderLoginFields btnLoginColor loginWidth" className="" block onClick={this.validateUser}>Submit</Button>
                           </Col>
                     </Row>
                     <Row className="show-grid alignLoginFields textAlignCenter">
                             <Col md ={5} sm={5} xs={5}></Col>
                             <Col md={1} className="loginFieldsPositioning zeroPadding">
                               <a href="" className="loginDetailsColor " onClick={this.redirectToChangePassword}>Forgot Password</a>
                             </Col>
                       </Row>
                 </Grid>
                </div>
            </div>
        )
    }
})

export default Login;

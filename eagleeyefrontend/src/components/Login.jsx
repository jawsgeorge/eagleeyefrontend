import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, Col, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
import {Grid,Row,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';

var arr  = [ {
   
   'fname' : "Barath",
   'lname' : "Ravi",
   'mobno' : "9994477309",
   'loc' : "Banglore",
},{
    'fname' : "Vignesh",
   'lname' : "Thiraviam",
   'mobno' : "999776690",
   'loc' : "Chennai",
},{
  'fname' : "MS",
   'lname' : "Dhoni",
   'mobno' : "999776690",
   'loc' : "Chennai",
}]

let Login = React.createClass({
    
    getInitialState: function() {
    return {
          userName:'',
          password:'',

   }
  },
    contextTypes : {
    router: React.PropTypes.object
  },
  
  componentWillMount() {
     localStorage.setItem("lisData",JSON.stringify(arr)) 
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
      if(name == null || name == "null" || name == undefined || name.trim()  == "" ){
        alert("Please enter the username");
      }
      else if(pwd == null || pwd == "null" || pwd == undefined || pwd.trim()  == "" ){
        alert("Please enter the password");
      }
      else{
        //code needs to added for server authentication
          this.context.router.push('/homePage');
      }
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
                               <a href="" className="loginDetailsColor ">Forgot Password</a>
                             </Col>
                       </Row>
                 </Grid>
                </div>
            </div>
        )
    }
})

export default Login;

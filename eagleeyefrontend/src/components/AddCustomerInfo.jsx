import React from 'react';
import ReactDOM from 'react-dom';
import {connect, ReactRedux} from 'react-redux'
import {darkWhite, blue500} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import {Button} from 'react-bootstrap';
import {Form, FormGroup, FormControl, Col, ControlLabel,InputGroup,Glyphicon} from 'react-bootstrap';
import {Grid,Row,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';


const styles = {
  
  floatingLabelStyle: {
    color: darkWhite,
    // width : 200px
  },
  floatingLabelFocusStyle: {
    color: darkWhite,
    // width:75%
  },
   underlineStyle: {
    borderColor: darkWhite,
     
  },
   
};

let AddCustomerInfo = React.createClass({
  getInitialState : function(){
    return({
      mainName : '',
      mainMobileNo : '',
      mainAddress :'',
      mainAmount : '',
     
    })
  },
  saveMainPartyInfo : function(){
    console.log("THe main person name is ", this.state.mainName);
    let finalObj = {
      customerName : this.state.mainName,
      mobileNumber : this.state.mainMobileNo,
      Address : this.state.mainAddress,
      amount : this.state.amount
    }
    console.log("FInal object is ", finalObj);
  },
  changeMainName : function(e){
    this.setState({
      mainName : e.target.value
    })
  },
  changeMainMobileNo:function(e){
    this.setState({
      mainMobileNo : e.target.value
    })
  },
  changeMainAddress : function(e){
    this.setState({
      mainAddress : e.target.value
    })
  },
  changeMainAmount : function(e){
    this.setState({
      mainAmount : e.target.value
    })
  },
render : function(){
    return(
        <div className="regDiv2">
    <div className="regFields2">
    <div className="customerBookingHeader">
    Customer Details
    </div>
    <div>
    <Row>
    <Col  md={6} >
    <TextField
      hintText="Please enter Name here"
      floatingLabelText="First Name"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value={this.state.mainName}
      onChange={this.changeMainName}
    /><br />
    </Col>
    <Col  md={6} >
    <TextField
      hintText="enter mobile no"
      floatingLabelText="Mobile No"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
     value={this.state.mainMobileNo}
     onChange={this.changeMainMobileNo}
    /><br />
    </Col>
    </Row>
    <Row>
    <Col md={6}>
     <TextField
      hintText="Kindly enter address"
      floatingLabelText="Enter your Address"
      multiLine={true}
      rows={2}
    floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value={this.state.mainAddress}
      onChange={this.changeMainAddress}
    /><br />
    </Col>
    <Col md={6}>
     <TextField
      hintText="Kindly enter total amout "
      floatingLabelText="Total Amount"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      value={this.state.mainAmount}
      onChange={this.changeMainAmount}
    /><br />
    </Col>
    </Row>
    <div  className="paymentSaveButtonPositioning"><Button className='paymentViewAddMain' onClick={this.saveMainPartyInfo}>SAVE</Button></div>
    </div>
    <div className="paymentDividerListView">
    <div className="customerBookingPaymentDivider">
    Payment Divider
    </div>
    <Row>
    <Col md={2}>
    <TextField
      hintText="Enter name here"
      floatingLabelText="First Name"
      className="colWidthAdjustment"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    />
    </Col>
    <Col md={2}>
    <TextField
      hintText="Enter no here"
      floatingLabelText="Mobile No"
      className="colWidthAdjustment"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    />
    </Col>
    <Col md={2}>
    <TextField
      hintText="Enter amount"
      floatingLabelText="Total Amount"
      className="colWidthAdjustment"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
    />
    </Col>
    <Col md={2}>
    
    </Col>
    <Col md={4}>
     <img className="userlogoListView" src="../Assets/addUserForPayment3.png"/>
    </Col>
    </Row>
    </div>
    </div>            
    </div>
    )
}
});

export default AddCustomerInfo;
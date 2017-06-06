import React from 'react';
import ReactDOM from 'react-dom';
import { connect, ReactRedux } from 'react-redux'
import { darkWhite, blue500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { Grid, Row, select, DropdownButton, NavbarHeader, NavbarBrand, NavDropdown, MenuItem } from 'react-bootstrap';
import MyCustomLoader from './MyCustomLoader.jsx';
import InsertTrCompoent from './InsertTrCompoent.jsx';
import Example from './CompleteBookingModal.jsx';
import axios from 'axios';
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
let uniqueId = function () {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};

let AddCustomerInfo = React.createClass({
  contextTypes : {
    router: React.PropTypes.object,
  },
  getInitialState: function () {
    return ({
      mainName: '',
      mainMobileNo: '',
      mainAddress: '',
      mainAmount: 0,
      addPaymentDivider: false,
      paymentDividerName: '',
      paymentDividerMobile: '',
      paymentDividerAmount: 0,
      paymentDividerPaymentOption : 'default',
      paymentDividerEditName: '',
      paymentDividerEditMobile: '',
      paymentDividerEditAmount: 0,
      paymentDividerEditPaymentOption : 'default',
      paymentDividers: [],
      currentPaymentId: '',
      currentPaymentUser: {},
      editPaymentDivider: false,
      slotBookingPageDetails : [],
      totalAmountValidation : 0,
      masterDetailsFilled : false,
      showFinalCompletedStatus:false
    })
  },
  
  loadHome : function(){
    this.context.router.push('/homePage');
  },
  completeBookingButton : function(){
    if(this.state.masterDetailsFilled)
    {
    let majorObject = {
      customerName : this.state.mainName,
      mobileNumber : this.state.mainMobileNo,
      Address : this.state.mainAddress,
      amount : this.state.mainAmount,
    }
    let customerBookingArr = [];
    customerBookingArr = this.state.paymentDividers.map((x) => {
      let newObj = {
        Name : x.PaymentUserName,
        amount : x.PaymentUserAmount,
        mobileNumber : x.PaymentUserMobileNo,
        mode : x.PaymentUserPaymentOption
      }
      // customerBookingArr.push(newObj);
      return newObj;
    })
    majorObject.customerPayment = customerBookingArr;
    majorObject.slotBooking = this.state.slotBookingPageDetails;
    console.log("The final json array is ",JSON.stringify(majorObject));
    axios.post("http://localhost:8080/rest/eagleeye/addCustomer",majorObject).then((response) => {
      console.log("After completing booking response is ",response);
    }).catch((err) =>{
      console.log("The error is ",err);
    })
    }
    else{
     alert("Kindly complete the customer details fields"); 
    }
  
  },
  saveMainPartyInfo: function () {
    console.log("THe main person name is ", this.state.mainName);
    let finalObj = {
      customerName: this.state.mainName,
      mobileNumber: this.state.mainMobileNo,
      Address: this.state.mainAddress,
      amount: this.state.amount
    }
    console.log("FInal object is ", finalObj);
  },
  changeMainName: function (e) {
    this.setState({
      mainName: e.target.value,
      masterDetailsFilled : false
    })
  },
  changeMainMobileNo: function (e) {
    this.setState({
      mainMobileNo: e.target.value,
      masterDetailsFilled : false
    })
  },
  changeMainAddress: function (e) {
    this.setState({
      mainAddress: e.target.value,
      masterDetailsFilled : false
    })
  },
  changeMainAmount: function (e) {
    if (e.target.value >= 0) {
      this.setState({
        mainAmount: e.target.value,
        masterDetailsFilled : false
      })
    }
    else {
      alert("Total amount cannot be negative");
      this.setState({
        mainAmount: 0,
        masterDetailsFilled : false
      })
    }
  },
  checkForAddPaymentDivider: function () {
    let regexMb = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    let mobileNo = this.state.mainMobileNo;
    console.log("Phone no is valid ",regexMb.test(mobileNo));
    let validMobile = regexMb.test(mobileNo);

    if (this.state.mainName != '' && validMobile) {
      this.setState({
        addPaymentDivider: false,
        currentPaymentId: '',
        paymentDividerName: '',
        paymentDividerMobile: '',
        paymentDividerAmount: 0,
        editPaymentDivider: false,
        masterDetailsFilled : true
      })
    }
    else {
      alert("Payment cannot be added without setting proper Mobile no ,Customer name");
    }
  },
  savePaymentDivider: function () {
    if(this.state.paymentDividerName !== "" || this.state.paymentDividerAmount !== 0){
    let finalObj = {
      PaymentUserLocalId: uniqueId(),
      PaymentUserName: this.state.paymentDividerName,
      PaymentUserMobileNo: this.state.paymentDividerMobile,
      PaymentUserAmount: this.state.paymentDividerAmount,
      PaymentUserPaymentOption : this.state.paymentDividerPaymentOption
    };
    console.log("The final single user is ", finalObj)
    let newArr = this.state.paymentDividers.concat(finalObj);
    console.log("New arr is ", newArr);
    this.setState({
      paymentDividers: newArr,
      paymentDividerName: '',
      paymentDividerMobile: '',
      paymentDividerAmount: 0,
      paymentDividerPaymentOption : 'default',
      addPaymentDivider : false,
      editPaymentDivider : true
    })
  }
  else{
    alert("Payment sharing name , amount are mandatory");
  }
  },
  updatePaymentDivider: function () {
    let updateObj = {
      PaymentUserLocalId: this.state.currentPaymentId,
      PaymentUserName: this.state.paymentDividerEditName,
      PaymentUserMobileNo: this.state.paymentDividerEditMobile,
      PaymentUserAmount: this.state.paymentDividerEditAmount,
      PaymentUserPaymentOption : this.state.paymentDividerEditPaymentOption
    }
    // let newArr = 
    let indexPosition = this.state.paymentDividers.findIndex((x) => x.PaymentUserLocalId == this.state.currentPaymentId);
    let newArr = this.state.paymentDividers;
    newArr[indexPosition] = updateObj;
    // console.log("FInal Array whi")
    this.setState({
      paymentDividers: newArr,
      currentPaymentId: '',
      paymentDividerName: '',
      paymentDividerMobile: '',
      paymentDividerAmount: 0,
      paymentDividerEditName: '',
      paymentDividerEditMobile: '',
      paymentDividerEditAmount: 0,
      paymentDividerEditPaymentOption : 'default',
      paymentDividerPaymentOption : 'default',
      editPaymentDivider: true,
    })
  },
  onChangePaymentAmount: function (e) {
    let incomingAmount = 0;
    if (e.target.value != "") {
      incomingAmount = parseInt(e.target.value);
    }
    else {
      incomingAmount = 0;
    }

    let presentAmount = parseInt(this.state.mainAmount);
    console.log(incomingAmount > -1);
    console.log(incomingAmount < presentAmount);
    if ((incomingAmount > -1) && (incomingAmount <= presentAmount)) {
      this.setState({
        paymentDividerAmount: e.target.value,
        totalAmountValidation : this.state.totalAmountValidation+incomingAmount
      })
    }
  },
  onChangePaymentName: function (e) {
    this.setState({
      paymentDividerName: e.target.value
    })
  },
  onChangePaymentMobile: function (e) {
    this.setState({
      paymentDividerMobile: e.target.value
    })
  },
  onChangePaymentEditAmount: function (e) {
    let incomingAmount = 0;
    if (e.target.value != "") {
      incomingAmount = parseInt(e.target.value);
    }
    else {
      incomingAmount = 0;
    }

    let presentAmount = parseInt(this.state.mainAmount);
    console.log(incomingAmount > -1);
    console.log(incomingAmount < presentAmount);
    if ((incomingAmount > -1) && (incomingAmount <= presentAmount)) {
    this.setState({
      paymentDividerEditAmount: e.target.value
    })
    }
  },
  onChangePaymentEditName: function (e) {
    this.setState({
      paymentDividerEditName: e.target.value
    })
  },
  onChangePaymentEditMobile: function (e) {
    this.setState({
      paymentDividerEditMobile: e.target.value
    })
  },
  deletePaymentDivider: function (deleteID,e) {
    e.stopPropagation();
    let presentPaymentArr = this.state.paymentDividers;
    let indexPos = presentPaymentArr.findIndex((x) => x.PaymentUserLocalId == deleteID);
    let newArr = presentPaymentArr.slice(0, indexPos).concat(presentPaymentArr.slice(indexPos + 1));
    console.log("new Arra after deletion",newArr);
    this.setState({
      paymentDividers: newArr,
      currentPaymentId: '',
      paymentDividerName: '',
      paymentDividerMobile: '',
      paymentDividerAmount: 0,
      editPaymentDivider: true,
      addPaymentDivider: false,
      paymentDividerEditName: '',
      paymentDividerEditMobile: '',
      paymentDividerEditAmount: 0,
    })
  },
  changeCurrentId: function (focusId) {
    let userObjIndex = this.state.paymentDividers.findIndex((x) => x.PaymentUserLocalId == focusId);
    let userObj = this.state.paymentDividers[userObjIndex];
    this.setState({
      currentPaymentId: focusId,
      editPaymentDivider: true,
      addPaymentDivider: false,
      paymentDividerName: '',
      paymentDividerMobile: '',
      paymentDividerAmount: '',
      currentPaymentUser: userObj,
      paymentDividerEditName: userObj.PaymentUserName,
      paymentDividerEditMobile: userObj.PaymentUserMobileNo,
      paymentDividerEditAmount: userObj.PaymentUserAmount,
      paymentDividerEditPaymentOption : userObj.PaymentUserPaymentOption
    })
  },
  componentDidMount: function () {
    // alert("Compo")
    // console.log("Coming for next props ", nextProps);
    console.log("Coming from Slot Page ",this.props.location.state);
    this.setState({
      slotBookingPageDetails : this.props.location.state.slotArray
    })
  },
  myDropDownSelect : function(){
    let selectedValue = this.refs.myCustomSelect.value;
    console.log("THe value which i selected" , selectedValue);
    this.setState({
      paymentDividerPaymentOption : selectedValue
    })
  },
  myDropDownEditSelect : function(){
    let selectedValue = this.refs.myCustomSelectEdit.value;
    this.setState({
      paymentDividerEditPaymentOption : selectedValue
    })
  },
  enableAddDividers : function(){
    if(this.state.masterDetailsFilled){
      this.setState({
      addPaymentDivider : true
    })
    }
    else{
      alert("payment dividers cannot be added without Customer details")
    }
  },
  render: function () {
    console.log("the arr is", this.state.paymentDividers);
    let finArr = this.state.paymentDividers.map((x) => {
              let currObj = x;
      if(this.state.currentPaymentId == currObj.PaymentUserLocalId){
        return(
          <tr className="paymentUserListSecondaryRow">
                        <td className="userListHeader userListNameDisplay positionAdjusting"><input type="text" value={this.state.paymentDividerEditName} onChange={this.onChangePaymentEditName} placeholder="name ..."/></td>
                        <td className="userListHeader positionAdjusting"><input type="NUMBER" value={this.state.paymentDividerEditMobile} onChange={this.onChangePaymentEditMobile} placeholder="mobile no..." /></td>
                        <td className="userListHeader positionAdjusting"><input type="NUMBER" value={this.state.paymentDividerEditAmount} onChange={this.onChangePaymentEditAmount} placeholder="amount" /></td>
                        <td className="userListHeader positionAdjusting">
                        <select ref="myCustomSelectEdit" value={this.state.paymentDividerEditPaymentOption} onChange={this.myDropDownEditSelect}>
                          <option value="volvo">Select Payment Mode</option>
                          <option value="Card">Card</option>
                          <option value="Paytm">PayTm</option>
                        </select>  
                        </td>                        
                        <td className="userListHeader"><img className="savePaymentIcon" src='Assets/savePayment1.jpg' onClick={this.updatePaymentDivider} /></td>
          </tr>
        );
        }
        else{
          
        return(
            <tr className="paymentUserListSecondaryRow" onClick={this.changeCurrentId.bind(this,currObj.PaymentUserLocalId)}>
                          <td className="userListHeader userListNameDisplay positionAdjusting">{currObj.PaymentUserName}</td>
                          <td className="userListHeader positionAdjusting">{currObj.PaymentUserMobileNo}</td>
                          <td className="userListHeader positionAdjusting">{currObj.PaymentUserAmount}</td>
                          <td className="userListHeader positionAdjusting">{currObj.PaymentUserPaymentOption}</td>
                          <td className="userListHeader positionAdjusting"><img  className="deleteUserIconSettings" src='Assets/deleteAddedUser.png' onClick={this.deletePaymentDivider.bind(this,currObj.PaymentUserLocalId)}/></td>

            </tr>
          );
          } 
            });
    return (
      <div>
        <Row className="headerRowForSlotBooking">
          <div className="myWrapperDivForModal"><Example /></div>
          <Col md={2} className="slotBookHeaderText">
            <img src='Assets/homeIcon.png' className="slotBookHomeButton" onClick={this.loadHome}/>
            <span className="slotBookHeaderText">Slot Booking</span>
          </Col>
          <Col md={2}>
          <img src='Assets/logo.png' className="headerLogoDisplayInCustomerPage"/>
          </Col>
          <Col md={6}>
          </Col>
          <Col md={2}>
            <div className="completeBookingButton" onClick={this.completeBookingButton}>
              Complete Booking !
            </div>
          </Col>
        </Row>
        <Row className="addCustomerSecondaryRow">
          <Col md={3} className="customerDetailPositioning">
            <div className="customerBookingHeader">
              <img src='Assets/footballPlayer2.png' className="customerIconCustom" />
              Customer Details
            </div>
            <TextField
              hintText="Please enter Name here"
              floatingLabelText="First Name"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              value={this.state.mainName}
              onChange={this.changeMainName}
              className="myTrialCusrom"
              /><br />
            <TextField
              hintText="enter mobile no"
              floatingLabelText="Mobile No"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              value={this.state.mainMobileNo}
              onChange={this.changeMainMobileNo}
              className="myTrialCusrom"
              /><br />
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
              className="myTrialCusrom"
              /><br />
            <TextField
              hintText="Kindly enter total amout "
              floatingLabelText="Total Amount"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              value={this.state.mainAmount}
              onChange={this.changeMainAmount}
              className="myTrialCusrom"
              /><br />
            {!this.state.masterDetailsFilled ? <div className="saveMasterCustomer" onClick={this.checkForAddPaymentDivider}>
              Save Master Customer
            </div>: <div className="saveMasterCustomer" onClick={this.checkForAddPaymentDivider}>
              Saved !
            </div>}
          </Col>
          <Col md={8} className="paymentDividerPositioning">
            <div className="customerBookingPaymentDivider">
              Payment Divider
               <img className="paymentDividerAdd" src="../Assets/addUserForPayment3.png" onClick={this.enableAddDividers} />
            </div>
        <table className="paymentuserList">
        <thead>
            <tr className="paymentUserListHeaderRow">
                        <th className="userListHeader">First Name</th>
                        <th className="userListHeader">Mobile no</th> 
                        <th className="userListHeader">Amount</th>
                        <th className="userListHeader">PaymentMode</th> 
                        <th className="userListHeader resizingLastColWidth"></th> 
            </tr>
            </thead>
            <tbody>
            
               {this.state.addPaymentDivider ? <tr className="paymentUserListSecondaryRow">
                        <td className="userListHeader userListNameDisplay positionAdjusting"><input type="text" value={this.state.paymentDividerName} onChange={this.onChangePaymentName} className="transparentBorder" placeholder="enter name ..."/></td>
                        <td className="userListHeader positionAdjusting"><input type="NUMBER" value={this.state.paymentDividerMobile} onChange={this.onChangePaymentMobile} placeholder="enter mobile no..." className="transparentBorder" /></td>
                        <td className="userListHeader positionAdjusting"><input type="NUMBER" value={this.state.paymentDividerAmount} onChange={this.onChangePaymentAmount} placeholder="enter amount" className="transparentBorder" /></td>
                       <td className="userListHeader positionAdjusting">
                        <select ref="myCustomSelect" value={this.state.paymentDividerPaymentOption} onChange={this.myDropDownSelect}>
                          <option value="default">Select Payment Mode</option>
                          <option value="Card">Card</option>
                          <option value="Paytm">PayTm</option>
                        </select>
                        </td>                        
                        <td className="userListHeader"><img  className="savePaymentIcon" src='Assets/savePayment1.jpg' onClick={this.savePaymentDivider} /></td>
            </tr> : <tr/>}
            {finArr}
            </tbody>
           </table>
         
          </Col>
        </Row>
        
      </div>
    )
  }
});

export default AddCustomerInfo;


/*
<div  className="paymentSaveButtonPositioning"><Button className='paymentViewAddMain' onClick={this.saveMainPartyInfo}>SAVE</Button></div>
*/
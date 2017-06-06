import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { Grid, Row, select, DropdownButton, NavbarHeader, NavbarBrand, NavDropdown, MenuItem } from 'react-bootstrap';


let InsertTrCompoent = React.createClass({
    render : function(){
        return(
            <tr className="paymentUserListSecondaryRow">
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
            </tr>
        )
    }
})

export default InsertTrCompoent;

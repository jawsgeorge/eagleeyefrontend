import React from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { Grid, Row, select, DropdownButton, NavbarHeader, NavbarBrand, NavDropdown, MenuItem ,Modal} from 'react-bootstrap';


const AddRoleComponent = React.createClass({
    contextTypes : {
    router: React.PropTypes.object,
  },
  getInitialState() {
    return { 
        show: true,
        addUserClick : false,
         addRoleClick : false,
         addSlotBookingClick : false,
         addPaymentDueClick : false,
         newRoleName : ''   
     };
  },
  onRoleSelect : function(value){
        console.log("THis is clicked ",value);
         if(value == 1){
             this.setState({
                 addUserClick : !this.state.addUserClick
             })
         }
         else if(value == 2){
            this.setState({
                 addRoleClick : !this.state.addRoleClick
             })
         }
         else if(value == 3){
             this.setState({
                 addSlotBookingClick : !this.state.addSlotBookingClick
             })
         }
         else if(value == 4){
             this.setState({
                 addPaymentDueClick : !this.state.addPaymentDueClick
             })
         }
    },
  close: function() {
      let _this = this;
    this.setState({
        show:false
    },function(){
        _this.context.router.push('/homePage')
    })  
  },
  addNewRoleChange : function(e){
        // console.log(e.target.value)
        this.setState({
            newRoleName : e.target.value
        })
    },
  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton className="myModalHeader">
            <Modal.Title id="contained-modal-title">AddRole</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <div onClick={this.saveNewRole} className="modalSaveRole"> Save Role </div>
                    <table>
                        <thead>
                        <tr className="roleListEditHeaderRow">
                        <th className="roleListRowCellHeader">Title</th>
                        <th className="roleListRowCellHeader">Add User</th> 
                        <th className="roleListRowCellHeader">Add Role</th>
                        <th className="roleListRowCellHeader">Slot Booking</th>
                        <th className="roleListRowCellHeader">Payment Due</th> 
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="roleListMainHeaderRow">
                        <td className="roleListRowCellNew"><input type="text" className="addRoleTextField" value={this.state.newRoleName} onChange={this.addNewRoleChange.bind(this)}/></td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,1)}>{this.state.addUserClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td> 
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,2)}>{this.state.addRoleClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,3)}>{this.state.addSlotBookingClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,4)}>{this.state.addPaymentDueClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        </tr>
                        </tbody>
                    </table>
             </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default AddRoleComponent;
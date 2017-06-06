import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { Grid, Row, select, DropdownButton, NavbarHeader, NavbarBrand, NavDropdown, MenuItem ,Modal} from 'react-bootstrap';


const Example = React.createClass({
  getInitialState() {
    return { showModal: true };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {

    return (
      <div className="bookingReferenceNoDisplayModal">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading 1</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <h4>Tooltips in a modal</h4>
            <p>there is a here</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default Example;
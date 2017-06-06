import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap';
import { Grid, Row, select, DropdownButton, NavbarHeader, NavbarBrand, NavDropdown, MenuItem } from 'react-bootstrap';

let GenericHeader = React.createClass({
     contextTypes : {
    router: React.PropTypes.object,
  },
    loadHome: function(){
        let _this = this;
        if(confirm("You might lose your unsaved content, are you sure ?") == true){
            _this.context.router.push('/homePage');
        }
        else{

        }
    },
    completeUrl:function(){
        console.log("this.pops ",this.props)
        this.context.router.push(`/${this.props.goToUrl}`)
    },
    completeBack:function(){
        let _this = this;
        if(confirm("You might lose your unsaved content, are you sure ?") == true){
           _this.context.router.push(`/${_this.props.backUrl}`);
        }
        else{

        }
        //  console.log("this.pops ",this.props)
        // this.context.router.push(`/${this.props.backUrl}`)
    },
    render:function(){
        return(
            <div>
            <Row className="headerRowForSlotBooking">
          <Col md={2} className="slotBookHeaderText">
            <img src='Assets/back5.png' className="genericBackIcon" onClick={this.completeBack}/>
            <span className="slotBookHeaderText">{this.props.headerText}</span>
            <img src='Assets/logo.png' className="headerLogoDisplay"/>
          </Col>
          <Col md={8}>
          </Col>
          <Col md={2}>
          {this.props.buttonText.length>0 ?  <div className="genericTextContent" onClick={this.completeUrl}>
              {this.props.buttonText}!
            </div>  : ""}
            <img src='Assets/homeIcon.png' className={this.props.buttonText.length>0 ?"genericHomeButton" : "genericTextContentWithoutText"} onClick={this.loadHome}/>
          </Col>
        </Row>
        </div>
        )
    }
});

export default GenericHeader;
// <span className="slotBookHeaderText">{this.props.displayText}</span>
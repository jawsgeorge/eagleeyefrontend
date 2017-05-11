import React from 'react';
import EventCal from "./EventCal.jsx" ;
import {Grid,Row,Col,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import events from './event.js';
import events2 from './event2.js';

var SlotMainPage = React.createClass({

     getInitialState: function() {
    return {
         selectedGroud:1,
         slotData : events
       }
    },
    selectedGroundfunc:function(data){
        console.log(data)
      this.setState({
          selectedGroud:data,
          slotData : events2
      });
    },
    render(){
        return(
         <Row>
             <Col md={2} className="padRightZero">
                <ul className="groundUL"> 
                    <li className="grndListDet" >GroundDetails</li>
                    <li className={this.state.selectedGroud == 1 ? "selectedGrnd" : "normalGrnd"} onClick={this.selectedGroundfunc.bind(this,1)}>Ground 1</li>
                    <li className={this.state.selectedGroud == 2 ? "selectedGrnd" : "normalGrnd"} onClick={this.selectedGroundfunc.bind(this,2)}>Ground 2</li>
                    <li className={this.state.selectedGroud == 3 ? "selectedGrnd" : "normalGrnd"} onClick={this.selectedGroundfunc.bind(this,3)}>Ground 3</li>
                    <li className={this.state.selectedGroud == 4 ? "selectedGrnd" : "normalGrnd"} onClick={this.selectedGroundfunc.bind(this,4)}>Ground 4</li>
                </ul>
             </Col>
              <Col md={10}>
              <EventCal groundData={this.state.slotData}/>
             </Col>
         </Row>
        )
    }
})

export default SlotMainPage; 
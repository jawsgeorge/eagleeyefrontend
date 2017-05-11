import React from 'react';
import EventCal from "./EventCal.jsx" ;
import {Grid,Row,Col,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import events2 from './event2.js';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-bootstrap-date-picker'


let NewSlotBooking = React.createClass({
    getInitialState : function(){
         var value = new Date().toISOString();
        return(
            {
                slotData : events2,
                selected : false,
                value: value,
                formattedValue : "",
                slotDetailArr : [],
                fullFinalArray : [],
                newlyBooked : []
            }
        )
    },
    contextTypes : {
    router: React.PropTypes.object
  },
    selectionDone : function(GroundId,SlotId){
        // this.setState({selected : true});
        let previousArr = this.state.slotDetailArr;
        let findIndex2 = previousArr.findIndex((x) => x.slotId == SlotId);
        let newArr =[];
        let myNewBooking = this.state.newlyBooked;
        if(findIndex2 > -1){
            // alert("Come here")
            let newStatus = previousArr[findIndex2].status == "Booked" ? "NotBooked" : "Booked";
            // alert(newStatus)
             let selectedObj = {
            slotId : SlotId,
            startTime : "00:30",
            endTime : "07:00",
            status : newStatus,
            bookingDate : this.state.formattedValue,
            groundId : GroundId,
            groundName : "MyGround"
        }
        console.log("Object which i am modifying",selectedObj);
        console.log("Index position is ",findIndex2)
        previousArr[findIndex2]=selectedObj;
        newArr = previousArr;

        // Updating for newly booked
        let findPosition = myNewBooking.findIndex((x) => x.slotId == SlotId);
        if(findPosition > -1){
            myNewBooking[findPosition] = selectedObj;
        }
        }
        else{
            console.log(GroundId,SlotId);
        let selectedObj = {
            slotId : SlotId,
            startTime : "00:30",
            endTime : "07:00",
            status : "Booked",
            bookingDate : this.state.formattedValue,
            groundId : GroundId,
            groundName : "MyGround"
        }
        newArr = previousArr.concat(selectedObj);
        myNewBooking.push(selectedObj);
        }
        
        // let newArr = this.state.slotDetailArr.concat(selectedObj);
        console.log("Final new arry ",newArr)
        let finalArr = [];
for(let i=1;i<=10;i++){
    let findIndex = newArr.findIndex((x) => x.slotId == i);
    if(findIndex > -1){
        console.log("value found ", newArr[findIndex]);
        console.log("findIndex",findIndex)
        if(newArr[findIndex].status == "Booked"){
            finalArr.push(
        <Row className="newEachCellDesignSelected" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
             )
        }
        else{
            finalArr.push(
        <Row className="newEachCellDesign" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
    )
        }
        
    }
    else{
        finalArr.push(
        <Row className="newEachCellDesign" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
    )
}   
this.setState({
    slotDetailArr : newArr,
    fullFinalArray : finalArr,
    newlyBooked : myNewBooking
})
}


    },
    completeBooking : function(){
        let finalBooking = this.state.newlyBooked;
        let toSendArray = finalBooking.filter((x) => x.status == "Booked");
        console.log("Final Array which is goinf to get booked is",JSON.stringify(toSendArray));
        this.context.router.push('/adduser');
    },
  handleChange: function(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
    });
  },
  componentDidMount : function(){
let slotDetailArr = [];
slotDetailArr = [
  {
    "slotId": 1,
    "startTime": "0.00",
    "endTime": "0.30",
    "status": "Parital",
    "bookingDate": "2017-05-04",
    "groundId": 2,
    "groundName": "Ground B"
  },
  {
    "slotId": 2,
    "startTime": "0.00",
    "endTime": "0.30",
    "status": "Booked",
    "bookingDate": "2017-05-04",
    "groundId": 2,
    "groundName": "Ground B"
  }
];
let finalArr = [];
for(let i=1;i<=10;i++){
    let findIndex = slotDetailArr.findIndex((x) => x.slotId == i);
    if(findIndex > -1){
        console.log("value found ", slotDetailArr[findIndex]);
        console.log("findIndex",findIndex)
        if(slotDetailArr[findIndex].status == "Booked"){
            finalArr.push(
        <Row className="newEachCellDesignSelected" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
             )
        }
        else{
            finalArr.push(
        <Row className="newEachCellDesign" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
    )
        }
        
    }
    else{
        finalArr.push(
        <Row className="newEachCellDesign" onClick={this.selectionDone.bind(this,1,i)}>
        </Row>
    )
    }   
}
this.setState({
    slotDetailArr : slotDetailArr,
    fullFinalArray : finalArr
})
  },
    render : function(){
        
        return(
            <div>
                <Row className="headerRowForSlotBooking">
                    <Col md={4}>
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} className = "hello"/>
                    </Col>
                    <Col md={4}>
                        <div className="dateDetailsDisplay">
                        <img className="dateIconWidth" src='Assets/back.png'/>
                        <span className="iconTextFormatting">Prev</span>
                        <span className="dateTextFormatting">05-March-2015</span>
                        <span className="iconTextFormatting">Next </span>
                        <img className="dateIconWidth" src='Assets/right.png'/>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="slotBookingButton" onClick={this.completeBooking}> Book Slots ! </div>
                    </Col>
                </Row>
                <Row className="secondHeaderSlotBooking">
                    <Col md={1}/>

                    <Col md={2}>
                        <span className="secondHeaderTextFormatting">Time Slots</span>
                    </Col>
                    <Col md={2}>
                        <span className="secondHeaderTextFormatting">Ground 1</span>
                    </Col>
                    <Col md={2}>
                        <span className="secondHeaderTextFormatting">Ground 2</span>
                    </Col>
                    <Col md={2}>
                        <span className="secondHeaderTextFormatting">Ground 3</span>
                    </Col>
                    <Col md={2}>
                        <span className="secondHeaderTextFormatting">Ground 4</span>
                    </Col>
                    <Col md={1}/>
                </Row>
                <Row className="SlotBookingNewArrangement">
                    <Col md={1}/>
                    <Col md={2}>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">00:00 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">00:30 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">01:00 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">01:30 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">02:00 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">02:30 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">03:00 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">03:30 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">04:00 AM</span>
                    </Row>
                    <Row className="newEachCellDesign">
                        <span className="timeDisplayCell">04:30 AM</span>
                    </Row>
                    </Col>
                    <Col md={2}>
                    {this.state.fullFinalArray}
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col md={2}>

                    </Col>
                    <Col md={1}/>
                </Row>
            </div>
        )
    }
});

export default NewSlotBooking;
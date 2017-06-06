import React from 'react';
import EventCal from "./EventCal.jsx";
import { mockSlotJson} from './mockSlot.js'
import {
    Grid,
    Row,
    Col,
    select,
    DropdownButton,
    NavbarHeader,
    NavbarBrand,
    NavDropdown,
    MenuItem,
    Table
} from 'react-bootstrap';
import events2 from './event2.js';
import DatePicker from 'react-datepicker'; 
import axios from 'axios';
// 
//import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css'; 
//import DatePicker from 'react-bootstrap-date-picker'

let NewSlotBooking = React.createClass({
    contextTypes : {
    router: React.PropTypes.object,
  },
    getInitialState: function () {
        var value = new Date().toISOString();
        return ({
            slotData: events2,
            selected: false,
            value: value,
            formattedValue: "",
            slotDetailArr: [],
            fullFinalArray: [],
            TotalSlotArray: [],
            selectedSlotArray : [],
            timeSlots : ["00:00 - 00:30","00:30 - 01:00","01:00 - 01:30","01:30 - 02:00","02:00 - 02:30","02:30 - 03:00",
                         "03:00 - 03:30","03:30 - 04:00","04:00 - 04:30","04:30 - 05:00","05:00 - 05:30","05:30 - 06:00",
                         "06:00 - 06:30","06:30 - 07:00","07:00 - 07:30","07:30 - 08:00","08:00 - 08:30","08:30 - 09:00",
                         "09:00 - 09:30","09:30 - 10:00","10:00 - 10:30","10:30 - 11:00","11:00 - 11:30","11:30 - 12:00",
                         "12:00 - 12:30","12:30 - 13:00","13:00 - 13:30","13:30 - 14:00","14:00 - 14:30","14:30 - 15:00",
                         "15:00 - 15:30","15:30 - 16:00","16:00 - 16:30","16:30 - 17:00","17:00 - 17:30","17:30 - 18:00",
                         "18:00 - 18:30","18:30 - 19:00","19:00 - 19:30","19:30 - 20:00","20:00 - 20:30","20:30 - 21:00",
                         "21:00 - 21:30","21:30 - 22:00","22:00 - 22:30","22:30 - 23:00","23:00 - 23:30","23:30 - 23:59"]
        })
    },
    bookSlot: function (SlotId,GroundIndex) {
        console.log("SlotId",SlotId,"  GroundIndex",GroundIndex);
        let slotsData = this.state.fullFinalArray;
        let slotStatus = slotsData[SlotId][`ground${GroundIndex+1}`];
        // alert(slotStatus);
        if(slotStatus == "ParitallyBooked" || slotStatus == "Booked"){
            // alert(``)
        }
        else{
          if(slotStatus == "AvaliableSlot"){
            slotsData[SlotId][`ground${GroundIndex+1}`] = "Selected";
            let Obj = {
                        "slotId": SlotId+1 ,
                        "status": "New",
                        "bookingDate": "2017-05-04",
                        "groundId": this.state.slotDetailArr[GroundIndex].groundId,
                        "groundName": this.state.slotDetailArr[GroundIndex].groundName,
                        "MasterGroundId": this.state.slotDetailArr[GroundIndex].MasterGroundId
                    };
            let ModifiedSelectedSlotArray = this.state.selectedSlotArray;
                ModifiedSelectedSlotArray.push(Obj);
            this.setState({
                selectedSlotArray : ModifiedSelectedSlotArray,
                fullFinalArray : slotsData
            });
          }
          else{  //Selected
             slotsData[SlotId][`ground${GroundIndex+1}`] = "AvaliableSlot";
             let findIndex = this.state.selectedSlotArray.findIndex( x => x.slotId == SlotId+1);
             let ModifiedSelectedSlotArray = this.state.selectedSlotArray.splice(findIndex,1);
              this.setState({
                selectedSlotArray : ModifiedSelectedSlotArray,
                fullFinalArray : slotsData
            });
          }
        }

    },
    completeBooking: function () {
        let _this= this;
        console.log("The array which is booked",JSON.stringify(this.state.selectedSlotArray));
        let reObj = {
            bookslots : this.state.selectedSlotArray
        }
        // console.log("Req json ",JSON.stringify(reObj));
        axios.post("http://localhost:8080/rest/eagleeye/bookSlots",reObj).then((response) => {
            console.log("Receive for book slots",response);
            
            let myReqdData = response.data;
            if(myReqdData.bookStatus == 'Success'){
                // bookedSlots
                  _this.context.router.push({
                pathname : '/customerDetailForBooking',
                state : {
                  slotArray : myReqdData.bookedSlots
                }
             })
            }
            else{
                alert("Sorry some internal error occured while booking")
            }

        }).catch((err) => {

        })
        //bookSlots
    },
    handleChange: function (value, formattedValue) {
       
    },
    componentDidMount: function () {
         let data = this.props.location.state;
         console.log(data);
         let GroundCount = data.slotDetails.length;
         let timeArr = ["00:00 - 00:30","00:30 - 01:00","01:00 - 01:30","01:30 - 02:00","02:00 - 02:30","02:30 - 03:00",
                         "03:00 - 03:30","03:30 - 04:00","04:00 - 04:30","04:30 - 05:00","05:00 - 05:30","05:30 - 06:00",
                         "06:00 - 06:30","06:30 - 07:00","07:00 - 07:30","07:30 - 08:00","08:00 - 08:30","08:30 - 09:00",
                         "09:00 - 09:30","09:30 - 10:00","10:00 - 10:30","10:30 - 11:00","11:00 - 11:30","11:30 - 12:00",
                         "12:00 - 12:30","12:30 - 13:00","13:00 - 13:30","13:30 - 14:00","14:00 - 14:30","14:30 - 15:00",
                         "15:00 - 15:30","15:30 - 16:00","16:00 - 16:30","16:30 - 17:00","17:00 - 17:30","17:30 - 18:00",
                         "18:00 - 18:30","18:30 - 19:00","19:00 - 19:30","19:30 - 20:00","20:00 - 20:30","20:30 - 21:00",
                         "21:00 - 21:30","21:30 - 22:00","22:00 - 22:30","22:30 - 23:00","23:00 - 23:30","23:30 - 23:59"];
         let TotalSlotArray = [];
              for(let m=0;m<data.slotDetails.length;m++){
               TotalSlotArray =  TotalSlotArray.concat(data.slotDetails[m].slots);
             }
        let renderSlotArray = [];
             for(var i=0;i < 48;i++){
             let slotObj = {};
             slotObj.timeSlot = timeArr[i];
             for(let k=0;k<data.slotDetails.length;k++){
                let StatusString = "AvaliableSlot";
                let findIndex = data.slotDetails[k].slots.findIndex((x) => x.slotId == i+1);
                   if (findIndex > -1) {
                    StatusString = data.slotDetails[k].slots[findIndex].status;
                   }
                   slotObj[`ground${k+1}`] = StatusString;
                //    slotObj[`ground${k+1}`]
             }

             renderSlotArray.push(slotObj);
             }
        this.setState({
            fullFinalArray: renderSlotArray,
            slotDetailArr : data.slotDetails,
            TotalSlotArray : TotalSlotArray
        });
    },
    navigateToHome : function(){
        let _this = this;
        if(confirm("You might lose your unsaved content are you sure") == true){
            _this.context.router.push('/homePage');
        }
        else{

        }
    },
    render: function () {
  console.log("state",this.state.selectedSlotArray)
        return (
            <div>
                <Row className="headerRowForSlotBooking">
               
                 <Col md={2} className="slotBookHeaderText">
                    <img src='Assets/homeIcon.png' className="slotBookHomeButton" onClick={this.navigateToHome}/>
                    <span className="slotBookHeaderText">Slot Booking</span>
                    <img src='Assets/logo.png' className="headerLogoDisplay"/>
                 </Col>
                 <Col md={8}>
                 </Col>
                    <Col md={2}>
                        <div className="slotBookingButton" onClick={this.completeBooking}>
                            Book Slots !
                        </div>
                    </Col>
                </Row>
                <Row className="slotBookSubHeader">
                    <Col md={2}>
                     <DatePicker id="example-datepicker" placeholderText="Select Date" value={this.state.value} onChange={this.handleChange} className = "hello"/>
                     <img src="Assets/s.png" className='calenderIconClass'/>
                    </Col>
                    <Col md={2} className="TodayDateConatiner">
                        {/*<img src="Assets/icon_arrow_left.png"> </img>*/}
                        <button className="btn_class">
                            <span className="arrow_icon_left"></span>
                        </button>
                        <span className="TodayDate">13-05-2017</span>
                        <button className="btn_class">
                            <span className="arrow_icon_right"></span>
                        </button>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={1}>
                         <div className="avl_color_box"></div>
                       <div className="avl_Text">Avaliable</div>  
                    </Col>
                     <Col md={1}>
                        <div className="slctd_color_box"></div>
                       <div className="slctd_Text">Selected</div>  
                    </Col>
                     <Col md={1} className="bkdslot">
                       <div className="bkdslot_color_box"></div>
                       <div className="bkdslot_Text">Booked</div>  
                    </Col>
                     <Col md={2}>
                        <div className="part_color_box"></div>
                       <div className="part_Text">PartiallyBooked</div>  
                    </Col>
                   
                </Row>
                <Row className="secondHeaderSlotBooking">
                    <Col md={4} className="noPad">
                        <div className="partiallyBookedSlotContainer">
                            <div className="partiallyBookedSlotContainerHeader">Partially Booked Slots</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet">  1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>

                        </div>
                        <div className="partiallyBookedSlotContainer">
                            <div className="partiallyBookedSlotContainerHeader">Selected Slots</div>
                            <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                             <div className="slotdet"> 1. Ground 1(10:00 - 12:30)</div>
                        </div>
                    </Col>
                   <Col md={8} className="noPad">
                        <table className="slotTable">
                             <thead >
                                <tr  className="slotHeaderContainer">
                                    <th className="slotTimeColHeder">Time Slots</th>
                                     {this.state.slotDetailArr.map((groundData,index) =>{
                                            return(
                                            <th className="GroundColHeader">{groundData.groundName}{`(${groundData.groundConfigCode})`}</th>
                                            )})}
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {/*{this.state.fullFinalArray}*/}
                                   {this.state.fullFinalArray.map((data,slotIndex) =>{
                                 return(
                                     <tr className="slotRow"> 
                                        <td className="timeSlotCol">{data.timeSlot}</td>
                                        {this.state.slotDetailArr.map((subdata,GroundIndex) =>{
                                            return(
                                            <td className={data[`ground${GroundIndex+1}`]} onClick={this.bookSlot.bind(this,slotIndex,GroundIndex)}></td>
                                            )})}
                                     </tr>
                                 )

                                }
                                 )}
                    
                            </tbody>
                        </table>
                    </Col>
                </Row>

            </div>
        )
    }
});

export default NewSlotBooking;  
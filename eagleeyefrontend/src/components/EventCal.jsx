import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, Col, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
import {Grid,Row,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import events from './event.js';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

let parseDate = ({inputDate}) =>{
let dd = inputDate.getDate() < 10 ? '0'+inputDate.getDate() : `${inputDate.getDate()}` ;
let mm = (inputDate.getMonth()+1) < 10 ? `0${inputDate.getMonth()+1}` : `${inputDate.getMonth()+1}`;
let yyyy = inputDate.getFullYear();
let hh = inputDate.getHours() < 10 ? '0'+inputDate.getHours() : `${inputDate.getHours()}`;
let mins = (inputDate.getMinutes()) < 10 ? `0${inputDate.getMinutes()}` : `${inputDate.getMinutes()}`;
let requiredDate = `${yyyy}-${mm}-${dd} ${hh}:${mins}`
console.log("returning date is ",requiredDate)
return requiredDate;
}
// moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
let checkIfDateIsPresentAlready = ({calenderObj,EventArray}) => {
  let reqdStartDate =parseDate({inputDate :calenderObj.start }) ;
  let reqdEndDate = parseDate({inputDate :calenderObj.end }) ;
  // let result = false;
  let result1=false;
  let result2=false;
  let result3= false;
  let result4 = false;
  for(let i=0;i<EventArray.length;i++){
    let incomingStartTime = parseDate({inputDate :EventArray[i].start});
    let incomingEndTime = parseDate({inputDate :EventArray[i].end});
    result1 = moment(reqdStartDate).isBetween(incomingStartTime,incomingEndTime);
    console.log("Start check ", result1);
    result2=moment(reqdEndDate).isBetween(incomingStartTime,incomingEndTime);
    console.log("End check ", result2);
    result3 = moment(incomingStartTime).isBetween(reqdStartDate,reqdEndDate);
    result4 = moment(incomingEndTime).isBetween(reqdStartDate,reqdEndDate);
  }
  return (result1||result2||result3||result4);
}

let EventCal = React.createClass({
getInitialState : function(){
  return({
    events : this.props.groundData
  })
},

componentWillMount() {
  console.log("coming inside the event cal willmount") 
},

updateEvent : function(sts){
  console.log("VVGP ",sts);
  let isPresent = checkIfDateIsPresentAlready({calenderObj : sts,EventArray : this.state.events});
  console.log("Checking if that  is present already ", isPresent);
  if(isPresent){
    alert("The choosen slot is already blocked");
  }
  else{
  // 'title': 'Birthday Party',
  // 'start':new Date(2015, 3, 13, 7, 0, 0),
  // 'end': new Date(2015, 3, 13, 10, 30, 0)
  let startDate = sts.start;
  let reqdStartDate =parseDate({inputDate :startDate }) ;
  let reqdEndDate = parseDate({inputDate :sts.end }) ;
  console.log("VGP",moment(reqdEndDate).toDate())
  let obj={
    'title': 'Vignesh Addtion',
    'start' : moment(reqdStartDate).toDate(),
    'end': moment(reqdEndDate).toDate()
  }
  console.log(obj);
  let newArr= this.state.events;
  newArr.push(obj);
  this.setState({
    events:newArr
  });
}
},
componentWillReceiveProps(nextProps) {
   this.setState({
     events:nextProps.groundData
   });
},

render : function(){
  console.log("state",this.state.events)
  return(
    <div>
    <Row>
      <BigCalendar
        selectable
            events={this.state.events}
            defaultView='day'  
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) =>{
              console.log("selected slot:" , slotInfo.start.toLocaleString());
              console.log("End slot:",slotInfo.end.toLocaleString());
               this.updateEvent(slotInfo);
            }}
            onSelecting = {(sts) => {
              // console.log("VGP",sts);
              //console.log("VGP start",sts.start);
              //console.log("VGP end",sts.end);
              // this.updateEvent(sts);
            }}
            toolbar={true}
            titleAccessor = {"MyTitle"}
    />
    </Row>
      
    </div>
  )
}
});
export default EventCal;

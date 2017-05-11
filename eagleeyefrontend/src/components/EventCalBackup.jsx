import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, Col, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
import {Grid,Row,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import events from './event.js';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

function Event({ event }) {
  return (
      <strong>
      {event.title}
      </strong>
  )
}
let EventCal = React.createClass({
getInitialState : function(){
  return({
    events : events
  })
},
updateEvent : function(sts){
  console.log("VVGP ",sts);

  let Obj = {
     'title': 'Long Event',
    'start': new Date(sts.start),
    'end': new Date(sts.end),
    'desc': "vanthuru"
  }
  let updateObj =  this.state.events;
      updateObj.push(Obj);
  this.setState({
    events : updateObj
  });
},
alertfunc(){
   console.log("chk drag")
},
render : function(){
  console.log("state check",this.state.events)
  return(
    <div >
      <BigCalendar {...this.props}
        selectable
            events={this.state.events}
            defaultView='week'
            scrollToTime={new Date(1970, 1, 1, 6)}
              components={{
            event: Event
          }}
            defaultDate={new Date(2015,3,12)}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) => this.updateEvent(slotInfo) }
            onSelecting = {(sts) => {}}
            toolbar={true}
            titleAccessor = {"MyTitle"}
    />
    </div>
  )
}
});
export default EventCal;

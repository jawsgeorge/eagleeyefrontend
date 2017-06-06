import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, History} from 'react-router'
import {connect, ReactRedux} from 'react-redux'
import {Form, FormGroup, FormControl, Col,Row, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
// var Alert = require('react-dialog/lib/components/Alert');
// require('react-big-calendar/lib/css/react-big-calendar.css');

let HomePage = React.createClass({

     contextTypes : {
        router: React.PropTypes.object
    },
    goSlotLocation : function(){
        this.context.router.push('/slotLocation');
    },
   goUserConfig : function() {
        this.context.router.push('/roleList');
   },
   goUserList : function() {
        this.context.router.push('/userList');
   },
   componentWillMount : function(){
       
   },
   componentDidMount : function(){
    console.log("The object array which is coming ",this.props.location.state);
   },
    render : function(){
        return( 
            <div id="homePage">
                <Row className ="homewrapper">
                    <Col md={4}>
                        <img src='Assets/userlist.png' className="userlistIcon" onClick={this.goUserList}/>
                        <div className="font">User List</div>
                    </Col>
                    <Col  md={4}>
                       <img src='Assets/try.png' className="sechduleIcon" onClick={this.goSlotLocation}/>
                       <div className="font">Book Slots</div>
                    </Col>
                    <Col  md={4}>
                       <img src='Assets/hhh.png' className="confIcon" onClick={this.goUserConfig}/>
                       <div className="font">Config List</div>
                    </Col>
                </Row>
                
            </div>
        )
    }
})


function mapMeetingtoProps(store) {
      return {

            };
}
// export default connect(mapMeetingtoProps)(HomePage);
export default HomePage;

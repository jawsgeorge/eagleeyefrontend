import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, History} from 'react-router'
import {connect, ReactRedux} from 'react-redux'
import {Form, FormGroup, FormControl, Col,Row, ControlLabel,Button,InputGroup,Glyphicon} from 'react-bootstrap';
// require('react-big-calendar/lib/css/react-big-calendar.css');

let HomePage = React.createClass({

     contextTypes : {
        router: React.PropTypes.object
    },
    goSlotLocation : function(){
        this.context.router.push('/slotLocation');
    },
   goUserConfig : function() {
        this.context.router.push('/register');
   },
    render : function(){
        return(
            <div id="homePage">
                <Row className ="homewrapper">
                    <Col md={3}></Col>
                    <Col  md={4}>
                       <img src='Assets/try.png' className="sechduleIcon" onClick={this.goSlotLocation}/>
                    </Col>
                    <Col  md={4}>
                       <img src='Assets/hhh.png' className="confIcon" onClick={this.goUserConfig}/>
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

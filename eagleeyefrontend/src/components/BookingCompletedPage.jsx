import React from 'react';
import { Row,Col } from 'react-bootstrap';

const BookingConfirmation = React.createClass({
    render : function(){
     return(
         <div className="bookingCompletedPage">
             <Row className="bookingPageHeaderRow">
                 <Col md={1} />
                 <Col md={2} className="bookingPageDescribeText">
                    Booking Confirmation
                 </Col>
                 <Col md={8} />
                 <Col md={1}>
                 <img src='Assets/homeIcon.png' className="bookingPageHomeButton" onClick={this.loadHome}/>
                 </Col>
             </Row>
             <Row className="bookingPageSecondRowPadding">
                 <Col md={2} />
                 <Col md={8}>
                 <div className="bookingPageMessage">
                     <img src='Assets/tickIconConfirmation.png' className="bookingPageConfirmationButton"/>
                     <span className="bookingPageConfirmTextSpan">Thanks.Your booking has been confirmed</span>
                 </div>
                 <div className="bookingPageSecondaryMessage">
                     <span className="bookingPageMessageTextSpan">See you on...</span>
                 </div>
                 <Row className="zeroMarginClass rowBackgroundDesign">
                 <Col md={6} className="bookingPageInnerFirstCol">
                 <img src='Assets/bookingPageCalendar.png' className="bookingPageCalenderConfig"/>
                 <span className="bookingPageDateSpan">07-08-2014</span>
                 </Col>
                 <Col md={6} className="bookingPageInnerFirstCol">
                 <img src='Assets/bookingPageTime.png' className="bookingPageCalenderConfig"/>
                 <span className="bookingPageDateSpan">slot1,slot2,slot1,slot2,slot1,slot2,slot1,slot2,</span>
                 </Col>
                </Row>
                 <Row className="zeroMarginClass rowBackgroundDesign">
                 <Col md={6} className="bookingPageInnerFirstCol">
                 <img src='Assets/footballCourtIcon2.png' className="bookingPageCalenderConfig"/>
                 <span className="bookingPageDateSpan">GroundA,GroundB</span>
                 </Col>
                 <Col md={6} className="bookingPageInnerFirstCol">
                 <img src='Assets/stadiumIcon1.png' className="bookingPageCalenderConfig"/>
                 <span className="bookingPageDateSpan">SportsBase</span>
                 </Col>
                </Row>

                 </Col>
                 <Col md={2} />
             </Row>
        </div>
     )   
    }
});

export default BookingConfirmation;
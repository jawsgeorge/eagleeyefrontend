import React from 'react';
import {Router, Route, Link, browserHistory, History} from 'react-router'
import {Grid,Row,Col,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';

var LocationPage = React.createClass({

contextTypes : {
        router: React.PropTypes.object
    },
     goSlotBooking : function(){
         // here we need to call a service which will provide the data for selected location.
         //  in that callback we need to set data in localStorage and route to slotbook
        this.context.router.push('/slotBook');
    },
    render(){
        return(

            <div className="citiesPage">
                <div className="headertxt">List of Locations avaliable</div>
                <div className ="citifont">
                    <Col md={4} onClick={this.goSlotBooking}>
                    <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore ITPL
                    </span>
                    </Col>
                    <Col  md={4} onClick={this.goSlotBooking}>
                      <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore EC
                    </span>
                    </Col>
                    <Col  md={4} onClick={this.goSlotBooking}>
                     <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore Sarjapur
                    </span>
                    </Col>
                
                </div>
                <div className ="citifont">
                    <Col md={4} onClick={this.goSlotBooking}>
                    <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore ITPL
                    </span>
                    </Col>
                    <Col  md={4} onClick={this.goSlotBooking}>
                      <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore EC
                    </span>
                    </Col>
                    <Col  md={4} onClick={this.goSlotBooking}>
                     <span className="wsqrscss"> 
                         <img className='sqrImg' src='Assets/wsqr.png'/>
                    </span>
                    <span>
                        Bangalore Sarjapur
                    </span>
                    </Col>
                
                </div>
            </div>
        )
    }
})

export default LocationPage;
import React from 'react';
import {Router, Route, Link, browserHistory, History} from 'react-router'
import {Grid,Row,Col,select, DropdownButton,NavbarHeader,NavbarBrand,NavDropdown,MenuItem} from 'react-bootstrap';
import axios from 'axios';

var LocationPage = React.createClass({

contextTypes : {
        router: React.PropTypes.object
    },
    getInitialState : function(){
        return{
            totalMasterGround  : []
        }
    },
     goSlotBooking : function(masterGroundId){
         // here we need to call a service which will provide the data for selected location.
         //  in that callback we need to set data in localStorage and route to slotbook
        let clickedMasterDetails = (this.state.totalMasterGround.filter((x) => x.masterGroundId == masterGroundId))[0];
        console.log("The corresponding ground detais ",clickedMasterDetails);
        let myNewCustomInfo = [];
        for(let i=0;i<clickedMasterDetails.grounds.length;i++){
            let newObj = {
                groundConfigCode : clickedMasterDetails.grounds[i].size,
                groundId : clickedMasterDetails.grounds[i].ground_id,
                groundName : clickedMasterDetails.grounds[i].groundName,
                MasterGroundId : clickedMasterDetails.masterGroundId,
                slots : []
            };
            myNewCustomInfo.push(newObj);
        }
        console.log("The custom format data is ",myNewCustomInfo);
        this.context.router.push({
                pathname : '/slotBook',
                state : {
                  slotDetails : myNewCustomInfo
                }
              })
        // this.context.router.push('/slotBook');
    },
    loadHome:function(){
        this.context.router.push('/homePage');
    },
    completeBack:function(){
        this.context.router.push('/homePage');
    },
    componentDidMount : function(){
        let _this = this;
        axios.get("http://localhost:8080/rest/eagleeye/getGroundByCity/Bangalore").then((response) => {
            console.log("The response received is ",response);
            _this.setState({
                totalMasterGround : response.data.mastergroundList
            })
            
        }).catch((err) => {
            _this.setState({
                totalMasterGround : []
            })
        });
    },
    render(){
        // let myrequiredArray = [1,2,3,4,5,6];
        let arr = [];
        for(let x=0;x<this.state.totalMasterGround.length;x++){
            arr.push(x);   
        }
        // let arr = this.state.totalMasterGround;
        let newArr = [];
        while(arr.length) newArr.push(arr.splice(0,4));
        console.log("The new arr is ",newArr);
        let myDisplayItem = 0;
        let outerArr = [];
        for(var i = 0; i < newArr.length; i++) {
            // console.log("THe array valye is",this.state.totalMasterGround[i])
            var cube = newArr[i];
            let innerArr = [];
            for(var j = 0; j < cube.length; j++) {
                // console.log("cube[" + i + "][" + j + "] = " + cube[j]);
                console.log("THe cube value is ",this.state.totalMasterGround[myDisplayItem]);
                let displayValue = this.state.totalMasterGround[myDisplayItem];
                innerArr.push(<Col md={2} onClick={this.goSlotBooking.bind(this,displayValue.masterGroundId)}><img className="bangloreListIcon" src={`Assets/fb10.png`} /><span className="cityListFirstSpan">{displayValue.masterGroundName.toLowerCase()}</span></Col>)
                myDisplayItem++;
                }
            outerArr.push(
                <Row className="customRowBottomPadding">
                <Col md={2} />
                {innerArr}
                </Row>
            )
        }
        return(
            <div className="citiesPage">
                <Row className="headerRowForSlotBooking">      
                 <Col md={2} className="slotBookHeaderText">
                    <img src='Assets/back5.png' className="genericBackIcon" onClick={this.completeBack}/>
                    <span className="locationHeaderText">Available locations</span>
                    <img src='Assets/logo.png' className="headerLogoDisplay"/>
                 </Col>
                 <Col md={8}>
                 </Col>
                    <Col md={2}>
                        <img src='Assets/homeIcon.png' className="genericTextContentWithoutText" onClick={this.loadHome}/>
                    </Col>
                </Row>
                {outerArr}
            </div>
        )
    }
})

export default LocationPage;
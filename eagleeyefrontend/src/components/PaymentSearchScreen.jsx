import React from 'react';
import GenericHeader from './GenericHeader.jsx';
import axios from 'axios';
import LoaderComponent from './LoaderComponent.jsx';
import ScrollArea from 'react-scrollbar';

let PaymentSearch = React.createClass({
    getInitialState : function(){
        return({
            searchBasedOn : 'default',
            searchContent : ''
        })
    },
    myDropDownEditSelect : function(){
        let selectedValue = this.refs.mySearchBoxSelectOption.value;
        this.setState({
        searchBasedOn : selectedValue
        })
    },
    fetchResults : function(){
        if(this.state.searchBasedOn == 'default'){
            alert("Kindly select the mode on which you want to search")
        }
        else{
        let key = this.state.searchBasedOn;
        let reqdObj = {}
        if(key == 'mobileNumber'){
            reqdObj.mobileNumber = this.state.searchContent
        }
        else{
            reqdObj.bookingReference = this.state.searchContent
        }
        
        console.log("Searching objec is ",reqdObj);
        axios.post("http://localhost:8080/rest/eagleeye/getBookedCustomer",reqdObj).then((response) => {
            console.log("The received values is ",response);
        }).catch((err) => {
            console.log("Error info is ",err);
        })
        }
    },
    searchValue : function(e){
        this.setState({
            searchContent : e.target.value
        })
    },
    render : function(){
        return(
            <div className="paymentSearchMain">
                <GenericHeader buttonText="" headerText="Custom Search" goToUrl="homePage" backUrl="homePage" />
                <div className="containerForSearchBox">
                <select className="searchScreenSelectBoxCustom" ref="mySearchBoxSelectOption" value={this.state.searchBasedOn} onChange={this.myDropDownEditSelect}>
                          <option value="default">Select Search Mode</option>
                          <option value="mobileNumber">Mobile Number</option>
                          <option value="bookingReference">Reference Number </option>
                </select>
                <br/>
                <br/>
                <br/>
                <input type="text" className="searchTextBox" placeholder="Search input ..." value={this.state.searchContent} onChange={this.searchValue.bind(this)}/>
               <div className="searchIconControllingDiv"> <img className="searchIconImageControl" src='Assets/searchIcon2.png' onClick={this.fetchResults} /> </div>
                </div>
            </div>
        )
    }
});

export default PaymentSearch;
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    browserHistory,
    hashHistory,
    IndexRoute
} from 'react-router'
import {Provider} from 'react-redux'
import Login from './Login.jsx';
import HomePage from './HomePage.jsx'
import store from '../js/store.js'
import Register from './Register.jsx'
import EventCal from "./EventCal.jsx" ;
import SlotMainPage from './slotBookMain.jsx'
import NewSlotBooking from './NewSlotBooking.jsx'
import LocationPage from './availableCities.jsx'
import UserListComponents from "./userList.jsx" ;
import RoleListComponents from './RoleList.jsx'
import AddCustomerInfo from './AddCustomerInfo.jsx';
// ForgotPassword
import ForgotPassword from './ForgotPassword.jsx';
import MyCustomLoader from './MyCustomLoader.jsx';
import GenericHeader from './GenericHeader.jsx';
import NewAddRole from './MyNewAddRole.jsx';
import PaymentSearch from './PaymentSearchScreen.jsx';
import BookingConfirmation from './BookingCompletedPage.jsx';
const CustomRouter = React.createClass({
    getChildContext : function(){
        return{
            loginURL : config.environment[ENV_SECTION].loginURL
        }
    },
    childContextTypes : {
        loginURL : React.PropTypes.string
    },
    render() {
        // console.log("Inside router return ",config.environment[ENV_SECTION.log])
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Login}></Route>
                    <Route path="/homePage" component={HomePage}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/slotLocation" component={LocationPage}></Route>
                    <Route path="/slotBook" component={NewSlotBooking}></Route>
                    <Route path="/userList" component={BookingConfirmation}></Route>
                    <Route path="/customerDetailForBooking" component={AddCustomerInfo}></Route>
                    <Route path="/forgotPasssword" component={ForgotPassword}></Route>
                    <Route path="/roleList" component={NewAddRole}></Route>
                </Router>
            </Provider>
        );
    }

});
export default CustomRouter;

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
import RoleLisiComponents from './RoleList.jsx'
import AddCustomerInfo from './AddCustomerInfo.jsx';

const CustomRouter = React.createClass({

    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Login}></Route>
                    <Route path="/homePage" component={HomePage}></Route>
                    <Route path="/register" component={UserListComponents}></Route>
                    <Route path="/slotLocation" component={LocationPage}></Route>
                    <Route path="/slotBook" component={NewSlotBooking}></Route>
                    <Route path="/adduser" component={AddCustomerInfo}></Route>
                </Router>
            </Provider>
        );
    }

});
export default CustomRouter;

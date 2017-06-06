import React from 'react';
import GenericHeader from './GenericHeader.jsx';
import axios from 'axios';
import LoaderComponent from './LoaderComponent.jsx';
import {Row,Col} from 'react-bootstrap';
import ScrollArea from 'react-scrollbar';

const NewAddRole = React.createClass({
    getInitialState: function(){
        return {
            presentRoleArray : [],
         myCustomRoleArray : [],
         addUserClick : false,
         addRoleClick : false,
         addSlotBookingClick : false,
         addPaymentDueClick : false,
         addNewRow : false,
         showLoader : true,
         onFocusedRole : '',
         newRoleName : '',
         addNewRoleName : '',
         addNewUserClick : false,
         addNewRoleClick : false,
         addNewSlotBookingClick : false,
         addNewPaymentDueClick : false,
        }
    },
    componentDidMount : function(){
        console.log("My get role url is ",this.context);
      let _this = this;
      axios.get("http://localhost:8080/rest/eagleeye/getRoles").then(function(response){
            // push to next page
            console.log("The response received is ",response);
            console.log("Role array whihc is omin is",JSON.stringify(response.data))
            let roleArr  = response.data;
        //     let roleArr = [
        //     {
        //     "role_id": 1,
        //     "roleName": "admin",
        //     "descrition": "admin",
        //     "menu": [
        //         {
        //         "menu_id": 1,
        //         "menuName": "AddRole"
        //         },
        //         {
        //         "menu_id": 2,
        //         "menuName": "configure"
        //         }
        //     ]
        //     },
        //     {
        //     "role_id": 2,
        //     "roleName": "executive",
        //     "descrition": "executive",
        //     "menu": [
        //         {
        //         "menu_id": 1,
        //         "menuName": "AddRole"
        //         },
        //         {
        //         "menu_id": 2,
        //         "menuName": "configure"
        //         }
        //     ]
        //     }
        // ];
            let myCustomArray = [];
        let defaultMenuIds = [1,2,3,4];
        for(let i=0;i<roleArr.length;i++){
            let customInfo={
                roleName : roleArr[i].roleName,
                roleId : roleArr[i].role_id
            }
            let menuArr =defaultMenuIds.map((zz) => {
                let findIfPresent = roleArr[i].menu.findIndex((x) => x.menu_id == zz);
                if(findIfPresent > -1){
                    return true;
                }
                else{
                    return false;
                }
            });
            customInfo.MenuArr = menuArr;
            myCustomArray.push(customInfo);
        }
        console.log("My final array which is generated is ",myCustomArray);
        _this.setState({
            presentRoleArray : roleArr,
                myCustomRoleArray : myCustomArray,
                showLoader : false
            })
          }).catch(function(error){
            // show error details 
            _this.setState({
            presentRoleArray : [],
            myCustomRoleArray : [],
            showLoader : false
            })
          });
    },
    updateFocusedId : function(roleId){
        let reqdObj = this.state.myCustomRoleArray.filter((x) => x.roleId == roleId)[0];
        console.log("THe clicked role obj is ",reqdObj);
        let presentMenuArr = reqdObj.MenuArr;


        this.setState({
            onFocusedRole : roleId,
            newRoleName : reqdObj.roleName,
            addUserClick : presentMenuArr[0],
         addRoleClick : presentMenuArr[1],
         addSlotBookingClick : presentMenuArr[2],
         addPaymentDueClick : presentMenuArr[3],
        })
    },
    addNewRoleChange : function(e){
        // console.log(e.target.value)
        this.setState({
            newRoleName : e.target.value
        })
    },
    newRoleNameChange : function(e){
        this.setState({
            addNewRoleName : e.target.value
        })
    },
    addNewRole : function(){
        
        this.setState({
        addNewRow : !this.state.addNewRow,
         addNewRoleName : '',
         addNewUserClick : false,
         addNewRoleClick : false,
         addNewSlotBookingClick : false,
         addNewPaymentDueClick : false,
        })
    },
    onRoleSelect : function(value){
        console.log("THis is clicked ",value);
         if(value == 1){
             this.setState({
                 addUserClick : !this.state.addUserClick
             })
         }
         else if(value == 2){
            this.setState({
                 addRoleClick : !this.state.addRoleClick
             })
         }
         else if(value == 3){
             this.setState({
                 addSlotBookingClick : !this.state.addSlotBookingClick
             })
         }
         else if(value == 4){
             this.setState({
                 addPaymentDueClick : !this.state.addPaymentDueClick
             })
         }
    },
    onRoleSelectForNewRole : function(value){
        console.log("THis is clicked ",value);
         if(value == 1){
             this.setState({
                 addNewUserClick : !this.state.addUserClick
             })
         }
         else if(value == 2){
            this.setState({
                 addNewRoleClick : !this.state.addRoleClick
             })
         }
         else if(value == 3){
             this.setState({
                 addNewSlotBookingClick : !this.state.addSlotBookingClick
             })
         }
         else if(value == 4){
             this.setState({
                 addNewPaymentDueClick : !this.state.addPaymentDueClick
             })
         }
    },
    render : function(){
        let _this = this;
        let finalArr = this.state.myCustomRoleArray.map((x) => {
            let singleRole = x;
            if(singleRole.roleId == this.state.onFocusedRole){
                return(
                    <tr className="roleListMainHeaderRow">
                        <td className="roleListRowCellNew"><input type="text" className="addRoleTextField" value={this.state.newRoleName} onChange={this.addNewRoleChange.bind(this)}/></td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,1)}>{this.state.addUserClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td> 
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,2)}>{this.state.addRoleClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,3)}>{this.state.addSlotBookingClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,4)}>{this.state.addPaymentDueClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew"> <span>Update</span> </td>
                        </tr>
                );
            }
            else{
                let rowArr=[];
                for(let m=0;m<x.MenuArr.length;m++){
                    if(x.MenuArr[m]){
                        rowArr.push(<td  className="roleListRowCellNewPage"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td>);
                    }
                    else{
                        rowArr.push(<td  className="roleListRowCellNewPage"></td>);
                    }
                }
                return(
                    <tr className="roleListSecondHeaderRow" onClick={_this.updateFocusedId.bind(this,x.roleId)}>
                            <td className="roleListRowCellNewPage">{x.roleName}</td>
                            {rowArr}
                            <td className="roleListRowCellNewPage"><img className="" src='Assets/Delete_Icon.png'/></td>
                    </tr>
                )
            }
        });
        return(
            <ScrollArea>
            <div className="roleconfigPage">
                {this.state.showLoader ? <LoaderComponent /> : ""}
                <GenericHeader buttonText="" headerText="List of Roles" goToUrl="homePage" backUrl="homePage" />
                <div className='addUserHeader' onClick={this.adduser}>
                        <Row>
                            <Col md={4}><div onClick={this.addNewRole} className="addRoleIconCol">
                                <img className="roleDividerAdd" src="../Assets/addUserForPayment3.png" onClick={this.checkForAddPaymentDivider} /> 
                                Add Role 
                            </div></Col>
                            <Col md={8} />
                        </Row>
                </div>
                {this.state.addNewRow ?
                    <table>
                        <thead>
                            <tr className="roleListMainHeaderRow">
                                <th className="roleListRowCellNewPage">Title</th>
                                <th className="roleListRowCellNewPage">Add User</th> 
                                <th className="roleListRowCellNewPage">Add Role</th>
                                <th className="roleListRowCellNewPage">Slot Booking</th>
                                <th className="roleListRowCellNewPage">Payment Due</th> 
                                <th className="roleListRowCellNewPage">EditOptions</th> 
                            </tr>
                        </thead>
                        <tbody>
                        <tr className="roleListMainHeaderRow">
                        <td className="roleListRowCellNew"><input type="text" className="addRoleTextField" value={this.state.addNewRoleName} onChange={this.newRoleNameChange.bind(this)}/></td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelectForNewRole.bind(this,1)}>{this.state.addNewUserClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td> 
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelectForNewRole.bind(this,2)}>{this.state.addNewRoleClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelectForNewRole.bind(this,3)}>{this.state.addNewSlotBookingClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelectForNewRole.bind(this,4)}>{this.state.addNewPaymentDueClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew"> <span>Add Role !</span> </td>
                        </tr>
                        </tbody>
                    </table>: ""}
            <table className="makingTablefull">
                <thead>
                    <tr className="roleListMainHeaderRow">
                        <th className="roleListRowCellNewPage">Title</th>
                        <th className="roleListRowCellNewPage">Add User</th> 
                        <th className="roleListRowCellNewPage">Add Role</th>
                        <th className="roleListRowCellNewPage">Slot Booking</th>
                        <th className="roleListRowCellNewPage">Payment Due</th> 
                        <th className="roleListRowCellNewPage">EditOptions</th> 
                    </tr>
                </thead>
                <tbody >
                    {finalArr}
                </tbody>
            </table>
            
            </div>
            </ScrollArea>
        )
    }
});

export default NewAddRole;
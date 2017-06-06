import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';
import GenericHeader from './GenericHeader.jsx';
import LoaderComponent from './LoaderComponent.jsx';
import ScrollArea from 'react-scrollbar';
import AddRoleComponent from './AddRoleModal.jsx';


let RoleListComponents = React.createClass({    
contextTypes : {
        router: React.PropTypes.object,
        loginURL : React.PropTypes.string,
        
    },
      getInitialState: function() {
    return {
         presentRoleArray : [],
         myCustomRoleArray : [],
         addUserClick : false,
         addRoleClick : false,
         addSlotBookingClick : false,
         addPaymentDueClick : false,
         addNewRow : false,
         showLoader : true
       }
  },
  componentDidMount : function(){
      console.log("My get role url is ",this.context);
      let _this = this;
      axios.get(this.context.getAllRoles).then(function(response){
            // push to next page
            console.log("The response received is ",response);
            console.log("Role array whihc is omin is",JSON.stringify(response.data))
            // let roleArr  = response.data;
            let roleArr = [
    {
      "role_id": 1,
      "roleName": "admin",
      "descrition": "admin",
      "menu": [
        {
          "menu_id": 1,
          "menuName": "AddRole"
        },
        {
          "menu_id": 2,
          "menuName": "configure"
        }
      ]
    },
    {
      "role_id": 2,
      "roleName": "executive",
      "descrition": "executive",
      "menu": [
        {
          "menu_id": 1,
          "menuName": "AddRole"
        },
        {
          "menu_id": 2,
          "menuName": "configure"
        }
      ]
    }
  ];
            let myCustomArray = [];
  let defaultMenuIds = [1,2,3,4];
  for(let i=0;i<roleArr.length;i++){
    let customInfo={
        roleName : roleArr[i].roleName
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
    addNewRole : function(){
        
        this.setState({
            addNewRow : !this.state.addNewRow,
            addUserClick : false,
         addRoleClick : false,
         addSlotBookingClick : false,
         addPaymentDueClick : false,
         newRoleName : '',
         newRoleDescrition :''
        })
    },
    addNewRoleChange : function(e){
        // console.log(e.target.value)
        this.setState({
            newRoleName : e.target.value
        })
    },
    addNewDescriptionChange : function(e){
          this.setState({
            newRoleDescrition : e.target.value
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
    saveNewRole : function(){
        // addUserClick : false,
        //  addRoleClick : false,
        //  addSlotBookingClick : false,
        //  addPaymentDueClick : false,
        //  newRoleName : ''
        this.setState({
            showLoader : true
        })
        let mapOne = new Map();
        mapOne.set(1,this.state.addUserClick);
        mapOne.set(2,this.state.addRoleClick);
        mapOne.set(3,this.state.addSlotBookingClick);
        mapOne.set(4,this.state.addPaymentDueClick);
        let myFinalArr = [];
        for (let [key, value] of mapOne.entries()) {
            console.log(key, value);
            if(value){
                myFinalArr.push({menu_id : key})
            }
        }

        let myFullRoleObj = {
            roleName : this.state.newRoleName,
            description : this.state.newRoleDescrition,
            menu : myFinalArr
        }

        console.log("My Final Role obj is ",JSON.stringify(myFullRoleObj));
        axios.post("http://localhost:8080/rest/eagleeye/addRole",myFullRoleObj).then((Response) => {
            console.log("THe save role response is ",response.data);
            this.setState({
                showLoader : false
            })
        }).catch((err) => {

        })
    },
    render : function(){
        console.log("The role add us",this.state.addNewRow);
        return(
                <ScrollArea>
                    <AddRoleComponent />
                <div className="roleconfigPage">
                    {this.state.showLoader ? <LoaderComponent /> : ""}
                    <GenericHeader buttonText="" headerText="List of Roles" goToUrl="homePage" backUrl="homePage" />
                    <div className='addUserHeader' onClick={this.adduser}>
                        <Row>
                            <Col md={2} />
                            <Col md={4}><div onClick={this.addNewRole} className="addRoleIconCol">
                                <img className="roleDividerAdd" src="../Assets/addUserForPayment3.png" onClick={this.checkForAddPaymentDivider} /> 
                                Add Role 
                            </div></Col>
                            <Col md={6} />
                        </Row>
                     </div>

                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={8}>
                        {this.state.addNewRow ? <div>
                   <div onClick={this.saveNewRole} className="mySaveRoleCustom"> Save Role </div>
                    <table className="makingTablefull">
                        <tr className="roleListEditHeaderRow">
                        <th className="roleListRowCellHeader">Title</th>
                        <th className="roleListRowCellHeader">Add User1</th> 
                        <th className="roleListRowCellHeader">Add Role</th>
                        <th className="roleListRowCellHeader">Slot Booking</th>
                        <th className="roleListRowCellHeader">Payment Due</th> 
                        </tr>
                        <tr className="roleListMainHeaderRow">
                        <td className="roleListRowCellNew"><input type="text" className="addRoleTextField" value={this.state.newRoleName} onChange={this.addNewRoleChange.bind(this)}/></td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,1)}>{this.state.addUserClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td> 
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,2)}>{this.state.addRoleClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,3)}>{this.state.addSlotBookingClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        <td  className="roleListRowCellNew" onClick={this.onRoleSelect.bind(this,4)}>{this.state.addPaymentDueClick ? <img  className="selectedIconEdit" src='Assets/newTick.png'/> : ""}</td>
                        
                    </tr>
                    </table> </div>: ""}
                        <table className={this.state.addNewRow ? "myListRoleTable" : ""}>
                    <tr className="roleListMainHeaderRow">
                        <th className="roleListRowCell">Title</th>
                        <th className="roleListRowCell">Add User1</th> 
                        <th className="roleListRowCell">Add Role</th>
                        <th className="roleListRowCell">Slot Booking</th>
                        <th className="roleListRowCell">Payment Due</th> 
                    </tr>
                    <tr className="roleListSecondHeaderRow">
                        <td className="roleListRowCell">Administrator</td>
                        <td  className="roleListRowCell"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td> 
                        <td  className="roleListRowCell"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td>
                        <td  className="roleListRowCell"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td>
                        <td  className="roleListRowCell"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td>
                    </tr>
                    {this.state.myCustomRoleArray.map((x) => {
                        
                        let rowArr=[];
                        for(let m=0;m<x.MenuArr.length;m++){
                            if(x.MenuArr[m]){
                                rowArr.push(<td  className="roleListRowCell"><img  className="selectedIconEdit" src='Assets/newTick.png'/></td>);
                            }
                            else{
                                rowArr.push(<td  className="roleListRowCell"></td>);
                            }
                        }
                        return(
                            <tr className="roleListSecondHeaderRow">
                                <td className="roleListRowCell">{x.roleName}</td>
                                {rowArr}
                            </tr>
                     );
                    })}
                    </table>

                        </Col>
                        <Col md={2} />
                    </Row>  
                </div>
                </ScrollArea>
        )
    }
})
export default RoleListComponents;
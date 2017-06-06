import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';
import GenericHeader from './GenericHeader.jsx';
import LoaderComponent from './LoaderComponent.jsx';
import ScrollArea from 'react-scrollbar';

let RoleListComponents = React.createClass({
contextTypes : {
        router: React.PropTypes.object,
        loginURL : React.PropTypes.string
    },
    getInitialState: function() {
    return {
         presentRoleArray : [],
         myCustomRoleArray : []
       }
  },
  componentDidMount : function(){
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
  this.setState({
       presentRoleArray : roleArr,
       myCustomRoleArray : myCustomArray,
         
  })
  },
  render : function(){
      return(
          <div className="roleconfigPage">
              <GenericHeader buttonText="" headerText="List of Roles" goToUrl="homePage" backUrl="homePage" />
              
        </div>
      )
  }
});

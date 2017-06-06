import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import GenericHeader from './GenericHeader.jsx'
import axios from 'axios';
import {grey100, blue500 ,lightGreen300,lightGreen100,darkWhite,teal700,tealA400} from 'material-ui/styles/colors';
import ScrollArea from 'react-scrollbar';

let UserListComponents = React.createClass({

contextTypes : {
        router: React.PropTypes.object
    },

     getInitialState: function() {
    return {
         arr : []
       }
  },
  
  componentDidMount : function(){
      let _this = this;
    axios.get("http://localhost:8080/rest/eagleeye/getusers").then(function(response){
        console.log("The server user list details are ",response.data);
        _this.setState({arr: response.data});
    }).catch(function(err){
        _this.setState({
            arr : []
        })
    });
  },
  adduser : function(){
      this.context.router.push('/register');
  },
    render : function(){
        console.log("THe arra after coing is ", this.state.arr)
        return (
            <ScrollArea>
            <div className="roleconfigPage">
            <GenericHeader buttonText="Add User" headerText="List of Users" goToUrl="register" backUrl="homePage" />
                  <div  className="userListTable">
                
                <Table>
                    <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow style={{background :teal700,color : darkWhite }}>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn style={{color : "white"}}>User Name</TableHeaderColumn>
                        <TableHeaderColumn style={{color : "white"}}>Email Id</TableHeaderColumn>
                        <TableHeaderColumn style={{color : "white"}}>Role Name</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}  showRowHover={true} 
                     stripedRows={false} style={{background :tealA400 }} >
                     {this.state.arr.map( data => {
                         return (
                        <TableRow>
                        <TableRowColumn><img src='Assets/userdisplayicon.png' className="userDisplayWidth" /></TableRowColumn>
                        <TableRowColumn>{data.userName}</TableRowColumn>
                        <TableRowColumn>{data.email}</TableRowColumn>
                        <TableRowColumn>
                            <span>{data.role.description}</span>
                            
                        </TableRowColumn>
                    </TableRow>
                         )
                     })}
                    </TableBody>
                </Table>
                
                </div>
            </div>
            </ScrollArea>
        )
    }

});


export default UserListComponents;  
//<img className="deleteIconClass" src='Assets/Delete_Icon.png'/>
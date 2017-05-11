import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



let UserListComponents = React.createClass({

contextTypes : {
        router: React.PropTypes.object
    },

     getInitialState: function() {
    return {
         listArr : ["22","ww"]   ,
         arr : JSON.parse(localStorage.getItem("lisData")) 
       }
  },
  
  componentWillMount() {
   this.setState({
       arr : JSON.parse(localStorage.getItem("lisData")) 
   });   
  },
  
    contextTypes : {
    router: React.PropTypes.object
  },
  adduser : function(){
      this.context.router.push('/adduser');
  },
    render : function(){

        return (
            <div>
                <div className='addUserHeader' onClick={this.adduser}>
                    List of Registered Users
                    <img className="addicon" src='Assets/ddd.png'/>
                    <span className='addText'>Add user</span>
                </div>
              { this.state.listArr.length > 1 ? 

                <Table >
                    <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn>Fisrt Name</TableHeaderColumn>
                        <TableHeaderColumn>Email Id</TableHeaderColumn>
                        <TableHeaderColumn>Mobile No</TableHeaderColumn>
                        <TableHeaderColumn>Base Location</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}  showRowHover={true} 
                     stripedRows={true}>
                     {this.state.arr.map( data => {
                         return (
                        <TableRow>
                        <TableRowColumn><img src='Assets/userdisplayicon.png' className="userDisplayWidth" /></TableRowColumn>
                        <TableRowColumn>{data.fname}</TableRowColumn>
                        <TableRowColumn>{data.lname}</TableRowColumn>
                        <TableRowColumn>{data.mobno}</TableRowColumn>
                        <TableRowColumn>
                            <span>{data.loc}</span>
                            <img className="deleteIconClass" src='Assets/Delete_Icon.png'/>
                        </TableRowColumn>
                    </TableRow>
                         )
                     })}
                    
                    </TableBody>
                </Table>

              : ""

              }
            </div>
        )
    }

});


export default UserListComponents;  
import React from 'react';
import ReactDOM from 'react-dom';
var Loader = require('halogen/RiseLoader');

var LoaderComponent = React.createClass({


   render : function() {
       return (
           <div className="loaderMain">
           <div className="loaderwrapper">
          <Loader color="#1c80d6" size="20px" margin="4px"/>
          </div>
          </div>
       );
   } 
})

export default LoaderComponent;
import axios from 'axios'



export function getLoginData(userName,password){   
  var loginReq = {
    "userName": userName,
    "password": password,
     "type": "login"
    }
var testAdfs = {
  // "emailId":"barath.r98@wipro.com","type":"login"
}
  return function(dispatch){
       dispatch({type:"LoginRequested"})
      console.log(loginReq);
      axios.post("http://10.200.204.60:8080/requestprocessor",testAdfs,
      {headers:{"Content-Type":"application/json"}}
     ).then((response) => {
    console.log("loginResponse",response);
    dispatch({type: "LoginSuccess"})
        })
        .catch((err) => {
          console.log("error in login call");
        //  dispatch({type: "LoginFailed"})
        })
  }
}

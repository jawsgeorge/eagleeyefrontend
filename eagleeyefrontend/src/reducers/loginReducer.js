export default function reducer(state = {
  login:[],
  fetching : false,
  fetched : false,

},action){

 switch(action.type){
   case "LoginSuccess" :{
     return {...state, fetched : true,fetching:false};
   }
   case "LoginFailed" :{
     return {...state, fetched : false,fetching:false };
   }
   case "LoginRequested" : {
     return {...state, fetching : true,fetched : false };
   }
 }
 return state;
}

import { combineReducers } from 'redux';
import { USERTOKEN } from "../constants/userTokenConstants";


function getToken(){

    if (typeof window !== 'undefined') {
      const tokenString = localStorage.getItem('token');
    //   const userToken = JSON.stringify(tokenString);
      return tokenString;
    }


}

const initialState = {
    token:null
}



const tokenReducer = (state=initialState,action)=>{

    switch (action.type) {
        case USERTOKEN:
            return{
                ...state,
                token: getToken()
            }
            
        default:
            return state;
    }
}

const userTokenReducer = combineReducers({
    userToken: tokenReducer,
});

export default userTokenReducer;
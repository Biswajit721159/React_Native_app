import { useEffect } from 'react';
import {Add_User_To_Localstorage} from './containts';
import AsyncStorage from '@react-native-async-storage/async-storage';



const intitializestateforuser=null
async function loaduser ()
{
  // intitializestateforuser=await AsyncStorage.getItem('user');
  console.log("intitializestateforuser ",intitializestateforuser)
}

export const reduceruser = async(state = intitializestateforuser, action) => {
    console.log("action is come in reducer  ",action)
    loaduser(intitializestateforuser)
    // await AsyncStorage.setItem('user', action.data);
    return action.data;
    // switch (action.type) 
    // {
    //   case Add_User_To_Localstorage:
    //      loaduser(intitializestateforuser)
    //      await AsyncStorage.setItem('user', action.data);
    //      return action.data;
    //   default:
    //     return state;
    // }
};

import React  , {useContext, useEffect, useState}from "react"
import { View,Text,Button ,StyleSheet,ActivityIndicator} from "react-native"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleing from "./style";
import { Context } from "../App";



const Profile=()=>{
    
    const navigation =useNavigation()
    const contextdata = useContext(Context)
    const [user,setuser]=useState([])
    const [load,setload]=useState(true)

    async function loadproduct()
    {
        setload(true)
        data=await AsyncStorage.getItem('user')
        data=JSON.parse(data)
        setuser(data)
        setload(false)
    }

    async function logout()
    {
        contextdata.removeuser();
    }

    function Myorder()
    {
        navigation.navigate('MyOrder')
    }
    useEffect(()=>{
        loadproduct()
    },[])

    return(
        <>
        {
            load==true?
            <ActivityIndicator
            style={styleing.loader}
            size="large"
            color="#00ff00"
            />
           :
           <>
               {user!=null ?<Text style={styleprofile.text}>Welcome {user.user.name}</Text>:""}
               {/* <View style={styleprofile.box}>
                    <Text style={styleprofile.item}>Box1</Text>
                    <Text style={styleprofile.item}>Box1</Text>
                    <Text style={styleprofile.item}>Box1</Text>
                    <Text style={styleprofile.item}>Box1</Text>
                    <Text style={styleprofile.item}>Logout</Text>
               </View> */}
                <View style={styleprofile.form}>
                    <Button style={styleprofile.button} onPress={Myorder} title="My Order"/>
                    <Button style={styleprofile.button} onPress={logout} title="Logout"/>
                </View>
            </>
        }
        </>
    )
}

const styleprofile=StyleSheet.create({
    box:{
        flex:1,
        flexDirection:'row',
        // height:100,
        // width:100,
        flexWrap:"wrap",
        justifyContent:'space-between',
        textAlign:"center",
         margin:10,
    },
    item:{
        backgroundColor:"black",
        textAlign:"center",
        color:"green",
        height:100,
        width:100,
        marginTop:10,
    },
    text:{
        color:"green",
        textAlign:"center",
        fontSize:20,
    },
    form:{
        flex:1,
        justifyContent:"center",
        margin:100,
    },
    button:{
        marginTop:100,
    }
})
export default Profile
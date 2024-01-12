import React, { useEffect, useState ,useContext } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Context} from '../App'

import styleing from './style'

const Login=()=>{

    const contextdata = useContext(Context)

    const navigation =useNavigation()

    const [email, setemail] = useState("")
    const [password,setpassword]=useState("")
    const [wronguser,setwronguser]=useState(false)
    const [button,setbutton]=useState("Submit")
    const [disabled,setdisabled]=useState(false)

    const storeData = async (value) => {
        const jsonValue = JSON.stringify(value);
        contextdata.myFunction(jsonValue)
    };

    const show = () => {
        setwronguser(false)
        setbutton("Please Wait .... ")
        setdisabled(true)
        fetch('https://backend-chicken.vercel.app/login',{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
               email:email,password:password
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            if(result.auth)
            {
                delete result.status
                storeData(result)
            }
            else{
                setbutton("Submit")
                setdisabled(false)
                setwronguser(true)
            }
        },(error)=>{
            setbutton("Submit")
            setdisabled(false)
            setwronguser(true)
        })
    }

  
    return(
        <>
            <Text style={styleing.text}>Login</Text>
             <View style={styleing.form}>
                    <TextInput 
                        style={styleing.input} 
                        placeholder='Enter Your  Email' 
                        value={email} 
                        onChangeText={(e) => setemail(e)} 
                        placeholderTextColor="green"
                    />
                    <TextInput 
                       secureTextEntry={true} 
                        style={styleing.input} 
                        placeholder='Enter Your  Password' 
                        value={password} 
                        onChangeText={(e) => setpassword(e)}
                        placeholderTextColor="green" 
                    />
                    {
                        wronguser==true?<Text style={{color:"red" ,marginBottom:10,textAlign:"center"}}>*Invalid User</Text>:""
                    }
                    <Button onPress={() => show()} disabled={disabled} title={button} />
             </View>
        </>
    )
}
export default Login
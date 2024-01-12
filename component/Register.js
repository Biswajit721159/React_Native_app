import React, { useEffect, useState ,useContext} from 'react';
import { View, Text, Button, TextInput ,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleing from './style'
import { useNavigation } from '@react-navigation/native';

import {Context} from '../App'

const Register=()=>{


    const contextdata = useContext(Context)

    const navigation =useNavigation()

    const [name, setname] = useState("")
    const [boolname,setboolname]=useState(false)
    const [messname,setmessname]=useState("")

    const [phone, setphone] = useState("")
    const [boolphone,setboolphone]=useState(false)
    const [messphone,setmessphone]=useState("")

    const [email, setemail] = useState("")
    const [boolemail,setboolemail]=useState(false)
    const [messemail,setmessemail]=useState("")

    const [password,setpassword]=useState("")
    const [boolpassword,setboolpassword]=useState(false)
    const [messpassword,setmesspassword]=useState("")
    const [messuserAlreadyPresent,setmessuserAlreadyPresent]=useState("");
    const [booluserAlreadyPresent,setbooluserAlreadyPresent]=useState("");

    const [button,setbutton]=useState("Register")
    const [disabled,setdisabled]=useState(false)


    const api="https://backend-chicken.vercel.app/";


    function checkforname(s)
    {
        setboolname(false)
        setmessname("")
        var regex = /^[a-zA-Z ]{2,30}$/;
        let a= regex.test(s);
        if(a==false)
        {
            setboolname(true)
            setmessname("*Name must be only string and should not contain symbols or numbers")
        }
        return a;
    }

    function checkforemailid(s)
    {
        setboolemail(false)
        setmessemail("")
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let a= regex.test(s);
        if(a==false)
        {
            setboolemail(true)
            setmessemail("*Email Address must be in valid formate with @ symbol")
        }
        return  a;
    }

    function checkpassword(s)
    {
        setboolpassword(false)
        setmesspassword("")
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let a= regex.test(s);
        if(a==false)
        {
            setboolpassword(true)
            setmesspassword("*Password must have at least one Uppercase, lowercase, digit, special characters & 8 characters")
        }
        return a;
    }

    function checkphoneNumber(s)
    {
        setboolphone(false)
        setmessphone("")
        if(s.length<=5)
        {
            setboolphone(true)
            setmessphone("Phone number is vary Less")
            return false;
        }
        else if(s.length!=10)
        {
            setboolphone(true)
            setmessphone("Phone number Must be 10 Digit")
            return false;
        }
        else 
        {
            for(let i=0;i<s.length;i++)
            {
                if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') )
                {
                    setboolphone(true)
                    setmessphone("Phone number Must be Contain 10 Digit")
                    return false;
                }
                else
                {
                   continue;
                }
            }
            return true;
        }
    }




    const storeData = async (value) => {
        const jsonValue = JSON.stringify(value);
        contextdata.myFunction(jsonValue)
    };

    const submit = async () => {
        let a=checkforname(name)
        let b=checkforemailid(email)
        let c=checkpassword(password)
        let d=checkphoneNumber(phone)
        if(a && b && c && d)
        {
            setbutton("Please Wait....")
            setdisabled(true)
            fetch(`${api}/register`,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        name:name,
                        email:email,
                        phone:phone,
                        password:password,
                    })
                })
                .then(response=>response.json())
                .then((result)=>{
                    if(result.status!=undefined && result.status==300)
                    {
                        setbooluserAlreadyPresent(true)
                        setmessuserAlreadyPresent(result.message)
                        setdisabled(false)
                        setbutton("Register")
                    }
                    else if(result.user!=undefined && result.auth!=undefined)
                    {
                        delete result.status
                        storeData(result)
                        // navigation.navigate('Product')
                    }
                    else
                    {
                        setbutton("Submit")
                        setdisabled(false)
                    }
                })
        }
    }
  
  
    return(
        <ScrollView>
            <Text style={styleing.text}>Register</Text>
           <View  style={styleing.form}>
            <TextInput 
                    style={styleing.input} 
                    placeholder='Enter Your Name' 
                    value={name} 
                    onChangeText={(e) => setname(e)} 
                    placeholderTextColor="green"
                />
                {boolname?<Text style={{color:"red"}}>{messname}</Text>:""}
                <TextInput 
                    style={styleing.input} 
                    placeholder='Enter Your Phone Number' 
                    keyboardType="numeric"
                    value={phone} 
                    onChangeText={(e) => setphone(e)} 
                    placeholderTextColor="green"
                />
                {boolphone?<Text style={{color:"red"}}>{messphone}</Text>:""}
                <TextInput 
                    style={styleing.input} 
                    placeholder='Enter Your  Email' 
                    value={email} 
                    onChangeText={(e) => setemail(e)} 
                    placeholderTextColor="green"
                />
                {boolemail?<Text style={{color:"red"}}>{messemail}</Text>:""}
                <TextInput 
                    secureTextEntry={true} 
                    style={styleing.input} 
                    placeholder='Enter Your  Password' 
                    value={password} 
                    onChangeText={(e) => setpassword(e)} 
                    placeholderTextColor="green"
                />
                {boolpassword?<Text style={{color:"red"}}>{messpassword}</Text>:""}
                <Button onPress={() => submit()} title={button} disabled={disabled}  />
                {booluserAlreadyPresent?<Text style={{color:"red",marginTop:10}}>{messuserAlreadyPresent}</Text>:""}
           </View>
        </ScrollView>
    )
}
export default Register
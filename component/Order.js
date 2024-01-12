import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleing from './style';
import { useNavigation } from '@react-navigation/native';


const Order = (props) => {
  const [user, setuser] = useState([]);
  const [load, setload] = useState(true);
  const [cart,setcart]=useState([])

  async function loaduser() {
    setload(true);
    let user = await AsyncStorage.getItem('user');
    user=JSON.parse(user)
    setuser(user);
    setload(false);
  }
  async function loadcart()
  {
    let data=await AsyncStorage.getItem('cart');
    data=JSON.parse(data)
    setcart(data)
  }

  useEffect(() => {
    loaduser();
    loadcart()
  }, []);


  const navigation =useNavigation()
  const [name, setname] = useState('');
  const [boolname, setboolname] = useState(false);
  const [messname, setmessname] = useState('');

  const [phone, setphone] = useState('');
  const [boolphone, setboolphone] = useState(false);
  const [messphone, setmessphone] = useState('');

  const [address1, setaddress1] = useState('');
  const [booladdress1, setbooladdress1] = useState(false);
  const [messaddress1, setmessaddress1] = useState('');

  const [address2, setaddress2] = useState('');
  const [booladdress2, setbooladdress2] = useState(false);
  const [messaddress2, setmessaddress2] = useState('');

  const [pin, setpin] = useState('');
  const [boolpin, setboolpin] = useState(false);
  const [messpin, setmesspin] = useState('');


  const [button, setbutton] = useState('Order');
  const [disabled, setdisabled] = useState(false);

  function findName()
  {
      setboolname(false)
      setmessname("")
      var regex = /^[a-zA-Z ]{2,30}$/;
      let a= regex.test(name);
      if(a==false)
      {
          setboolname(true)
          setmessname("*Name must be only string and should not contain symbols or numbers")
      }
      return a;
  }
  function findphone()
  {
    setboolphone(false)
    setmessphone("")
    let s=phone;
    if(s.length<=5)
    {
        setboolphone(true)
        setmessphone("*Phone number is vary Less")
        return false;
    }
    else if(s.length!=10)
    {
        setboolphone(true)
        setmessphone("*Phone number Must be 10 Digit")
        return false;
    }
    else 
    {
        for(let i=0;i<s.length;i++)
        {
            if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') )
            {
                setboolphone(true)
                setmessphone("*Phone number Must be Contain 10 Digit")
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
  function findpincode()
  {
    setboolpin(false)
    setmesspin("")
    if(pin<=999999 && pin>=111111)
    {
      return true;
    }
    else
    {
      setboolpin(true)
      setmesspin("Wrong Pin code")
      return false;
    }
  }
  function findaddress1()
  {
    setbooladdress1(false)
    setmessaddress1("")
    
    if(address1.length<=10)
    {
      setbooladdress1(true)
      setmessaddress1("*Provide a Valid Address")
      return false;
    }
    else
    {
      return true;
    }
  }
  function findaddress2()
  {
    setbooladdress2(false)
    setmessaddress2("")
    if(address2.length<=10)
    {
      setbooladdress2(true)
      setmessaddress2("*Provide a Valid Address")
      return false;
    }
    else
    {
      return true;
    }
  }
  function FindError()
  {
     let ans=true;
     ans=ans&findName();
     ans=ans&findphone();
     ans=ans&findpincode();
     ans=ans&findaddress1();
     ans=ans&findaddress2();
     if(ans==true){
        return true;
     }
     else{
        return false;
     } 
  }

  function submit() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let address={
      name:name,
      phone:phone,
      pincode:pin,
      address1:address1,
      address2:address2,
    }
    if(FindError())
    {
       fetch('https://backend-chicken.vercel.app/pushorder',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify({
              cart:cart,
              email:user.user.email,
              date:currentDate,
              address:address,
              cost:props.route.params.cost
          })
       }).then(responce=>responce.json()).then((res)=>{
          if(res.status==200)
          {
            navigation.navigate('MyOrder')
          }
       },(error)=>{
          console.log(error)
       })
    }
  }

  return (
    <View>
      {load == true ? (
        <ActivityIndicator
          style={styleing.loader}
          size="large"
          color="#00ff00"
        />
      ) : (
        <ScrollView>
          <Text style={styleOrder.text}>*Cash On Delivary Only Available</Text>
          <View style={styleOrder.form}>
            <TextInput
              style={styleOrder.input}
              placeholder="Enter Your Name"
              value={name}
              onChangeText={e => setname(e)}
              placeholderTextColor="black"
            />
            {boolname ? <Text style={{color: 'red'}}>{messname}</Text> : ''}


            <TextInput
              style={styleOrder.input}
              placeholder="Enter Your Phone Number"
              keyboardType="numeric"
              value={phone}
              onChangeText={e => setphone(e)}
              placeholderTextColor="black"
            />
            {boolphone ? <Text style={{color: 'red'}}>{messphone}</Text> : ''}

            <TextInput
              style={styleOrder.input}
              placeholder="Enter Your Pin code"
              keyboardType="numeric"
              value={pin}
              onChangeText={e => setpin(e)}
              placeholderTextColor="black"
            />
            {boolpin ? <Text style={{color: 'red'}}>{messpin}</Text> : ''}

            <TextInput
              style={styleOrder.input}
              placeholder="Enter Your Address 1"
              value={address1}
              onChangeText={e => setaddress1(e)}
              placeholderTextColor="black"
              rows={2}
              cols={50}
            />
            {booladdress1 ? <Text style={{color: 'red'}}>{messaddress1}</Text> : ''}

            <TextInput
              style={styleOrder.input}
              placeholder="Enter Your Address 2"
              value={address2}
              onChangeText={e => setaddress2(e)}
              placeholderTextColor="black"
              rows={2}
              cols={50}
            />
            {booladdress2 ? <Text style={{color: 'red'}}>{messaddress2}</Text> : ''}


            <Button
              onPress={() => submit()}
              title={button}
              disabled={disabled}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};


const styleOrder = StyleSheet.create({
  text:{
    textAlign:"center",
    color:"black",
    fontSize:18,
    margin:20
  },
  Text: {
    color: 'black',
    textAlign: 'center',
  },
  form:{
    marginLeft:'10%',
    marginRight:'10%',
  },
  input:{
    color:"black",
    marginTop:3,
    marginBottom:10,
    borderWidth:1,
    borderRadius:8,
    padding:8
  },
});


export default Order;

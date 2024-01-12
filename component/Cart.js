import React, { useEffect, useState , useContext  } from "react";
import { Text,ActivityIndicator,FlatList,View,Button,ImageBackground,TouchableOpacity, Style, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleing from "./style"
import {Context} from '../App'
import { useNavigation } from '@react-navigation/native';

const Cart = () =>{

  const navigation =useNavigation()
  const [cart,setcart]=useState([])
  const [load,setload]=useState(true)
  const contextdata = useContext(Context)
  const [data,setdata]=useState([])
  const [cost,setcost]=useState(0)

  useEffect(()=>{
    loadcart()
  },[contextdata])

  async function loadproduct(data)
  {
      let arr=[]
      for(let i=0;i<data.length;i++)
      {
        arr.push(data[i].product_id)
      }
     setload(true)
     fetch('https://backend-chicken.vercel.app/getproduct',{
        method:'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
          "product_ids":arr
        })
     }).then(responce=>responce.json()).then((res)=>{
        setdata(res)
        if(res.length!=0 )
        {
          findcost(data,res)
        }
        setload(false)
     },(error)=>{
      console.log(error)
     })
  }

  async function loadcart()
  {
      let data=await AsyncStorage.getItem('cart');
      if(data!=null)
      {
        data=JSON.parse(data)
        setcart(data)
      }
      if(data.length!=0)
      {
        loadproduct(data)
      }
      else
      {
        setload(false)
      }
  }

  function Alreadypresent(id)
    {
      for(let i=0;i<cart.length;i++)
      {
        if(cart[i].product_id==id)
        {
          return i;
        }
      }
      return -1
  }

  async function removetocart(id){
    let ans=Alreadypresent(id)
    cart.splice(ans,1);
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    setcart([...cart])
    contextdata.loadcart()
  }

  async function increment(id)
  {
    let index=Alreadypresent(id);
    if(cart[index].product_count<5)
    {
        cart[index].product_count+=1;
        setcart([...cart])
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        findcost(cart,data)
    }
  }

  async function decrement(id)
  {
    let index=Alreadypresent(id);
    if(cart[index].product_count>1)
    {
      cart[index].product_count-=1;
      setcart([...cart])
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      findcost(cart,data)
    }
  }

  function findcost(cart,data)
  {
     let ans=0;
     for(let i=0;i<cart.length;i++)
     {
        for(let j=0;j<data.length;j++)
        {
           if(cart[i].product_id==data[j]._id)
           {
              ans+=(((data[j].price)-((data[j].price*data[j].offer)/100))*(cart[i].product_count))
           }
        }
     }
     setcost(ans)
  }

  const renderItem = ({item,ind}) => {
    return (
      <View key={ind} style={styleing.cart}>
          <View style={{flex:1,justifyContent:"center",margin:15}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
                  <ImageBackground
                      style={{width: 100, height: 100 ,borderRadius:5}}
                      source={{uri: item.product_url}}
                    >
                    <Text style={{backgroundColor:"orange",color:"black"}}>{item.offer}% OFF</Text>
                  </ImageBackground>
                  <TouchableOpacity>
                     <Text onPress={()=>removetocart(item._id)} style={{color:"red"}}>Remove</Text>
                  </TouchableOpacity>
            </View>
            <Text style={{fontSize:16,color:"black"}}>{item.product_name} ({item.quantity})</Text>
            <View style={styleing.fixeditem}>
              <Text style={{color:"green",fontSize:16}}>₹{(item.price-((item.price*item.offer)/100)).toFixed(2)}</Text>
            </View>
            <View style={styleing.fixeditem}>
              <Button onPress={()=>decrement(item._id)} title="Cut"/>
              {
                cart.map((data,index)=>(
                  data.product_id==item._id?
                  <Text key={index} style={{marginTop:10 ,color:"green",fontSize:20}}>{data.product_count}</Text>
                  :""
                ))
              }
              <Button onPress={()=>increment(item._id)} style={{backgroundColor:"red"}} title="Add"/>
            </View>
          </View>
      </View>
    );
  };

  function Order()
  {
    navigation.navigate('Order',{cost:cost})
  }

    return(
        <>
          {
            load==true?<ActivityIndicator style={styleing.loader} size="large" color="#00ff00" />
            :
            cart.length==0?<Text style={stylecart.colorsheet}>No Item is present</Text>
            :
            <>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
                <View style={stylecart.FooterComponent}>
                  <View>
                    {
                      data.map((item,ind)=>(
                        cart.map((cartdata,index)=>(
                           cartdata.product_id==item._id?
                           <Text style={stylecart.colorsheet} key={ind}>{item.product_name}  X {cartdata.product_count} = {((item.price)-((item.price*item.offer)/100))*cartdata.product_count}</Text>
                           :""
                        ))
                      ))
                    }
                  </View>
                  <View>
                    <Text style={stylecart.colorsheet}>Total</Text>
                    <Text style={stylecart.colorsheet}>₹ {cost}</Text>
                  </View>
                </View>
                <TouchableOpacity style={stylecart.button} >
                  <Text onPress={Order} style={stylecart.text} >Buy Now</Text>
               </TouchableOpacity>
            </>
          }
        </>
    )
}


const stylecart=StyleSheet.create({
  button:{
    height:30,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    margin: 50,
  },
  text:{
    marginTop:5,
    color: 'white',
    textAlign: 'center',
  },
  FooterComponent:{
    flex:1,
    color:"green",
    flexDirection:"row",
    justifyContent:"space-around",
    textAlign:"center",
    color:"green",
  },
  colorsheet:{
    color:"green",
    textAlign:"center"
  }
})

export default Cart;


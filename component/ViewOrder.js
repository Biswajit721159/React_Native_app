import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Alert,
    ImageBackground,
    View,
    Text,
    Button,
    TextInput,
    Image,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
import styleing from './style'
const ViewOrder=()=>{

    const[user,setuser]=useState([])  //store user infromation ---
    const [data,setdata]=useState([])  //store order detail ---
    const [load,setload]=useState(true)
    const [product,setproduct]=useState([])//store product details   ---

    async function loaduser()
    {
        let data=await AsyncStorage.getItem('user');
        data=JSON.parse(data)
        setuser(data)
        if(data.length!=0)
        {
            loadproduct(data)
        }
    }

    function loadproduct(user)
    {
        setload(true)
        fetch('https://backend-chicken.vercel.app/getRecord',{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:user.user.email,
            })
        }).then(responce=>responce.json()).then((res)=>{
            setdata(res)
            let arr = new Set();
            for(let i=0;i<res.length;i++)
            {
                for(let j=0;j<res[i].cart.length;j++)
                {
                    arr.add(res[i].cart[j].product_id)
                }
            }
            loadactualproduct(Array.from(arr))
            setload(false)
        },(error)=>{
            console.log(error)
        })
    }

    function loadactualproduct(arr)
    {
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
          setproduct(res)
          setload(false)
       },(error)=>{
        console.log(error)
       })
    }

    function showaddress(item)
    {
        let all="Name is "+item.name + ", Phone Number "+ item.phone + ", Pin Code " +item.pincode + ", Address " +item.address1 + " " + item.address2;
        Alert.alert('Address',all)
    }

    useEffect(()=>{
        loaduser()
    },[])

    function renderItem({item})
    {
        return(
            <View style={stylemyorder.card}>
                <View>
                    {
                        item.cart.map((X,ind)=>(
                           product.map((Y,ind)=>(
                               X.product_id==Y._id?
                                 <View key={ind}>
                                    <Text  style={stylemyorder.smalltext}>{Y.product_name} X {X.product_count}</Text>
                                 </View>
                               :""
                           ))
                        ))
                    }
                </View>
                <View>
                    <Text style={stylemyorder.text}>Total - ₹{item.cost}</Text>
                    <Text style={stylemyorder.smalltext}>Date : {item.date}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                      <Text onPress={()=>showaddress(item.address)} style={stylemyorder.text}>See Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <>
        {
            load==true?<ActivityIndicator style={styleing.loader} size="large" color="#00ff00" />
            :
            <>
               {
                data.length==0?
                <Text style={stylemyorder.orderNotFound}>Order Not Found</Text>
                :
                <>
                    <Text style={stylemyorder.text}>ViewOrder</Text>
                    <FlatList data={data} renderItem={renderItem}/>
                </>
               }
            </>
        }
        </>
    )
}


const stylemyorder=StyleSheet.create({
    orderNotFound:{
        color:"#818585",
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        fontSize:15,
        flexDirection:"row",
    },
    smalltext:{
        color:"#818585",
        fontSize:13,
    },
    text:{
        color:"black",
        textAlign:"center",
        fontSize:17,
        color:"#818585"
    },
    card:{
        flex:1,
        flexDirection:'row',
        backgroundColor:"#F8F9F9",
        margin:10,
        justifyContent:"space-around",
    }
})

export default ViewOrder;
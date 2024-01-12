import React, {useEffect, useState,useContext} from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
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
import styleing from './style';
import {Context} from '../App';


const Home = (props) => {


    const contextdata = useContext(Context)
    const route = useRoute();


    let [type,settype]=useState(route.params.type);
    let [page,setpage]=useState(route.params.page);
   

    const [load, setload] = useState(true);
    const [data, setdata] = useState([]);
    const [product,setproduct]=useState([])
    const [name,setname]=useState("");

    const [prev,setprev]=useState(false)
    const [next,setnext]=useState(false)

    useEffect(() => {
      settype(route.params?.type);
      setpage(route.params?.page);
    }, [route.params.type],[route.params.page]);
  
    useEffect(() => {
      searchproduct();
    },[name]);
  
    useEffect(() => {
      loadproduct(type,page);
    }, [type]);

    useEffect(()=>{
      loadcart()
    },[contextdata])

    const [cart,setcart]=useState([])

    async function loadcart()
    {
      //  await AsyncStorage.removeItem('cart')
      // setload(true)
      let data=await AsyncStorage.getItem('cart');
      if(data!=null){
        data=JSON.parse(data)
        setcart(data)
      }
      // setload(false)
    }
    
    const api="https://backend-chicken.vercel.app/";
    
  
    function solve1(s)
    {
        let res="";
        for(let i=0;i<s.length;i++)
        {
            if(s[i]>='a' && s[i]<='z')
            {
                res+=s[i];
            }
        }
        return res;
    } 
  
    function solve2(s)
    {
        let res="";
        for(let i=0;i<s.length;i++)
        {
            if(s[i]>='a' && s[i]<='z')
            {
              res+=s[i];
            }
        }
        return res;
    }
  
    function check_All_Charcter(searchproduct,product_name){
        let s=product_name;
        let patt=searchproduct;
        let i=0;
        let j=0;
        let n=s.length;
        let m=patt.length;
        while(i<n && j<m)
        {
          if(patt[j]==s[i])
          {
            i++;j++;
          }
          else
          {
            i++;
          }
        }
        if(j==m)
        {
          return true;
        }
        return false;
    }
  
    function KMP(searchproduct,product_name)
    {
        let patt=solve1(searchproduct);
        let original=solve2(product_name);
        let n=patt.length;
        for(let i=0;i<original.length-n+1;i++)
        {
            let generate=original.substring(i,i+n);
            if(generate===patt) return true;
        }
        return false;
    }
  
    function searchproduct()
    {
        if(name.length===0)
        {
            setdata(product)
        }
        else
        {
            searchname=name
            searchname=searchname.toLowerCase()
            let n=name.length;
            let newproduct=[];
            for(let i=0;i<product.length;i++)
            {
                let s=product[i].product_name;
                s=s.toLowerCase();
                if (KMP(searchname,s)===true || check_All_Charcter(searchname,s)) 
                {
                    newproduct.push(product[i]);
                }
            }
            setdata([...newproduct]);
        }
    }
  
    function loadproduct(type,page) {
      setload(true);
      fetch(`${api}/foundType`,{
        method:'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            type:type,
            page:page,
        })
      }).then(responce=>responce.json()).then((res)=>{
          setdata(res[0].data)
          setload(false)
          setproduct(res[0].data)
          setnext(res[1].pagination.next)
          setprev(res[1].pagination.prev)
      },(error)=>{
        console.log('errors', error)
      })
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

    async function addtocart(id)
    {
      if(cart.length>=2)
      {
        Alert.alert(
          'Warning',
          'Cart Size Limit Exceeded . Please Remove Some Item To Add',
          
        );
      }
      else
      {
        cart.push({"product_id":id  , "product_count":1})
        setcart([...cart])
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        contextdata.loadcart()
      }
    }

    async function removetocart(id){
        let ans=Alreadypresent(id)
        cart.splice(ans,1);
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        setcart([...cart])
        contextdata.loadcart()
    }

    function previouspage()
    {
       loadproduct(type,page-1);
       setpage(page-1);
    }

    function nextpage()
    {
       loadproduct(type,page+1);
       setpage(page+1);
    }

    const [selectedValue, setSelectedValue] = useState("Filter");
    
    function PriceLowToHigh()
    {
        data.sort((a, b) => {
          let fa = parseInt(a.price-((a.price*a.offer)/100))
          let fb = parseInt(b.price-((b.price*b.offer)/100))
      
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
      });
      setdata([...data])
    }

    function PriceHighToLow()
    {
        data.sort((a, b) => {
          let fa = parseInt(a.price-((a.price*a.offer)/100))
          let fb = parseInt(b.price-((b.price*b.offer)/100))
      
          if (fa > fb) {
              return -1;
          }
          if (fa < fb) {
              return 1;
          }
          return 0;
      });
      setdata([...data])
    }

    function sortonOffer()
    {
        data.sort((a, b) => {
          let fa = parseInt(a.offer),
              fb = parseInt(b.offer);
      
          if (fa > fb) {
              return -1;
          }
          if (fa < fb) {
              return 1;
          }
          return 0;
        });
       setdata([...data])
    }

    function sortonrating()
    {
        data.sort((a, b) => {
            let fa = parseFloat(a.rating),
                fb = parseFloat(b.rating);
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

    useEffect(()=>{
      if(selectedValue=="PriceLowToHigh")
      {
        PriceLowToHigh()
      }
      else if(selectedValue=="PriceHighToLow")
      {
        PriceHighToLow()
      }
      else if(selectedValue=="offer")
      {
         sortonOffer()
      }
      else if(selectedValue=="rating")
      {
        sortonrating()
      }
      else if(selectedValue=="Clear_Filter")
      {
        loadproduct(type,page)
        setSelectedValue("Filter")
      }
    },[selectedValue])

    
    const renderItem = ({item,ind}) => {
      return (
        <View key={ind} style={styleing.card}>
            <View>
              <ImageBackground
                style={{width: 100, height: 100 ,borderRadius:5}}
                source={{uri: item.product_url}}
              >
              <Text style={{backgroundColor:"#F4D03F",color:"black"}}>{item.offer}% OFF</Text>
              </ImageBackground>
              <Text style={{fontSize:16,color:"black"}}>{item.product_name} ({item.quantity})</Text>
              <View style={styleing.row}>
                <Text style={{color:"green"}}>{item.rating}*</Text>
                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:"gray"}}>₹{item.price}</Text>
                <Text style={{color:"green",fontSize:16}}>₹{(item.price-((item.price*item.offer)/100)).toFixed(2)}</Text>
            </View>
            </View>
            {
              cart.some((data)=>data.product_id==item._id && data.product_count!=0)?
              <TouchableOpacity style={styleing.button2} >
                  <Text style={styleing.text2} onPress={()=>removetocart(item._id)}>Remove</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styleing.button} >
                  <Text style={styleing.text1} onPress={()=>addtocart(item._id)}>+Add</Text>
              </TouchableOpacity>
            }
        </View>
      );
    };
    

     return( 
        <>
        {
            load==true ? 
            <ActivityIndicator style={styleing.loader} size="large" color="#00ff00" />
            : 
            <View  >
                <Picker selectedValue={selectedValue} style={Homestyle.picker} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)}>
                    <Picker.Item label="Filter" value="Filter"/>
                    <Picker.Item label="Price Low To High" value="PriceLowToHigh"/>
                    <Picker.Item label="Price High To Low" value="PriceHighToLow"/>
                    <Picker.Item label="Sort On Offer" value="offer"/>
                    <Picker.Item label="Sort on Rating" value="rating"/>
                    <Picker.Item label="Clear Filter" value="Clear_Filter"/>
                </Picker>
                <TextInput placeholder="Enter Your Food To Search" placeholderTextColor="black"  value={name} onChangeText={(e)=>{setname(e)}} style={Homestyle.inputText}/>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListFooterComponent={ 
                      <View style={styleing.ListFooterComponent}>
                        <Button onPress={previouspage} disabled={!prev} title='Prev'/>
                        <Button onPress={nextpage} disabled={!next} title='Next'/>
                      </View> 
                    }
                /> 
               
            </View>  
        }
        </>
  );

}

const Homestyle=StyleSheet.create({
  inputText:{
    backgroundColor:"#EBF0EF",
    color:"green",
    marginLeft:25,
    marginRight:25,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:4,
    padding: 10,
  },
  picker: {
    width: 200,
    marginLeft:25,
    backgroundColor:"#AEB6BF",
  },
})


export default Home
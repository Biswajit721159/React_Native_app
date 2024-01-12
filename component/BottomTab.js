import React,{useEffect, useState,useContext} from "react";
import { View, Text, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cart from './Cart';
import Profile from './Profile';
import Home from './Home';
import CommanHome from './CommanHome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Context} from '../App'

const BottomTab =()=>{
    const Tab = createBottomTabNavigator();
    const [cart, setcart] = useState([]);
    const contextdata = useContext(Context)

    useEffect(()=>{
      loadcart()
    },[contextdata])

    async function loadcart()
    {
        let data = await AsyncStorage.getItem('cart');
        if (data != null) {
          data = JSON.parse(data);
          setcart(data);
        }
    }

    return(
        <>
            <Tab.Navigator >
              <Tab.Screen name="Product" component={CommanHome}
               options={{
                title: 'Product',
                headerShown: false,
                tabBarIcon: ({size, focused, color}) => {
                  return (
                    <Image
                      style={{width: size, height: size}}
                      source={{
                        uri: 'https://5.imimg.com/data5/SELLER/Default/2023/1/UV/PR/TS/42025009/depositphotos-39791951-stock-photo-whole-raw-chicken.jpg'
                      }}
                    />
                  );
                },
               }}
               />
              <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{page: 0, type: ''}}
                options={{
                  title: 'Home',
                  headerShown: false,
                  tabBarIcon: ({size, focused, color}) => {
                    return (
                      <Image
                        style={{width: size, height: size}}
                        source={{
                         uri:'https://static.wixstatic.com/media/044f07_48121f29546c4cc8ad62161a2a998819~mv2.png'
                        }}
                      />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                  title: 'Cart',
                  headerShown: false,
                  tabBarIcon: ({size, focused, color}) => {
                    return (
                      <>
                        <View style={{height:18,width:20 ,backgroundColor:"red" ,borderRadius:7,marginTop:1,textAlign:"center"}}>
                          <Text style={{color: 'white', fontSize: 15,textAlign:"center"}}>{cart.length}</Text>
                        </View>
                        <ImageBackground
                          style={{width: size, height: size}}
                          source={{
                            uri: 'https://static.vecteezy.com/system/resources/previews/004/999/463/non_2x/shopping-cart-icon-illustration-free-vector.jpg',
                          }}>
                        </ImageBackground>
                      </>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: 'Profile',
                  headerShown: false,
                  tabBarIcon: ({size, focused, color}) => {
                    return (
                      <Image
                        style={{width: size, height: size}}
                        source={{
                          uri: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
                        }}
                      />
                    );
                  },
                }}
              />
            </Tab.Navigator>        
        </>
    )
}

export default BottomTab;
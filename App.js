import React, {useEffect, useState} from 'react';

import {
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
} from 'react-native';

import Register from './component/Register';
import Profile from './component/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './component/Login';
import styleing from './component/style';
import {createContext} from 'react';
import Order from './component/Order';
import BottomTab from './component/BottomTab';
import {createStackNavigator} from '@react-navigation/stack';
import ViewOrder from './component/ViewOrder';

export const Context = createContext();

const App = () => {
  const Tab = createBottomTabNavigator();
  const [user, setuser] = useState(null);
  const [load, setload] = useState(true);
  const [cart, setcart] = useState([]);
  const Stack = createStackNavigator();

  //context data
  const myFunction = async value => {
    setuser(value);
    await AsyncStorage.setItem('user', value);
    getData();
  };
  const removeuser = async () => {
    setuser(null);
    await AsyncStorage.removeItem('user');
  };
  const contextValue = {
    myFunction: myFunction,
    removeuser: removeuser,
    loadcart: loadcart,
  };

  //useEffect information ---
  const getData = async () => {
    setload(true);
    const value = await AsyncStorage.getItem('user');
    if (value != undefined || value == null) {
      setuser(value);
      setload(false);
    }
  };

  useEffect(() => {
    getData();
    loadcart();
  }, []);

  async function loadcart() {
    let data = await AsyncStorage.getItem('cart');
    if (data != null) {
      data = JSON.parse(data);
      setcart(data);
    }
  }

  return (
    <>
      {load == true ? (
        <ActivityIndicator
          style={styleing.loader}
          size="large"
          color="#00ff00"
        />
      ) : user == null ? (
        <Context.Provider value={contextValue}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Login" component={Login} />
              <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
          </NavigationContainer>
        </Context.Provider>
      ) : (
        <Context.Provider value={contextValue}>
          <NavigationContainer>
            <Stack.Navigator
            
                  initialRouteName="Welcome"
                    screenOptions={{
                      headerMode: 'screen',
                      headerTintColor: 'black',
                      headerStyle: {backgroundColor: 'white'},
                      // headerShown: false,
                    }}>

                  <Stack.Screen  
                    name='Meat Center'
                    component={BottomTab}
                  />

                  <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{
                      title: 'Order',
                    }}
                  />
                  <Stack.Screen
                    name="MyOrder"
                    component={ViewOrder}
                    options={{
                      title: 'MyOrder',
                    }}
                  />

            </Stack.Navigator>
          </NavigationContainer>
        </Context.Provider>
      )}
    </>
  );
};

export default App;

import {Text, View,Image,TouchableOpacity, Button} from 'react-native';
import styleing from './style';
import Home from './Home'
import { useContext, useState } from 'react';


const CommanHome = ({navigation}) => {
   
 

  function goToNext(pro)
  {
    navigation.navigate('Home',{page:0,type:pro})
  }
  
  return (
    <>
      <View>
        <Text style={{fontSize:20,color:"black",textAlign:"center",marginBottom:30,marginTop:10}}>Welcome To Meat Center</Text>
      </View>
      <View style={styleing.Home}>
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('')}>
                <Image
                    style={{width: 120, height: 120, borderRadius: 5}}
                    source={require('../images/all.png')}
                  />
              </TouchableOpacity>
              <Text style={{color:"#818585"}}>All</Text>
          </View>
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('Chicken')} >
                <Image
                    style={{width: 120, height: 120, borderRadius: 5}}
                    source={require('../images/chicken.png')}
                  />
              </TouchableOpacity>
              
              <Text style={{color:"#818585"}}>Chicken</Text>
          </View >
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('Mutton')}>
                  <Image
                    style={{width: 120, height: 120, borderRadius: 5}}
                    source={require('../images/mutton.png')}
                  />
              </TouchableOpacity>
              <Text style={{color:"#818585"}}>Mutton</Text>
          </View>
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('Prawns')}>
                  <Image
                    style={{width: 120, height: 120, borderRadius: 5}}
                    source={require('../images/prawns.png')}
                  />
              </TouchableOpacity>
              <Text style={{color:"#818585"}}>Prawns</Text>
          </View>
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('Fish')}>
                  <Image
                    style={{width: 120, height: 120, borderRadius: 5}}
                    source={require('../images/fish.png')}
                  />
              </TouchableOpacity>
              <Text style={{color:"#818585"}}>Fish</Text>
          </View>
          <View style={styleing.item}>
              <TouchableOpacity onPress={()=>goToNext('Egg')}>
                <Image
                  style={{width: 120, height: 120, borderRadius: 5}}
                  source={require('../images/Eggs.png')}
                />
              </TouchableOpacity>
              <Text style={{color:"#818585"}}>Egg</Text>
          </View>
      </View>
      {/* <View>
        <Text style={{color:"lightgray" ,textAlign:"center"}}>@ 2023 copyright Biswajit Ghosh</Text>
      </View> */}
    </>
  );
};
export default CommanHome;

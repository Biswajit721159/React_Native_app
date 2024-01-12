import {StyleSheet} from "react-native"

const styleing=StyleSheet.create(
    {
      cart:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap",
        backgroundColor:"#F8F9F9",
        marginTop:10,
        marginLeft:"15%",
        marginRight:'15%',
        borderRadius:5,
        borderColor:"green",
      },
      fixeditem:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
      },
      form:{
        marginLeft:'10%',
        marginRight:'10%',
      },
      picker: {
        width: 200,
        marginLeft:10,
        backgroundColor:"#AEB6BF",
      },
      ListFooterComponent:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20,
        marginLeft:30,
        marginRight:35,
        marginBottom:150,
      },
      item:{
        alignItems:"center"
      },
      Home:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap"
      },
      inputText:{
        backgroundColor:"#EBF0EF",
        color:"green",
        marginLeft:10,
        marginRight:10,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius:4,
        padding: 10,
      },
      row:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        width:170,
      },
      button: {
        flex:1,
        justifyContent:"center",
        backgroundColor: '#4CAF50',
        padding: 1,
        borderRadius: 5,
        margin: 50,
      },
      text1: {
        color: 'white',
        textAlign: 'center',
      },
      button2: {
        flex:1,
        justifyContent:"center",
        backgroundColor: '#CB4335',
        padding: 1,
        borderRadius: 5,
        margin: 50,
      },
      text2: {
        color: 'white',
        textAlign: 'center',
      },
      card:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap",
        backgroundColor:"#F8F9F9",
        marginTop:10,
        marginLeft:30,
        marginRight:30,
        borderRadius:5,
        borderColor:"green",
      },
      loader:{
        flex:1,
        justifyContent:"center",
      },
      text:{
        color:"black",
        fontSize:40,
        textAlign:"center",
        marginBottom:10,
      },
      input:{
        color:"green",
        marginTop:3,
        marginBottom:20,
        borderWidth:1,
        borderRadius:8,
        padding:10
      },
      image:{
        marginLeft:100,
        marginTop: 100,
        width: 200,
        height: 200,
      },
     
    }
  )

export default styleing  
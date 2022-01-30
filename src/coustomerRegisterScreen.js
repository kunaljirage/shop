import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { 
  TextInput,
  Text
 } from 'react-native-paper';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import con from './connection';
//import con from '../connection';
       
export default  function RegisterScreen({ navigation }){
  const [details,setDetails]=useState({Name:'',Mobile:'',Email:''});
  const{Name,Mobile,Email}=details;
 const onChangeTextHandeler=(Value,fieldName)=>{setDetails({...details,[fieldName]:Value})}
 const [buttonDisable,setButtonDisable]=useState(false);
 
  function insertRecord(){
   setButtonDisable(true);
    if(details.Name.trim().length==0||details.Mobile.trim().length<10||details.Email.trim().length==0)
    {
      alert("Please cheack  all field are correct");
      setButtonDisable(false);
    }
    else{
     var InsertApiUrl=  ''+con+'/customer/customerRegister.php';
     fetch(InsertApiUrl, {
  method: 'POST',
 headers:{
  'Accept': 'application/json',
  'Content-Type': 'application/json'
 },
  body:JSON.stringify(details)
  })
  .then((response)=>response.json())
  .then((response)=>{
    if(response[0].message=="Registretion successful")
    {
    setButtonDisable(false);
   setDetails({Name:'',Mobile:'',Email:''})
   alert(response[0].message) ;
  
    }else{
      setButtonDisable(false);
      alert(response[0].message)  
    }
  })
  .catch((error)=>{
    setButtonDisable(false);
    alert(error);
  })

    }
  }
  
 
 
  return (

       <SafeAreaView style={styles.Container}>
          <StatusBar animated={true} backgroundColor="#0bbdb4" />
          <View>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
<View style={styles.Container1}>


    <Text style={styles.Title}>Register</Text>
   
      <TextInput
      style={styles.Textinput}
      mode='outlined'
      value={Name}
      onChangeText={Value => onChangeTextHandeler(Value,"Name")}
      left={ <Icon name="store" size={20} color="#8a96a8" style={{marginTop:14}}/> }
      label="Name"
      />
    
    
      <TextInput
      style={styles.Textinput}
      maxLength={10}
      mode='outlined'
      label="Mobile No."
      keyboardType={'number-pad'}
      value={Mobile}
      onChangeText={Value => onChangeTextHandeler(Value,"Mobile")}
      left={ <Icon name="cellphone" size={20} color="#8a96a8" style={styles.IconStyle} /> }
      />
      <TextInput
      style={styles.Textinput}
      mode='outlined'
      label="Email"
      value={Email}
      onChangeText={Value =>onChangeTextHandeler(Value,"Email")}
      left={ <Icon name="email-outline" size={20} color="#8a96a8" style={styles.IconStyle} /> }
      />
      
   
     <TouchableOpacity style={styles.BtnLogin} onPress={() => insertRecord()} disabled={buttonDisable}><Text style={{color:"white"}}>
       REGISTER</Text></TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('Authentication')}><Text style={{color:"#8a96a8",padding:8,alignSelf:'center'}}>Already have an account ? <Text style={{color:'#0bbdb4'}}>Login</Text></Text></TouchableOpacity>
     
 
      </View>
      </ScrollView>
      </View>
    </SafeAreaView>
   )
};


const styles = StyleSheet.create({
  Container: {
  flex:1,
  backgroundColor:'white',
  justifyContent:'center'
},
Container1:{
 marginVertical:8,
 paddingVertical:10,
 flex:0.7,
 paddingHorizontal:8,
 justifyContent:'center',
 backgroundColor:'white',
 marginHorizontal:8,
 borderRadius:10,
 shadowColor: "#000",
 shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,

},
IconStyle:{
  marginTop:14
},
  Title: {
    fontSize: 20,
    fontWeight: '700',
    color:"#8a96a8",
    alignSelf:'center',
    marginBottom:30
   },
  BtnLogin:{
    backgroundColor:'#0bbdb4',
    borderRadius:10,
    height:45,
    width:120,
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:'center'
   },
 Textinput:{
  backgroundColor:"white",
  marginBottom:10,
  height:44,
  fontSize:14,
 }
 
});
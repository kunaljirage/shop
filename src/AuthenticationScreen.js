import React,{useState} from 'react'
import { View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
 TextInput,
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import con from './connection';



export default function AuthenticationScreen({navigation}) {
  const [mobileNumber,setMobileNumber]=useState('')
  const [buttonDisable,setButtonDisable]=useState(false);

  const onPressContinue=()=>{

  if(mobileNumber!==""){
   
   setButtonDisable(true);
      
      
      var InsertApiUrl=  ''+con+'/customer/Authentication.php';
        fetch(InsertApiUrl, {
     method: 'POST',
    headers:{
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
     body:JSON.stringify({Mobile:mobileNumber})
     })
     .then((response)=>response.json())
     .then((response)=>{
       if(response[0].message)
       {
       setButtonDisable(false);
       alert(response[0].message)
       navigation.navigate('InputOTP')
     
     
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
    else
  alert('Enter your mobile number')
  }
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
      <ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
        <Text style={styles.header}> Enter mobile number</Text>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Icon name="mobile" size={30} color="#8a96a8" style={{paddingTop:12,borderColor: '#2ac9bc',borderBottomWidth: 1,paddingLeft:15}} />
        <Text style={{paddingTop:15,borderColor: '#2ac9bc',borderBottomWidth: 1,paddingLeft:10}}>+91</Text>
          <TextInput 
          maxLength={10}
          placeholder="956 674 4578" 
          keyboardType='phone-pad'
          value={mobileNumber}
          onChangeText={(mobileNumber)=>setMobileNumber(mobileNumber)}
          style={styles.textInput}
           />
          </View>
        </View>
       
      </TouchableWithoutFeedback>
      <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.continueBtn} onPress={() => onPressContinue()} disabled={buttonDisable} ><Text style={{ alignSelf:'center',color:'#ffffff',fontWeight:'600',fontSize:18}} >Continue</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{color:"#8a96a8",padding:8}}>Do not have an account ? <Text style={{color:'#0bbdb4'}}>Register</Text></Text></TouchableOpacity>
          </View>
    </KeyboardAvoidingView>
    </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
 },
  inner: {
  marginVertical:10,
  justifyContent:'center',
  marginTop:'30%',
  padding:'4%',
  
   
  },
  header: {
  fontSize: 20,
  marginBottom: 40,
  color: '#2ac9bc',
  alignSelf:'center'
  },
  textInput: {
  height: 50,
  borderColor: '#2ac9bc',
  borderBottomWidth: 1,
  backgroundColor:'white',
  width:120
 
  },
  btnContainer: {
  marginTop: 30,
  alignItems:'center'
  },
  continueBtn:{
  marginBottom:10,
  padding:10,
  borderRadius:5,
  width:220,
  backgroundColor:'#2ac9bc'
  }
});
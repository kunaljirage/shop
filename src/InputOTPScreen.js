import React,{useRef, useState} from 'react'
import { View, Text, StyleSheet,TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import {  } from 'react-native-paper';
import con from './connection';


export default function InputOTPScreen({ navigation }) {
  const [pin,setPin]= useState({pin1:'',pin2:'',pin3:'',pin4:'',pin5:'',pin6:''});
  const {pin1,pin2,pin3,pin4,pin5,pin6}=pin;
  const [buttonDisable,setButtonDisable]=useState(false);
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const pin5ref = useRef(null);
  const pin6ref = useRef(null);


 
  function inputOTP(){
    setButtonDisable(true);
    const combineOTP =pin.pin1+pin.pin2+pin.pin3+pin.pin4+pin.pin5+pin.pin6;
    if(combineOTP.trim().length<6){
      alert("OTP is incorrect")
    }else{
    var InsertApiUrl=  ''+con+'/customer/OTP.php';
      fetch(InsertApiUrl, {
   method: 'POST',
  headers:{
   'Accept': 'application/json',
   'Content-Type': 'application/json'
  },
   body:JSON.stringify({OTP:combineOTP})
   })
   .then((response)=>response.json())
   .then((response)=>{
     if(response[0].message=="success")
     {
     setButtonDisable(false);
   navigation.replace("Home")
   
   
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
      
     
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, marginVertical:'20%'}}
      >

    
      <View style={{flex:1}}>
      <View style={styles.container}>
               <Text style={styles.header}>Please enter your OTP</Text>
      <View style={{flexDirection:'row',height:45,marginHorizontal:40,justifyContent:'center'}} >

            <TextInput
            autoFocus={true}
            value={pin1}
            ref={pin1ref}
            style={styles.textInput}
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={(pin1)=>{setPin({...pin,pin1:pin1});
            if(pin1!==""){
            pin2ref.current.focus()
              }
            }}
            />

            <TextInput
            value={pin2}
            ref={pin2ref}
            style={styles.textInput}
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={(pin2)=>{setPin({...pin,pin2:pin2})
            if(pin2!==""){
            pin3ref.current.focus()
            }
            }}
            onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ?pin1ref.current.focus():''
            }}
         />
          
            <TextInput
             ref={pin3ref}
             value={pin3}
             style={styles.textInput}
             maxLength={1}
             keyboardType={'number-pad'}
             onChangeText={(pin3)=>{setPin({...pin,pin3:pin3})
              if(pin3!==""){
                pin4ref.current.focus()
                }
            }}
            onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ?pin2ref.current.focus():''
            }}
           /> 

            <TextInput
            value={pin4}
            ref={pin4ref}
            style={styles.textInput}
            maxLength={1}
            onChangeText={(pin4)=>{setPin({...pin,pin4:pin4})
              if(pin4!==""){
                pin5ref.current.focus()
                }
            }}
            onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ?pin3ref.current.focus():''
            }}
            keyboardType={'number-pad'}
            /> 

            <TextInput
            value={pin5}
            ref={pin5ref}
            style={styles.textInput}
            maxLength={1}
            onChangeText={(pin5)=>{setPin({...pin,pin5:pin5})
              if(pin5!==""){
                pin6ref.current.focus()
                }
            }}
            onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ?pin4ref.current.focus():''
            }}
            keyboardType={'number-pad'}
            /> 

            <TextInput
            value={pin6}
            ref={pin6ref}
            style={styles.textInput}
            maxLength={1}
            onChangeText={(pin6)=>{setPin({...pin,pin6:pin6})
              if(pin6!==""){
                pin6ref.current.blur()
                }
            }}
            onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ?pin5ref.current.focus():''
            }}
            keyboardType={'number-pad'}
            />
          </View>
          
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.continueBtn} onPress={()=>inputOTP()}><Text style={styles.btnText} disabled={buttonDisable} >Continue</Text></TouchableOpacity>
          </View>
         </View>
      </View>

      
      
      </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center'
    },
    textInput: {
      borderColor: '#2ac9bc',
      borderBottomWidth: 1,
      backgroundColor:'white',
      padding:8,
      borderRadius:4,
      margin:3,
       },
      header: {
        fontSize: 18,
        marginBottom: 28,
        color: 'gray',
        alignSelf:'center'
      },
      btnContainer: {
        marginTop: 50,
        alignItems:'center'
       },
       continueBtn:{
        
        padding:10,
        borderRadius:5,
        width:200,
        backgroundColor:'#2ac9bc'
       },
       btnText:{ alignSelf:'center',
       color:'#ffffff',
       fontWeight:'600',
       fontSize:18}
  });
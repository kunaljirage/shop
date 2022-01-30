import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import AuthenticationScreen from './src/AuthenticationScreen';
import InputOTPScreen from './src/InputOTPScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import RegisterScreen from './src/coustomerRegisterScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{headerShown:false}} />
        <Stack.Screen name="InputOTP" component={InputOTPScreen} options={{headerShown:false}}  />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}  />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
import {ImageBackground, StyleSheet, View} from 'react-native';
import {PaperProvider, Text} from 'react-native-paper';
import {BottomNavigation as Screens} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import MainScreen from './src/screens/buttons';
import {NativeRouter, Routes, Route} from 'react-router-native';
import SingupDetails from './src/screens/singup';
import LoginDetails from './src/screens/login';
import UserDashboard from './src/screens/dashboard';
import AdminDashboard from './src/screens/adminDashboard';
import React from 'react';
import {useEffect} from 'react';
// import Geolocation from '@react-native-community/geolocation';
import Container, {Toast} from 'toastify-react-native';
import ForgotPassword from './src/screens/forgot';
import VerifyCode from './src/screens/verifycode/Index';
import NewMail from './src/screens/newEmail';
import { DataProvider } from './src/screens/ContextComp';

const App = () => {
  const image = {uri: 'https://i.pinimg.com/564x/7c/2e/df/7c2edfb09871526f87cc090d7773e299.jpg'}
  https://i.pinimg.com/564x/7c/2e/df/7c2edfb09871526f87cc090d7773e299.jpg
  return (
    <>
      <SafeAreaProvider >
        <PaperProvider>
          <Container position="top" />
          <NativeRouter>
            <ImageBackground style={styles.image} source={image} >
              <DataProvider>
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/singupForm" element={<SingupDetails />} />
              <Route path="/singupForm/:donateDate" element={<SingupDetails />}
              />
              <Route path="/loginForm" element={<LoginDetails />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path='/forgotpassword' element={<ForgotPassword/>} />
              <Route path='/verifycode' element={<VerifyCode/>} />  
              <Route path='/newmail' element={<NewMail/>} />  
            </Routes>
            </DataProvider>
            </ImageBackground>
          </NativeRouter>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
    backgroundColor: 'white',
    marginBottom: 70,
  },
  image: {
    height:'100%'
  },
  container: {
    flex: 1,
  },
  
});

export default App;
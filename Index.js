import axios from 'axios';
import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Text, View, StyleSheet} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigate} from 'react-router-native';
import Container, {Toast} from 'toastify-react-native';
import {DataContext} from '../ContextComp';

const VerifyCode = () => {
  const {updateUserData} = useContext(DataContext);
  const navigate = useNavigate();
  const {handleSubmit, control} = useForm();

  const OnVerifyCode = data => {
    updateUserData(data);
    axios
      .post(`http://192.168.43.69:3005/verifyTokenCheck`, data)
      .then(function (resp) {
        if (resp.data.success == false) {
          Toast.error('Please enter the correct verification code');
        } else {
          Toast.success('Valid Email Success');
          navigate('/newmail');
        }
      });
  };

  return (
    <View>
      <Appbar.Header style={styles.header} >
        <Appbar.BackAction onPress={() => navigate('/forgotpassword')} />
      </Appbar.Header>
      <View style={styles.main}>
        <Text style={styles.heading}>Enter Your Verification Code</Text>
        <Text style={styles.sub_heading} >
          We sent a code via gmail. Enter that code to confirm your account.
        </Text>
        <Controller
          name="firstNumer"
          control={control}
          rules={{required: true}}
          render={({field: {value, onChange, onBlur}}) => {
            return (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.codeInputs}
                  label="Enter your verification code"
                />
              </>
            );
          }}
        />
     <View style={styles.btn_back} >
        <Button
          labelStyle={{color: '#ffffff'}}
          style={styles.btn}
          onPress={handleSubmit(OnVerifyCode)}>
          Continue
        </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeInputs: {
    fontSize: 20,
    height: 65,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 25,
    color: '#ffffff',
    paddingLeft:10,
    fontWeight: '600',
    marginTop: 150,
  },
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
    opacity: 70,
    height: '100%',
  },
  sub_heading: {
    fontSize:17,
    color:'#ffffff',
    paddingHorizontal:10,
    // marginVertical:35
    marginBottom:40,
    marginTop:8
  },
  btn: {
    backgroundColor: 'red',
    height: 60,
    width:250,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn_back: {
    display:'flex',
    alignItems:'center'
  },
  header: {
    backgroundColor:'rgba(0, 0, 0, 0.46)'
  }
});

export default VerifyCode;

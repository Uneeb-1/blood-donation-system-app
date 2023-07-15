import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import {Appbar, Button, TextInput, List, Menu} from 'react-native-paper';
import {useNavigate, useParams} from 'react-router-native';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../input';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import {on} from '../../../server/models/User';

import Container, {Toast} from 'toastify-react-native';

const SingupDetails = () => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const NUMBER_REGEX = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

  const navigate = useNavigate();
  const [text, setText] = useState('');

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  console.log(value);

  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = useForm();
  const password = watch('userPassword');

  const onSinginPressed = data => {
    data.type = value;
    console.log(data);
    axios.post(`http://192.168.43.69:3005/singup`, data).then(function (resp) {
      Toast.success('Singup Successfully');
    });
  };

  return (
    <View style={styles.bg_theme} >
    <ScrollView>
      <View>
        <Appbar.Header style={styles.header} >
          <Appbar.BackAction onPress={() => navigate('/')} />
        </Appbar.Header>

        <View>
          <Text style={styles.title}>SingUp Form :</Text>
        </View>

        <View style={styles.container}>
          <CustomInput
            name="userName"
            placeholder="Enter your name"
            control={control}
            label="Enter your name"
            required={true}
            rules={{required: 'User name is required'}}
          />

          <CustomInput
            name="userEmail"
            placeholder="Enter your email"
            label="Enter your email"
            control={control}
            rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
          />

          <CustomInput
            name="userPassword"
            placeholder="Enter your password"
            label="Enter your password"
            control={control}
            secureTextEnter
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be minimum 8 characters',
              },
            }}
          />

          <CustomInput
            name="passwordRepeat"
            placeholder="Re-Enter your password"
            label="Re-Enter your password"
            control={control}
            secureTextEnter
            rules={{validate: value => value == password || 'Password do not match',}}
          />



          <CustomInput
            name="userAge"
            placeholder="Enter your age"
            label="Enter your age"
            control={control}
            rules={{required: 'User age is required'}}
          />

          <CustomInput
            name="userNumber"
            control={control}
            placeholder="03*********"
            label="Enter you phone number"
            rules={{
              pattern: {value: NUMBER_REGEX, message: 'Number is invalid'},
            }}
          />

          <CustomInput
            name="userBloodGroup"
            control={control}
            placeholder="Enter you blood group"
            label="Enter you blood group"
            rules={{required: 'User Blood group in required'}}
          />

          <List.Section>
            <List.Accordion title={value ? value : 'Select Patient'}>
              <Controller
                expanded={expanded}
                onPress={handlePress}
                name="type"
                control={control}
                rules={{required: true}}
                render={({
                  field: {value, onChange, onBlur},
                  fieldState: {error},
                }) => {
                  return (
                    <>
                      <List.Item
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        title="Donner"
                        onPress={() => {
                          setValue('Donner');
                          setTouched(true);
                        }}
                      />
                      <List.Item
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        title="patient"
                        onPress={() => {
                          setValue('Patient');
                          setTouched(true);
                        }}
                      />
                    </>
                  );
                }}
              />
            </List.Accordion>
          </List.Section>
          {!touched && <Text>err</Text>}

          <View style={styles.btn_back} >
          <Button
          textColor='white'
            style={styles.btn}
            icon="account-arrow-right"
            mode="contained"
            onPress={handleSubmit(onSinginPressed)}>
            {' '}
            Press me
          </Button>
      </View>

        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingHorizontal: 10,
  },
  title: {
    paddingLeft: 10,
    fontSize: 35,
    color: 'white',
    paddingVertical: 30,
  },
  btn: {
    width: 180,
    height: 55,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    marginBottom:20
  },
  btn_back: {
    display:'flex',
    alignItems:'center'
  },
  header: {
    backgroundColor:'rgba(0, 0, 0, 0.36)'
  },
  bg_theme: {
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
    opacity: 70,
    height: '100%',
  }
});

export default SingupDetails;

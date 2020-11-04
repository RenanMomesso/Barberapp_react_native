import React, {useState, useContext} from 'react';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonBold,
} from './styles';
import BarberLogo from '../../assets/barber';
import SigninInput from '../../components/SigninInput';

import {useNavigation} from '@react-navigation/native';

import EmailIcon from '../../assets/email';
import LockIcon from '../../assets/lock';

import Api from '../../Api';

import AsyncStorage from '@react-native-community/async-storage';
import {userContext} from '../../contexts/userContext';

export default () => {
  const { useDispatch: userDispatch } = useContext(userContext);

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonText = () => {
    navigation.reset({
      routes: [{name: 'Signup'}],
    });
  };

  const handleSignClick = async () => {
    if (emailField !== '' && passwordField !== '') {
      const json = await Api.signIn(emailField, passwordField);
      if (json.token) {
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type:'setAvatar',
          payload:{
            avatar:json.data.avatar
          }
        });

        navigation.navigate({
          routes:[{name:'MainTab'}]
        })

      } else {
        alert('usuario ou senha errado');
      }
    } else {
      alert('Preencha os campos corretamente');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SigninInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={(e) => setEmailField(e)}
        />
        <SigninInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(e) => setPasswordField(e)}
          password
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonText}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonBold>Cadastre-se</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
};

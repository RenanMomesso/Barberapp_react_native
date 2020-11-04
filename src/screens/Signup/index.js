import React, {useContext, useState} from 'react';
import {Text} from 'react-native';
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
import {userContext} from '../../contexts/userContext';
import AsyncStorage from '@react-native-community/async-storage';

import EmailIcon from '../../assets/email';
import LockIcon from '../../assets/lock';
import PersonIcon from '../../assets/person';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();
  const {dispatch: userDispatch} = useContext(userContext);

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonText = () => {
    navigation.reset({
      routes: [{name: 'Signin'}],
    });
  };

  const handleSignClick = async () => {
    if (nameField != '' && emailField != '' && passwordField != '') {
      const res = await Api.signup(nameField, emailField, passwordField);
      if (res.token) {
        await AsyncStorage.setItem('token', token);
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar,
          },
        });
        navigation.reset({
          routes:[{name:'MainTab'}]
        })
      } else {
        alert('erro', res.erro);
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
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(e) => setNameField(e)}
        />
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonText}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Entrar</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
};

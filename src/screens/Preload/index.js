import React, {useEffect, useContext} from 'react';

import {Container, LoadingIcon} from './styles';

import BarberLogo from '../../assets/barber.svg';

import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';
import {userContext} from '../../contexts/userContext';

export default () => {
  const {dispatch: userDispatch} = useContext(userContext);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        let res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem('token', res.token);
          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res.data.avatar,
            },
          });
          navigation.reset({
            routes: [
              {
                name: 'MainTab',
              },
            ],
          });
        } else {
          navigation.navigate('Signin');
        }
      } else {
        navigation.navigate('Signin');
      }
    };
    checkToken()
  }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160px" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};

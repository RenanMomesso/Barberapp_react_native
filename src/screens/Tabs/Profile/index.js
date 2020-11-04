import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import Api from '../../../Api';
import {Container, Texto} from './styles'

export default () => {

    const navigation = useNavigation()
    const handleLogoutClick = () => {
        Api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        })
    }
    return(
    <Container>
        <Texto>Profile</Texto>
        <Button title="Logout" onPress={handleLogoutClick}  />
    </Container>
)
    }
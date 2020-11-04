import React, {useEffect, useState} from 'react';
import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
} from './styles';
import {RefreshControl} from 'react-native'
import AppointmentsItem from '../../../components/AppointmentsItem';
import Api from '../../../Api';

export default () => {
  const [list, setList] = useState([]);
  const [emptyList, setEmptyList] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getAppointments()
  },[])

  const getAppointments = async () => {
    setLoading(true);
    setList([]);
    let res = await Api.getAppointments();
    if(res.error == ''){
      setList(res.list)
    } else {
      alert("Erro: " + res.error)
    }
    setLoading(false);
  };

  return (
    <Container>
       
      <Scroller refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getAppointments}/>
      }>
        {!loading && list.length === 0 &&
        <HeaderTitle>Você não escolheu nenhum barbeiro(s) como favorito(s). </HeaderTitle>}
        <ListArea>
          {list.map((item, k) => (
            <AppointmentsItem data={item} key={k} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

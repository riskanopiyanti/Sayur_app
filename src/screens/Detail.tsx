import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {CoffeeItem} from '../models/coffeeItem';
import { style } from '../style/font_style';

// Define the route prop for Detail
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface DetailProps {
  route: DetailScreenRouteProp;
}

const Detail = ({route}: DetailProps) => {
  const {item} = route.params;

  return (
    <View>
      <Text style={style.medium}>{item.title}</Text>
      <Text style={style.medium}>{item.desc}</Text>
      <Text style={style.medium}>{item.price}</Text>
    </View>
  );
};

export default Detail;

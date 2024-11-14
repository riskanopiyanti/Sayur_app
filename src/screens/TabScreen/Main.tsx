import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CoffeeItem} from '../../models/coffeeItem';
import {RootStackParamList} from '../../navigation/AppNavigator';

const coffeeCategory = [
  'Capucino',
  'Capucino',
  'Capucino',
  'Capucino',
  'Capucino',
  'Capucino',
  'Capucino',
  'Capucino',
];

const data: CoffeeItem[] = [
  {
    id: 1,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
  {
    id: 2,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
  {
    id: 3,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
  {
    id: 4,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
  {
    id: 5,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
  {
    id: 6,
    image: require('../../../assets/coffee.png'),
    rating: 4.5,
    title: 'Cappucino',
    desc: 'With Chocolate',
    price: '4.53',
  },
];

const Main = () => {
  const {width} = Dimensions.get('window');
  const itemMargin = 10;
  const itemWidth = width / 2 - itemMargin * 4;

  const [selectedIndex, setSelectedIndex] = useState<number | 0>(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View>
            <Text>Location</Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
              }}>
              Bilzen, Tanjungbalai
            </Text>
          </View>

          <Image
            source={require('../../../assets/profile.png')}
            style={{
              height: 45,
              width: 45,
              borderRadius: 12,
            }}
          />
        </View>
        <TextInput
          style={{
            backgroundColor: 'white',
            marginBottom: 20,
            borderRadius: 12,
            padding: 10,
          }}
          placeholder="Search coffee"
          placeholderTextColor={'grey'}
        />
        <Image
          source={require('../../../assets/hero.png')}
          style={{
            width: '100%',
            height: 140,
            borderRadius: 12,
          }}
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{padding: 16}}
        showsHorizontalScrollIndicator={false}>
        {coffeeCategory.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={{
              backgroundColor: selectedIndex === index ? '#C67C4E' : 'white',
              paddingHorizontal: 4,
              paddingVertical: 10,
              borderRadius: 12,
              marginLeft: 8,
              marginBottom: 25,
              height: 40,
            }}>
            <Text
              style={{
                color: selectedIndex === index ? 'white' : 'black',
              }}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={data}
        numColumns={2}
        style={{
          width: '100%',
        }}
        renderItem={({item}: {item: CoffeeItem}) => (
          <Pressable
            onPress={() => navigation.navigate('Detail', {item})}
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 10,
              width: width / 2 - 20,
              margin: 8,
            }}>
            <View
              style={{
                position: 'relative',
              }}>
              <Image
                source={require('../../../assets/coffee.png')}
                style={{
                  width: '100%',
                  height: 140,
                  borderRadius: 12,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  marginLeft: 5,
                }}>
                <Image
                  source={require('../../../assets/star.png')}
                  style={{
                    width: 10,
                    marginRight: 2,
                    height: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                  }}>
                  {item.price}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 500,
              }}>
              {item.title}{' '}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
              }}>
              {item.desc}{' '}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#2F4B4E',
                  fontSize: 18,
                  fontWeight: 600,
                }}>
                $ {item.price}
              </Text>
              <View
                style={{
                  width: 40,
                  borderRadius: 12,
                  height: 40,
                  backgroundColor: '#C67C4E',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                  }}>
                  +
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Main;

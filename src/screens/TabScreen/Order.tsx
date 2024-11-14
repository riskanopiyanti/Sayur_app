// Order.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

type OrderProps = {
  route: any; // To access the passed data
};

const Order = ({ route }: OrderProps) => {
  const { items } = route.params;

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <ScrollView style={styles.orderList}>
        {items.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.vegetableImage} />
            <View style={styles.cardContent}>
              <Text style={styles.vegetableName}>{item.name}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity} kg</Text>
              <Text style={styles.price}>
                {item.price.toLocaleString('id-ID')} IDR
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {calculateTotalPrice().toLocaleString('id-ID')} IDR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  orderList: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vegetableImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  vegetableName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Order;

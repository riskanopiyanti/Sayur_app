import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import { ArrowLeft, Edit2, Trash2, Plus, Search } from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

interface VegetableItem {
  id: number;
  name: string;
  price: number;
  weight: number;
  image: ImageSourcePropType;
  quantity: number;
}

export default function SellerHomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState('');
  const [vegetables, setVegetables] = useState<VegetableItem[]>([
    {
      id: 1,
      name: 'Tomat Merah',
      price: 20000,
      weight: 1,
      image: require('../../assets/tomat_merah.jpeg'),
      quantity: 0,
    },
    {
      id: 2,
      name: 'Bawang Merah',
      price: 76000,
      weight: 2,
      image: require('../../assets/bawang_merah.jpg'),
      quantity: 0,
    },
    {
      id: 3,
      name: 'Brokoli',
      price: 25000,
      weight: 1,
      image: require('../../assets/brokoli.jpeg'),
      quantity: 0,
    },
  ]);
  const [editingItem, setEditingItem] = useState<VegetableItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newVegetable, setNewVegetable] = useState<VegetableItem>({
    id: Date.now(),
    name: '',
    price: 0,
    weight: 0,
    image: require('../../assets/Kol.jpeg'), // replace with a default image
    quantity: 0,
  });

  const handleAddVegetable = () => {
    setIsAdding(true); // Show add form
  };

  const handleSaveNewVegetable = () => {
    if (newVegetable.name && newVegetable.price > 0 && newVegetable.weight > 0) {
      setVegetables([...vegetables, { ...newVegetable, id: Date.now() }]);
      setNewVegetable({
        id: Date.now(),
        name: '',
        price: 0,
        weight: 0,
        image: require('../../assets/Kol.jpeg'),
        quantity: 0,
      });
      setIsAdding(false);
      Alert.alert('Sukses', 'Sayuran baru berhasil ditambahkan');
    } else {
      Alert.alert('Error', 'Isi semua field dengan benar');
    }
  };

  const handleEditItem = (id: number) => {
    const item = vegetables.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleDeleteItem = (id: number) => {
    Alert.alert('Konfirmasi Penghapusan', 'Apakah Anda yakin ingin menghapus sayuran ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        onPress: () => {
          setVegetables(vegetables.filter((item) => item.id !== id));
          Alert.alert('Sukses', 'Sayuran berhasil dihapus');
        },
      },
    ]);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setVegetables(vegetables.map(item => (item.id === editingItem.id ? editingItem : item)));
      setEditingItem(null);
      Alert.alert('Sukses', 'Sayuran berhasil diperbarui');
    }
  };

  const filteredVegetables = vegetables.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warung Ibu Riska (Penjual)</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#666" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari sayuran..."
          placeholderTextColor={'grey'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredVegetables.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.vegetableImage} />
            <View style={styles.cardContent}>
              <Text style={styles.vegetableName}>{item.name}</Text>
              <Text style={styles.price}>
                {item.weight} Kg = {item.price.toLocaleString('id-ID')}
              </Text>
              {item.quantity > 0 && (
                <Text style={styles.quantity}>Jumlah: {item.quantity} kg</Text>
              )}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleEditItem(item.id)}
              >
                <Edit2 color="#4CAF50" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Trash2 color="#4CAF50" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddVegetable}>
        <Plus color="white" size={24} />
      </TouchableOpacity>

      {isAdding && (
        <View style={styles.editForm}>
          <Text style={styles.formTitle}>Tambah Sayuran Baru</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Nama Sayuran"
            value={newVegetable.name}
            onChangeText={(text) => setNewVegetable({ ...newVegetable, name: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Harga"
            keyboardType="numeric"
            value={String(newVegetable.price)}
            onChangeText={(text) => setNewVegetable({ ...newVegetable, price: Number(text) })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Berat (Kg)"
            keyboardType="numeric"
            value={String(newVegetable.weight)}
            onChangeText={(text) => setNewVegetable({ ...newVegetable, weight: Number(text) })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewVegetable}>
            <Text style={styles.saveButtonText}>Tambah Sayuran</Text>
          </TouchableOpacity>
        </View>
      )}

      {editingItem && (
        <View style={styles.editForm}>
          <Text style={styles.formTitle}>Edit Sayuran</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Nama Sayuran"
            value={editingItem.name}
            onChangeText={(text) => setEditingItem({ ...editingItem, name: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Harga"
            keyboardType="numeric"
            value={String(editingItem.price)}
            onChangeText={(text) => setEditingItem({ ...editingItem, price: Number(text) })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Berat (Kg)"
            keyboardType="numeric"
            value={String(editingItem.weight)}
            onChangeText={(text) => setEditingItem({ ...editingItem, weight: Number(text) })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
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
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContent: {
    marginBottom: 12,
  },
  vegetableName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'black',
  },
  quantity: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editForm: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

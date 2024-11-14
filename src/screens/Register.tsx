import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import axios from 'axios';

// Types for navigation and form data
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

// Register Screen Component
const Register = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    const {name, email, password, confirmPassword} = formData;

    try {
      const response = await axios.post('https://0ds64v55-3000.asse.devtunnels.ms/register', {
        username: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        console.log(response);
        
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error && (error as any).response?.data) {
        Alert.alert(
          'Error',
          (error as any).response.data.message || 'Registration failed',
        );
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.formContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={'grey'}
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@gmail.com"
            placeholderTextColor={'grey'}
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="password"
              placeholderTextColor={'grey'}
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={24} color="#666" />
              ) : (
                <EyeOff size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="password"
              placeholderTextColor={'grey'}
              value={formData.confirmPassword}
              onChangeText={text =>
                setFormData({...formData, confirmPassword: text})
              }
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <Eye size={24} color="#666" />
              ) : (
                <EyeOff size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>DAFTAR</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Sudah Punya Akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 100,
    marginVertical: 40,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: 'black',
  },
  eyeIcon: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#4CAF50',
  },
});

export default Register;

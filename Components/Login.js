import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailPhoneLogin = async () => {
    setLoginModalVisible(true);
  };

  const handleLoginSubmit = async () => {
    if (!password || !(email || phone)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: loginMethod,
          email: loginMethod === 'email' ? email : undefined,
          phone: loginMethod === 'phone' ? phone : undefined,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        setLoginModalVisible(false);
        // Navigate to main app screen
        navigation.replace('Home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Implement Facebook login logic here
      const response = await fetch('http://localhost:8000/api/auth/facebook/callback', {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        // Navigate to main app screen
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Facebook login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Facebook login failed. Please try again.');
      console.error('Facebook login error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#FFE5EC', '#E5F0FF', '#E0FFE5']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons 
            name="baby-face-outline" 
            size={100} 
            color="#FF69B4"
          />
          <Text style={styles.title}>BINIBABY</Text>
        </View>

        {/* Login Options */}
        <View style={styles.buttonContainer}>
          {/* Facebook Login Button */}
          <TouchableOpacity 
            style={styles.facebookButton}
            onPress={handleFacebookLogin}
          >
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Phone/Email Button */}
          <TouchableOpacity 
            style={styles.phoneEmailButton}
            onPress={handleEmailPhoneLogin}
          >
            <FontAwesome name="user" size={20} color="#666" />
            <Text style={styles.phoneEmailButtonText}>
              Use phone number / Email account
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => setLoginModalVisible(true)}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.loginOptions}>
              <TouchableOpacity
                style={[
                  styles.loginOptionButton,
                  loginMethod === 'email' && styles.activeOption,
                ]}
                onPress={() => setLoginMethod('email')}
              >
                <Text style={styles.loginOptionText}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.loginOptionButton,
                  loginMethod === 'phone' && styles.activeOption,
                ]}
                onPress={() => setLoginMethod('phone')}
              >
                <Text style={styles.loginOptionText}>Phone</Text>
              </TouchableOpacity>
            </View>

            {loginMethod === 'email' ? (
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.modalButton, loading && styles.disabledButton]}
              onPress={handleLoginSubmit}
              disabled={loading}
            >
              <Text style={styles.modalButtonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLoginModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    letterSpacing: 1,
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facebookButtonText: {
    color: '#1877F2',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  phoneEmailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneEmailButtonText: {
    color: '#666',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#7FE5FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpText: {
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#FF69B4',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  loginOptions: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  loginOptionButton: {
    padding: 10,
    width: 120,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#FF69B4',
  },
  loginOptionText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#7FE5FF',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default Login; 
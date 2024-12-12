import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="baby-face-outline" size={100} color="#4A90E2" />
        <Text style={styles.title}>BINIBABY</Text>
      </View>

      {/* Login Buttons */}
      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.phoneButton}>
        <Text style={styles.buttonText}>Use phone number / Email account</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  facebookButton: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phoneButton: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#4A90E2',
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

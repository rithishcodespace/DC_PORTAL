import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
// No useNavigate in React Native — use `navigation` from props

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const isStaticLoginSuccessful = handleStaticLogin(username, password, navigation);

    if (!isStaticLoginSuccessful) {
      handleLogin(username, password, navigation);
    }
  };

  const handleStaticLogin = (user, pass, nav) => {
    if (user === 'admin' && pass === '1234') {
      nav.navigate('Home'); // Make sure 'Home' screen exists
      return true;
    }
    return false;
  };

  const handleLogin = async (user, pass, nav) => {
    // Replace this with real API later
    Alert.alert('Login Failed', 'Invalid credentials');
  };

  const handleGoogleLogin = (nav) => {
    Alert.alert('Google Login', 'Google login not implemented in mobile yet.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>


      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.googleButton} onPress={() => handleGoogleLogin(navigation)}>
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
    fontFamily: 'tahoma',
    color: 'black',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontFamily: 'tahoma',
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 20
  },
  orText: {
    fontSize: 18,
    marginTop: 24,
    textAlign: 'center',
    fontFamily: 'tahoma',
  },
  loginButton: {
  marginTop: 12,
  height: 50,
  backgroundColor: '#007BFF',
  borderRadius: 10, 
  justifyContent: 'center',
  alignItems: 'center',
},
loginText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'tahoma',
},

  googleButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontFamily: 'tahoma',
    fontSize: 16,
  },
});
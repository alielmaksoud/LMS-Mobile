
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import React, { useState, useEffect } from 'react';
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import BackButton from '../components/BackButton'
import axios from 'axios'
import asyncstorage from '@react-native-community/async-storage'






const LoginScreen = ({ navigation }) => {
const [email, setEmail] = useState({ value: '', error: '' })
const [password, setPassword] = useState({ value: '', error: '' })
useEffect(() => {
});

const onLoginPressed = async => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
    }else{
        axios.post('http://192.168.0.109:8000/api/login',
        {
          email: email.value,
          password:password.value
        })
        .then(res => {
      
            console.log( "On log in press >>>>",res.data);
             navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
            })
             
        })
        .catch((error) => {
        if(error){  
          alert(error);
          
        }
        })

    }

}

return (
<Background>
<BackButton goBack={navigation.goBack} />
<Logo />
<Header>Welcome back.</Header>
<TextInput
label="Email"
returnKeyType="next"
value={email.value}
onChangeText={(text) => setEmail({ value: text, error: '' })}
error={!!email.error}
errorText={email.error}
autoCapitalize="none"
autoCompleteType="email"
textContentType="emailAddress"
keyboardType="email-address"
/>
<TextInput
label="Password"
returnKeyType="done"
value={password.value}
onChangeText={(text) => setPassword({ value: text, error: '' })}
error={!!password.error}
errorText={password.error}
secureTextEntry
/>
<View style={styles.forgotPassword}>
<TouchableOpacity
onPress={() => navigation.navigate('ForgotPasswordScreen')}
>
<Text style={styles.forgot}>Forgot your password?</Text>
</TouchableOpacity>
</View>
<Button mode="outlined" onPress={onLoginPressed}>
Login
</Button>
</Background>
)
}

const styles = StyleSheet.create({
forgotPassword: {
width: '100%',
alignItems: 'flex-end',
marginBottom: 24,
},
row: {
flexDirection: 'row',
marginTop: 4,
},
forgot: {
fontSize: 13,
color: theme.colors.secondary,
},
link: {
fontWeight: 'bold',
color: theme.colors.primary,
},
})

export default LoginScreen 
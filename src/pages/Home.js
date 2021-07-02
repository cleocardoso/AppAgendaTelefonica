import React, { useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { MyInput } from '../components/MyInput';

export function Home(){
   
    const [user,setUser] = useState('');
    const [phone,setPhone] = useState('');
   

   

    return(
        <View style={ styles.container}>
            <View style={ styles.head }>
                <Text style={styles.titlehead}>AGENDA TELEFÔNICA</Text>
            </View>
            
            <View style={styles.formContainer}>
                <MyInput iconName="user" textInput="Nome" value={user} onChangeText={setUser} /> 
                <MyInput iconName="phone" textInput="Telefone" value={phone} onChangeText={setPhone} keyboardType="numeric" /> 
                
                <MyInput/>

                <TouchableOpacity style={ styles.button }>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>

          
           
            
        </View>

    );
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 40,
        alignItems: 'center',
    },
    head:{
        width: '100%',
        height: 35,
        marginTop:-40,
        backgroundColor: '#613EEA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titlehead:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        
    },
    formContainer:{
        width: "85%",
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    button: {
        backgroundColor: '#613EEA',
        padding: 10,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
        width: 300,
        
    },
    buttonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    
    

});
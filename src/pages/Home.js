import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList, Alert, Keyboard} from 'react-native';
import { MyInput } from '../components/MyInput';
import  ItemContact  from '../components/ItemContact';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Home() {

    const keyAsyncStorage = "@agenda1:contatos";

    const [user, setUser] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contacts, setContacts] = useState([]);

    async function clear(){
        await AsyncStorage.clear();
    }

    async function salvarContato() {
        const data = {
            id: String(new Date().getTime()),
            name: user,
            telefone: telefone
        }
        const vetData = [...contacts, data]  
        try {
            await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
        } catch (error) {
            Alert.alert("Erro ao salvar contatos");
        }

        Keyboard.dismiss();
        setUser("");
        setTelefone("");
        loadData();
        
    }
    async function deletarContato( id ) {
        const newData = contacts.filter( item => item.id != id );
        await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify( newData ));
        
        //setContacts(newData); 
        await loadData()
    }

    async function loadData(){
        try{
            const retorno = await AsyncStorage.getItem(  keyAsyncStorage  );   
            const dadosContacts = await JSON.parse( retorno )
            console.log( 'loadData -> ', dadosContacts );
            setContacts( dadosContacts || [] );
        }catch(error){
            Alert.alert("Erro na leitura  dos contatos");
        }
    }

    useEffect( ()=>{
       // clear()
        loadData();      
    } , []);


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.titlehead}>AGENDA TELEFÔNICA</Text>
            </View>
            
            <View style={styles.formContainer}>
                <MyInput iconName="user" textInput="Nome" value={user} onChangeText={(e) => setUser(e)} />
                <MyInput iconName="phone" textInput="Telefone" value={telefone} onChangeText={(e) => setTelefone(e)} keyboardType="numeric" />



                <TouchableOpacity style={styles.button} onPress={salvarContato}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                <Text style={styles.titleList}>Meus Contatos</Text>
                
                <FlatList data={contacts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ItemContact nome={item.name} telefone={item.telefone} apagar={() => deletarContato(item.id)} />
                    )}
                />
            </View>


        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        alignItems: 'center',
    },
    head: {
        width: '100%',
        height: 35,
        marginTop: -40,
        backgroundColor: '#613EEA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titlehead: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',

    },
    formContainer: {
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
    list: {
        width: "90%",
    },
    titleList: {
        marginTop: 40,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }

});
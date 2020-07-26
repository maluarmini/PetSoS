import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import logo from '../../assets/bg.png';
import {FontAwesome} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';

export default function Home(){
    const navigation = useNavigation();
    function handleNavigate(){
        navigation.navigate('Create');
    }
    function handleNavigateMap(){
        navigation.navigate('MapPage');
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={{width:70, height:70}} source={logo} />
                <Text style={{fontSize:32, fontWeight:'500',margin:10}}>PETSOS</Text>
            </View>
            <View>
                <Text style={styles.text}>Cadastre um pedido de ajuda para um bichinho e encontre pessoas dispostas a ajudar.</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleNavigate}>
                <FontAwesome name="sign-in" size={29} color="#fff"/>
                <Text style={styles.textBtn}>Cadastrar pedido de socorro</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap} onPress={handleNavigateMap}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <View style={{right:35}}>
                        <FontAwesome name="sign-in" size={29} color="#fff"/>
                    </View>
                <Text style={styles.textBtn}>Ajudar um bichinho</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    logo: {
        
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        top:-160
    },
    btn: {
        backgroundColor:'#3B0D90',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        borderRadius:12,
        bottom: -160
    },
    btnMap: {
        marginTop:5,
        backgroundColor:'#3B0D90',
        // paddingHorizontal: 100,
        width:300,
        padding:20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        borderRadius:12,
        bottom: -160
    },
    textBtn: {
        fontSize:16,
        color:'#FFF',
        marginHorizontal: 10
    },
    text: {
        fontSize:22,
        marginHorizontal:10,
        color:'#3B0D90'
    }
})
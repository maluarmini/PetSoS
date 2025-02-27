import React,{useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity,SafeAreaView,Image,Text,Linking} from 'react-native';
import {Feather as Icon,FontAwesome} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler'
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const {id} =route.params;
    const [data, setData] = useState({});

    useEffect(() => {
      api.get(`points/${id}`).then(response => {
        setData(response.data);
      })
    }, [])


    function handleNavigateBack(){
        navigation.goBack();
    }
    function handleWhatsapp(){
      Linking.openURL(`whatsapp://send?phone=${data.whatsapp}&text=Tenho interesse em adotar esse bichinho <3`);
    }
    function handleComposeMail(){
      MailComposer.composeAsync({
        subject: 'Interesse em adotar esse bichinho <3',
        recipients: [data.email],
    })
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
           <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={20} color="#5126a8"/>
            </TouchableOpacity>
            <Image style={styles.pointImage} source={{uri : data.image_url}}/>
            <Text style={styles.pointName}>{data.name}</Text>
            {/* <Text style={styles.pointItems}>{}</Text> */}
            <View style={styles.address}>
            <Text style={styles.addressTitle}>{data.city}</Text>
                <Text style={styles.addressContent}>{data.uf}</Text>
            </View>

        </View>
        <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleWhatsapp}>
                <FontAwesome name="whatsapp" color="#fff" size={20}/>
                <Text style={styles.buttonText}>Whatsapp</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={handleComposeMail}>
                <Icon name="mail" color="#fff" size={20}/>
                <Text style={styles.buttonText}>E-mail</Text>
            </RectButton>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
    //   fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
    //   fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
    //   fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
    //   fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: 0,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#5126a8',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
    //   fontFamily: 'Roboto_500Medium',
    },
  });

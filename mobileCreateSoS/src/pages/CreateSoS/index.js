import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,TouchableOpacity,KeyboardAvoidingView,Platform } from 'react-native';
import ImagePickerExpo from '../../components/ImagePickerExpo';
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';


export default function Create(){
    const [location, setLocation] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const navigation = useNavigation();
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
        //   setLocation([location.coords.latitude,location.coords.longitude]);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          console.log(latitude)
        })();
      },[]);

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled={Platform.OS === 'ios'}>
        <ScrollView style={{flex:1,marginTop:25}}>
        <ImagePickerExpo navigation={navigation} latitude={latitude} longitude={longitude}/>
        
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        marginHorizontal:10,
        fontSize: 16,
        fontWeight: "500"
    },
    textInput : {
        marginHorizontal:10,
        borderWidth: 1,
        padding:10,
        borderColor: '#999',
        borderRadius:10
    },
    btn: {
        marginTop:15,
        marginHorizontal:10,
        borderRadius: 10,
        padding:20,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#3B0D90'
    },
    textBtn: {
        color: '#fff',
        fontSize: 16
    }
})
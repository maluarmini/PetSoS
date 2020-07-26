import React,{useState,useEffect} from 'react';
import {View,StyleSheet, TouchableOpacity, Text,Image,SafeAreaView,StatusBar} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import api from '../../services/api';
import * as Location from 'expo-location'
import { Feather as Icon,MaterialIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';

export default function MapPage(){
    const [initialPosition,setInitialPosition] = useState([0,0]);
    const [points, setPoints] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        async function loadPosition(){
          const { status } = await Location.requestPermissionsAsync();
          if(status !== 'granted'){
            alert('Oooops', 'Precisamos de sua permissão para obter sua localização');
            return;
          }
          const location = await Location.getCurrentPositionAsync();
  
          const {latitude, longitude} = location.coords;
          setInitialPosition([latitude,longitude])
          
        }
        loadPosition();
      },[]);

    useEffect(() => {
        api.get('points').then(response => {
            setPoints(response.data);
        });
    }, []);
    function handleNavigateBack(){
        navigation.goBack();
    }
    function handleNavigateToDetail(id){
        navigation.navigate('Detail',{id});
    }
    async function resetMyLocation(){
        const location = await Location.getCurrentPositionAsync();
  
          const {latitude, longitude} = location.coords;
          setInitialPosition([latitude,longitude])
    }
    return (
        <>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        {/* <SafeAreaView style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}> */}
        
        
        {/* </SafeAreaView> */}
        <View style={styles.container}>
          

            <MapView
                style={styles.map}
                loadingEnabled={true}
                region={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                }}
            >
                {points.map(point => (
                       <Marker 
                       key={point._id}
                       style={styles.mapMarker} 
                       coordinate={{
                       latitude:point.latitude,
                       longitude:point.longitude,
                       }}
                       onPress={() => handleNavigateToDetail(point._id)}
                       >
                           <View style={styles.mapMarkerContainer}>
                               {console.log(point.image_url)}
                           <Image style={styles.mapMarkerImage} source={{uri : point.image_url}} />
                           {/* <Text style={styles.mapMarkerTitle}>{point.name}</Text> */}
                           </View>
                       </Marker>
                     ))}     
            </MapView>
            <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={20} color="#5126a8"/>
        </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton} onPress={resetMyLocation}>
            <MaterialIcons name="my-location" color={'#fff'} size={30} />
            </TouchableOpacity>
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
  
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
       },
       mapMarker: {
        width: 70,
        height: 70,
        borderRadius:35, 
      },
    
      mapMarkerContainer: {
        width: 70,
        height: 70,
        borderRadius:35,
        backgroundColor: '#5126a8',
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems: 'center'
      },
    
      mapMarkerImage: {
        width: 80,
        height: 80,
        borderRadius:40,
        resizeMode: 'cover',
      },
      locationButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 150,
        marginTop: -25,
        marginBottom:10,
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 8,
      },
      backButton: {
        marginTop: -25,
        marginBottom:10,
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 8,
        right:150,
        top:-550
      }
  });
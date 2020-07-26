import React from 'react';
import { ImageEditor, Button, Image, View,TextInput,Text,TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import styles from './styles';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };
  constructor(props){
    super(props)
    this.state = {
        name:'',
        whatsapp:'',
        email:'',
        city:'',
        uf:''
    }
    this.handleCreate = this.handleCreate.bind(this);
}
  
  render() {
    
    let { image, } = this.state;

    return (
      
        <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Selecione uma imagem"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode: 'contain' }
          
          } />}
        </View>
        <View style={{flex:1}}>
        <Text style={{marginHorizontal:10,fontSize: 16,fontWeight: "500"}}>Título</Text>
        <TextInput autoCapitalize="sentences" autoCorrect={true} style={{marginHorizontal:10,borderWidth: 1,padding:10,borderColor: '#999',borderRadius:10}}  value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>
        <Text style={{marginHorizontal:10,fontSize: 16,fontWeight: "500"}}>Whatsapp</Text>
        <TextInput keyboardType='numeric' style={{marginHorizontal:10,borderWidth: 1,padding:10,borderColor: '#999',borderRadius:10}} value={this.state.whatsapp} onChangeText={(text) => this.setState({whatsapp:text})}/>
        <Text style={{marginHorizontal:10,fontSize: 16,fontWeight: "500"}}>E-mail</Text>
        <TextInput keyboardType='email-address' style={{marginHorizontal:10,borderWidth: 1,padding:10,borderColor: '#999',borderRadius:10}} value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
        <Text style={{marginHorizontal:10,fontSize: 16,fontWeight: "500"}}>Cidade</Text>
        <TextInput autoCapitalize="words" autoCorrect={false} autoCorrect={false} style={{marginHorizontal:10,borderWidth: 1,padding:10,borderColor: '#999',borderRadius:10}} value={this.state.cidade} onChangeText={(text) => this.setState({city:text})}/>
        <Text style={{marginHorizontal:10,fontSize: 16,fontWeight: "500"}}>UF</Text>
        <TextInput maxLength={2} autoCapitalize='characters' autoCorrect={false} style={{marginHorizontal:10,borderWidth: 1,padding:10,borderColor: '#999',borderRadius:10}} value={this.state.uf} onChangeText={(text) => this.setState({uf:text})}/>
        <TouchableOpacity onPress={this.handleCreate} style={{marginTop:15,marginHorizontal:10,borderRadius: 10,padding:20,alignItems:"center",justifyContent:'center',backgroundColor:'#3B0D90'}}>
            <Text style={{color: '#fff',fontSize: 16}}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCancel} style={{marginTop:15,marginHorizontal:10,borderRadius: 10,padding:20,alignItems:"center",justifyContent:'center',backgroundColor:'#A496BA'}}>
            <Text style={{color: '#fff',fontSize: 16}}>Cancelar</Text>
        </TouchableOpacity>
        </View>
        
      </>
    );
  }
  handleCancel = async () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }
  handleCreate = async () => {
    const { navigate } = this.props.navigation;
    const {latitude} = this.props;
    const {longitude} = this.props;
      console.log(this.state.name,this.state.email,this.state.image) // OK
      const name = this.state.name;
      const whatsapp = this.state.whatsapp;
      const email = this.state.email;
      const city = this.state.city;
      const uf = this.state.uf;
      const image_name = this.state.image;
      try {
            const response = await api.post('pointsmobile',{
              name,
              whatsapp,
              email,
              city,
              uf,
              latitude,
              longitude,
              image_name,
            });
            console.log(response);
            
            navigate('Home');
            alert('Cadastrado com sucesso');
          } catch (error) {
            console.log('ERRRORRRRRRRRRR',error);
          }  
      
      //Chamar a api e criar
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    
    if (result.cancelled) {
      console.log('got here');
      return;
    }
    this.setState({ image: result.uri });

  };
  
};



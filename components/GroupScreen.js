import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList, PermissionsAndroid, ListView, Group} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Input, Icon, Left, Body, Right } from 'native-base';
import Contacts from 'react-native-contacts';
import { Image } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default class GroupScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      groupName:'Bugging'
    }
  }


  render(){
    const {contactNumbers} = this.props.route.params 
    return(
      <ScrollView>
        <View>
          <View style={{marginLeft:80}}>
          <Image style={{height:180, width:200}} source={require('../assets/newimage.png')}/>
          </View>
          <View style={{marginTop:20,marginLeft:15}}>
            <TextInput
            style={{fontWeight:'bold', fontSize:17}}
            value={this.state.groupName}
            onChangeText={(groupName) => this.setState({groupName})}
            />
            <View style={{borderBottomColor:'black',borderBottomWidth:2, marginTop:-5}}/>
          </View>
          <View style={{marginTop:30, marginLeft:15}}>
            <Text style={{marginBottom:10}}>Participants</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ContactList')}>
              <Text style={{fontWeight:'bold'}}>Add Participants</Text>
            </TouchableOpacity>
            {/* <Button title="Add" onPress={()=> this.props.navigation.navigate('ContactList')}/> */}
            <View style={{borderBottomColor:'black',borderBottomWidth:1, marginTop:15, opacity:0.5}}/>
            <View style={{marginTop:10}}>
            {contactNumbers}
            </View>
          </View>
          <Button style={{width:300, marginLeft:20, marginTop:10, justifyContent:'center'}} rounded dark title="Save"><Text>Save</Text></Button>
          <Button style={{width:300, marginLeft:20, marginTop:10, justifyContent:'center'}} rounded light title="Canccel"><Text>Cancel</Text></Button>
        </View>
        </ScrollView>
    )
  }
}

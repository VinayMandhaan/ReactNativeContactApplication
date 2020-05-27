import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid, Button, ListView, Group} from 'react-native';
import Contacts from 'react-native-contacts';
import { TextInput } from 'react-native-gesture-handler';
import Routes from './components/Routes'
import ContactList from './components/ContactList'



export default class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Routes/>
    )
  }
}

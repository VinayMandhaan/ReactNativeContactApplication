import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid, Button, ListView, Group} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Icon, Input, Item } from 'native-base';
import Contacts from 'react-native-contacts';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import UserAvatar from 'react-native-user-avatar';


export default class ContactList extends Component {
  state={
    contacts: [],
    inMemoryContact : [],
    handleParticipants: [],
    imgGroup:[],
    groupUser:[],
    selectedItem:true,
    tempList:[]
  }

  async componentDidMount(){
  
  if(Platform.OS === 'android'){
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
        } else {
          // contacts returned in Array
          this.setState({contacts, inMemoryContact:contacts})
        }
      })
    })
  }
  }

  //Search Contact

  searchContacts = (value) => {
    const filteredContacts = this.state.inMemoryContact.filter(
      contact => {
        let contactLowerCase = (contact.givenName).toLowerCase()
        let searchTerm  = value.toLowerCase()
        return contactLowerCase.indexOf(searchTerm) > -1
      }
    )
    this.setState({
      contacts : filteredContacts
    })
  }

  //Deselect Contact

  deleteContact = (name) => {
    var array = this.state.groupUser
    var index = array.indexOf(name)
    console.warn(index)
    if(index !== -1){
      array.splice(index,1)
      this.setState({
        groupUser : array
      })
    }
  }



  render () {
    return (
      <View style={styles.container}>
        <Item>
        <Input
        style={{textAlign:'center'}}
        placeholder="Search"
        onChangeText={(value)=>this.searchContacts(value)}
        />
        </Item>

        {/* Select Contacts */}
        <ScrollView horizontal={true}>
        <View style={{flexDirection:'row', marginBottom:10}}>
        {  
          this.state.groupUser.map(grp => (
            <View style={{flexDirection:'row'}}>
              <UserAvatar  size={40} style={{width:40, height:40, fontSize:20}} name={grp}/>
              <Text>{' '}</Text>
              <Text style={{marginTop:10, fontWeight:'bold'}}>{grp}</Text>
              <View style={{borderLeftWidth:2, borderLeftColor:'black', marginLeft:5, marginRight:5}}></View>
            </View>
          )) 
        } 
        
        </View>
        </ScrollView>

        {/* Submit Selected Contacts */}
        <Button title="Submit" onPress={()=>{this.props.navigation.navigate('GroupScreen',{
          contactNumbers: this.state.groupUser.map(grp => (
            <ScrollView>
            <View style={{flexDirection:'row'}}>
              <UserAvatar  size={40} style={{width:40, height:40, fontSize:20}} name={grp}/>
              <Text>{' '}</Text>
              <Text style={{marginTop:10, fontWeight:'bold', marginBottom:20}}>{grp}</Text>
            </View>
            </ScrollView>
          ))
        })}}/>

        {/* ContactList */}
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={()=>
              {
                var phnNum
                item.phoneNumbers.map(phone=>(
                  phnNum = phone.number
                ))
                
                //Check if the name exist in the selected contacts
                this.state.groupUser.indexOf(item.givenName) > -1 ? this.deleteContact(item.givenName) : 
                this.setState({
                  handleParticipants:[...this.state.handleParticipants, item.givenName,phnNum],
                  tempList : [...this.state.tempList, item.givenName],
                  groupUser:[...this.state.groupUser, item.givenName],
                  selectedItem : !this.state.selectedItem
                },()=>{
                  console.warn(this.state.groupUser)
                })

 
                // {item.phoneNumbers.map(phone => (
                //   this.state.groupUser.indexOf(item.givenName) > -1 ? null : 
                //   this.setState({
                //     handleParticipants:[...this.state.handleParticipants, item.givenName,phone.number],
                //     tempList : [...this.state.tempList, item.givenName],
                //     groupUser:[...this.state.groupUser, item.givenName],
                //     selectedItem : !this.state.selectedItem
                //   },()=>{
                //     // console.warn(this.getAvatarInitials(item.givenName))
                //     console.warn(this.state.groupUser)
                //     // console.warn(item.givenName)
                //   })
                // ))}
              }
              }>
              <Content>
              <List>
              <ListItem>
              <Left>
              <UserAvatar size={40} style={{width:40, height:40, fontSize:20}} name={item.givenName} />
        
              </Left>
              <Body>
              <Text style={styles.contact_details}>
                {`${item.givenName} `} {item.familyName} 
              </Text>
             
              {item.phoneNumbers.map(phone => (
                <Text style={styles.phones}> {phone.number}</Text>
                
              ))}
              </Body>
              </ListItem>
              </List>
              </Content>
              <View style={{borderBottomColor:'black',borderBottomWidth:1, opacity:0.1}}>

              </View>
              </TouchableOpacity>
            </View>
            
            
            
          )}
          
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  phones: {
  },
  contact_details: {

  },
});






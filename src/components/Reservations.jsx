import React, { useState } from 'react'
import Header from './Header'
import {Text,FlatList} from 'react-native'
import { withStyles } from '@material-ui/core/styles'
import { Card,Button, ListItem, Icon } from 'react-native-elements'
import {View,Picker} from 'react-native'
import {Divider} from 'react-native-material-ui'
import List from '@material-ui/core/List';
import ModalDropdown from 'react-native-modal-dropdown';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'
import {TouchableWithoutFeedback} from 'react-native'
import {Keyboard} from 'react-native'
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const list = [
    {
      "parkingId":64,
        "dateFrom": "2020-01-19 09:00:00",
        "dateTo": "2020-01-19 11:00:00",
        "userFirstName": "Ala",
        "userLastName": "Maja",
        "userEmail": "first@last.pl",
        "userToken":"ala"
    },
    {
      "parkingId":64,
        "dateFrom": "2020-01-20 09:00:00",
        "dateTo": "2020-01-20 11:00:00",
        "userFirstName": "Maja",
        "userLastName": "Ala",
        "userEmail": "first@last.pl",
        "userToken":"ala"
    }
  ]
  function Item({ id, title, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

class Reservations extends React.Component{
   constructor(props){
       super(props);
       this.state={
         data: props,
         reservationCount: 1
       }
   }
clickReservation=(item,number)=>
{
  const {navigation} = this.props
  const cityData = JSON.stringify(navigation.getParam('city'));
        const city=cityData.substr(1,cityData.length-2);
        const streetData = JSON.stringify(navigation.getParam('street'));
        const street = streetData.substr(1,streetData.length-2);
  console.log(item);
  const {navigate} = this.props.navigation;
  return navigate('ReservationDetails',{reservation: item, reservationNumber: number,city: city, street: street});
}
getParkingsByOwnerId=(id)=>{
    return fetch('http://192.168.0.17:8080/parkingOwner'
        , {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            dataType: 'json'
            }
          }).then((response) => response.json())
}
keyExtractor = (item, index) => index.toString()
incrementCounter = () =>{this.setState({reservationCount: this.state.reservationCount+1})}
findReservationNumer(index)
{
  return index+1;
}
renderItem = ({ item,index }) => (
    //"#"+this.findReservationNumer(index)+". " +
  <ListItem
    title={moment(item.dateFrom).format("MMM Do, hA") + " - " + moment(item.dateTo).format("MMM Do, hA")}
    bottomDivider
    //chevron
    onPress={this.clickReservation.bind(this,item,this.findReservationNumer(index))}
    //onBlur={this.incrementCounter}
  />
  
)

    render(){
        //const { navigation } = this.state.owner;
        const { navigation } = this.props;
        const cityData = JSON.stringify(navigation.getParam('city'));
        const city=cityData.substr(1,cityData.length-2);
        const streetData = JSON.stringify(navigation.getParam('street'));
        const street = streetData.substr(1,streetData.length-2);
        const reservationList = navigation.getParam('reservations','no data')
        console.log('Reservation list w Reservations')
        console.log(reservationList)
        //this.setState({reservationCount: list.length})
    return(
        //<Text>Owner info: First name: {owner.firstName}</Text>
        
       
        
    <View style={{backgroundColor: '#E5CDC8', flex: 1, justifyContent: "flex-start"} }>
        <Header title={city+", "+street} fontSize='25' ></Header>
        
        <Card style={{backgroundColor: '#C5979D',flex: 1 }}>
            <Divider style={{height: 100, backgroundColor: '#E5CDC8'}}/>
            <FlatList
            ListHeaderComponent={<Text style={styles.listHeader}>Current reservations:</Text>}
            keyExtractor={this.keyExtractor}
            data={reservationList}
            renderItem={this.renderItem}
            />
        </Card>
        
    </View>
    )
    }
}

const styles = {
    
    card:{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '550px',
        width: '450px',
        square:'true',
        backgroundColor: '#ffffff'

    },

    grid:{
        flexBasis: '25%',
        height:'100%'
    },
    
    field:{
        backgroundColor:'#ffffff',
        width:'80%',
        margin:'10px',
        '& p':{
            color:'#000000',
          },
       
    },

    button:{
        backgroundColor:'#ffffff',
        color:'#888888',
        height: '50px',
        width:'60%',
        margin:'40px'
    },
    
    header:{
        textAlign: 'center',
        fontSize: 10

    },

    listHeader:{
            fontSize: 20,
            fontWeight: 'normal',
            color: '#331832',
            textAlign: 'center',
    }


}

export default withStyles(styles)(Reservations)


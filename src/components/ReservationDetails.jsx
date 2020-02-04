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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import {TouchableWithoutFeedback} from 'react-native'
import {Keyboard} from 'react-native'

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

class ReservationDetails extends React.Component{
   constructor(props){
       super(props);
       this.state={
         data: props,
         tableTitle: ['Date From', 'Date To', 'First Name', 'Last Name', 'Email', 'Total Cost'],
         tableData: []
       }
   }


   fillTableData(reservation){
       console.log("jestem w fillTable")
      this.setState({tableData: [[reservation.dateFrom],[reservation.dateTo]]})
   }
   
    render(){
        //const { navigation } = this.state.owner;
        const { navigation } = this.props;
        const cityData = JSON.stringify(navigation.getParam('city'));
        const city=cityData.substr(1,cityData.length-2);
        const streetData = JSON.stringify(navigation.getParam('street'));
        const street = streetData.substr(1,streetData.length-2);
        const reservationNumber = JSON.stringify(navigation.getParam('reservationNumber'));
        const reservation = navigation.getParam('reservation','no data');
       // console.log(reservation)
        const tableInfo = [[moment(reservation.dateFrom).format("MMM Do, hA")],
                          [moment(reservation.dateTo).format("MMM Do, hA")],
                          [reservation.userFirstName],
                          [reservation.userLastName],
                          [reservation.userEmail],
                          [reservation.totalCost+" PLN"]]
        //console.log(tableInfo)
        //this.setState({tableData: [[reservation.dateFrom],[reservation.dateTo]]})
        //this.setState({reservationCount: list.length})
    return(
        //<Text>Owner info: First name: {owner.firstName}</Text>
       
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>       
    <View style={{backgroundColor: '#E5CDC8' ,flex: 1} }>
        
        <Header title={city+", "+street} fontSize='25'></Header>
        <Card style={styles.container}>
            <ScrollView>
        <Table>
          <TableWrapper style={styles.wrapper}>
            <Col data={this.state.tableTitle} heightArr={[60,60,60,60,60,60]} textStyle={styles.text}/>
            <Rows data={tableInfo} flexArr={[1]} heightArr={[60,60,60,60,60,60]} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
        </ScrollView>
        </Card>
    </View>
    </TouchableWithoutFeedback>
    )
    }
}

const styles = {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
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
    text:{
         textAlign: 'center' 
    },
    wrapper:{
       flexDirection: 'row' 
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

export default withStyles(styles)(ReservationDetails)


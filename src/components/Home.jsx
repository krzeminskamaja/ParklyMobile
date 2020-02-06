import React from 'react'
import Header from './Header'
import {Text,FlatList} from 'react-native'
import { withStyles } from '@material-ui/core/styles'
import { Card,Button, ListItem, Icon } from 'react-native-elements'
import {View} from 'react-native'
import {Divider} from 'react-native-material-ui'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { getUserToken,removeUserToken  } from './../actions';
import {Keyboard} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const ip = 'parkly-tuesday.us-east-1.elasticbeanstalk.com'
 
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

class Home extends React.Component{
   constructor(props){
       super(props);
       this.state={
           owner: props,
           navigate: props,
           token: props.navigation.token,
           ownerObject: props,
           reservations:null
       }
   }
   
componentDidMount() {
  this._bootstrapAsync();
}
_bootstrapAsync = () => {

  this.props.getUserToken()
  .then(() => {
    console.log('Home user token '+this.props.token.token)})


};
   
keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
    
  <ListItem
    title={item.city+", "+item.street}
    bottomDivider
    chevron
    onPress={this.clickParking.bind(this,item)}
  />
)
clickParking=(item)=>{
   
      const {help} = this.props;
      console.log('jestesmy w clickparking')
      console.log(this.props.token.token)

      const {navigate} = this.props.navigation;
      var url = 'http://'+ip+'/reservations/parking/'+item.id
    
      return fetch(url,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'User-token': this.props.token.token,
          'User-name': 'parkly'
        }
      }).then((response) => response.json()).then((responseJson)=>{
        console.log('reservations')
        console.log(responseJson)
       return navigate('Reservations',{reservations: responseJson,city: item.city, street: item.street, id: item.id});
      })
      
}
clickParkingMock(city,street)
{
   
        return this.props.navigation('Reservations',city,street);
  
}
_signOutAsync =  () => {
  this.props.removeUserToken()
      .then(() => {
          this.props.navigation.navigate('Home');
      })
};
logOut=()=>{
  this._signOutAsync()
}
    render(){
      Keyboard.dismiss();
        const { navigation } = this.props;

        const owner = navigation.getParam('data', 'no data');
        const tk = navigation.getParam('token', 'no data');
        const ownerObject = navigation.getParam('ownerObject','no data')
        console.log('token w renderze')
        console.log(tk)
        console.log('token ze stanu')
        console.log(this.state.token)
        console.log(ownerObject)
    return(
        
    <View style={{backgroundColor: '#E5CDC8', flex: 1 , justifyContent: "flex-start"} }>
        <Header title={<Text>Hi {ownerObject.name}!</Text>} fontSize='30'>
          
        </Header>
        
         <ScrollView>
         <SafeAreaView>
         <Button 
            title="log out"
            onPress={this.logOut}
           
            buttonStyle={styles.button}>
            
            </Button>
        <Card style={{backgroundColor: '#C5979D'} }>
        
        <FlatList
            ListHeaderComponent={<Text style={styles.listHeader}>Choose parking to see the reservations:</Text>}
            keyExtractor={this.keyExtractor}
            data={owner}
            renderItem={this.renderItem}
            onPress={this.clickParking}
            />
           
        </Card>
        
        
        </SafeAreaView>
        </ScrollView>
        

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
      backgroundColor:'#E5CDC8',
    },
    
    header:{
        textAlign: 'center',
        fontSize: 30
    },

    listHeader:{
            fontSize: 25,
            fontWeight: 'normal',
            color: '#C5979D',
            textAlign: 'center',
    }


}

const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken()),
  removeUserToken: ()=>dispatch(removeUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);


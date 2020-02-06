import React from 'react'
//import crypto, { createHash } from 'crypto'
//import '../../../shim.js'
import { Base64 } from 'js-base64';
import {TextInput} from 'react-native-paper'
import {Card} from 'react-native-material-ui'
import {Divider,Button} from 'react-native-elements'
import {View, Keyboard} from 'react-native'
import {Text} from 'react-native'
import Header from '../Header'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { saveUserToken,getUserToken } from './../../actions';

const ip = 'parkly-tuesday.us-east-1.elasticbeanstalk.com';
const styles = {
    

    button:{
        backgroundColor:'#C5979D'
    },
    
    header:{
        textAlign: 'center',
        fontSize: 20,
        
    },
    textInput:{
        selectionColor: 'red',
        selectTextOnFocus: true,
        borderColor: 'red'

    },
    errorText:{
        color: '#C5979D',
        textAlign: 'center'
    }
}


class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            emailError:'',
            password:'',
            passwordError:'',
            data: '',
            responseId: 0,
            responseToken: '',
            ownerData: null,
            hsh:''
        }
    }
    getParkings=()=>{
        const {navigate} = this.props.navigation;
        console.log('jestem w getparkings')
        var url = 'http://'+ip +'/parkings/my-parkings/' + this.state.responseId
        return fetch(url
        , {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'User-name': 'parkly',
              'User-token': this.state.responseToken
            }
          }).then((response) => response.json()).then(responseJson=>{
              console.log(responseJson)
              this.setState({password:'',email:'',emailError:'', passwordError:''})
            return navigate('Profile',{data:responseJson,token:this.state.responseToken, ownerid: this.state.responseId, ownerObject: this.state.ownerData})
          })
    }
    getOwner=()=>
    {
        console.log('jestem w getowner')
        const {navigate} = this.props.navigation;
        const url = 'http://'+ip+'/parking-owner/'+this.state.responseId
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-name': 'parkly',
                    'User-token': this.state.responseToken
                }
            }
            ).then((response)=>response.json()).then((responseJson)=>{
                console.log(responseJson)
                this.setState({ownerData:responseJson});
            })
    }
    clickLogIn=()=>{
        Keyboard.dismiss();
        console.log('JESTEM W LOGINIE');
        const {navigate} = this.props.navigation;
        const hashP = ''
        const tk = this.props.token
        console.log(Base64.encode(this.state.password));
        const url = 'http://'+ip+'/parking-owner/login'
        return fetch(url
        , {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
              'User-name': 'parkly',
              'User-token': '4be022c1-fb18-436c-b1b8-71cbb6a6de31',
              'Email': this.state.email,
              'Password': Base64.encode(this.state.password).trim()
            }
          }).then((response) => response.json()).then(responseJson=>{
            console.log(responseJson)
            if(responseJson.id==0){
                this.setState({emailError:'zly emial',passwordError:'zle haslo'})
              return;
            }
            this.setState({responseId:responseJson.id,responseToken:responseJson.userToken})
            
            this.props.saveUserToken(this.state.responseToken)
            this.getOwner()
            this.getParkings()
          }).catch(()=>{
              this.setState({emailError:'zly emial',passwordError:'zle haslo'})
              return;
          })
         
        
    }


    render(){
        const { 
            email,
            emailError,
            password,
            passwordError
        } = this.state
        console.disableYellowBox = true;
        console.ignoredYellowBox = ['Warning:']
        
        return(
         
        <ScrollView contentContainerStyle={{backgroundColor: '#E5CDC8',flex: 1, justifyContent: "flex-start"}}>
            <Header title="Parkly" fontSize='30'/>
            <Card style={styles.card}> 
            <Divider style={{height: 30, backgroundColor: '#E5CDC8'}}/>
            <View style={{height: 25}}>
             <Text style={styles.header}>
                Log in
             </Text>
             </View>
             <TextInput
                    label={'Email'}
                    onChangeText={text => this.setState({email:text.trim()})}
                     fullWidth
                    variant={'outlined'}
                    error={emailError.length>0}
                    helperText={emailError}
                    value={email}
                    style={styles.textInput}
                />
                
            <TextInput
                    label={'Password'}
                    onChangeText={text => this.setState({password:text.trim()})}
                    fullWidth
                    error={passwordError.length>0}
                    helperText={passwordError}
                    variant={'outlined'}
                    value={password}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                 
                <Button 
            title="log in"
            onPress={this.clickLogIn}
            disabled={email.length===0 || password.length===0}
            buttonStyle={styles.button}
            override={{backgroundColor: '#C5979D'}}>
            
            </Button>
             </Card>

        </ScrollView>
       
        )
    }
}     

const mapStateToProps = (state) => ({
    token: state.token
  })
  const mapDispatchToProps = dispatch => ({
    saveUserToken: (data) => dispatch(saveUserToken(data)),
    getUserToken: ()=>dispatch(getUserToken())
});
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);

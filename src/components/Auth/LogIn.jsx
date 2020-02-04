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
import {DismissKeyboardView} from './../../../src/DismissKeyboard';
//import {sha1} from './../sha1'
//const ip = '192.168.110.195';
const ip = 'parkly-tuesday.us-east-1.elasticbeanstalk.com';
//const sha1 = require('sha1');
const styles = {
    
    // card:{
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     height: '550px',
    //     width: '450px',
    //     square:'true',
    //     backgroundColor: '#E5CDC8'

    // },
    
    // field:{
    //     backgroundColor:'#ffffff',
    //     width:'80%',
    //     margin:'10px',
    //     '& p':{
    //         color:'#000000',
    //       },
       
    // },

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

async function clickLogIn(nav){
    const {navigate} = nav;
    //znajdz email,jezeli nie ma to blad, jezeli istniej sprawdz haslo, jezeli haslo sie zgadza ->home
    //redux
    try{
    let response = await fetch('http://192.168.0.17:8080/parkingOwner'
    , {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        dataType: 'json'
        }
      });
      let responseJson = await response.json();
      navigate('Profile',{data:responseJson});
      return responseJson;
    }
    catch(error){
        console.error(error);
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
       // sha1(this.state.password).then(hash=>{
        //    console.log('Hash '+hash)
         //   this.setState({hsh:hash})
         //   console.log('Hash ze stanu'+this.state.hsh)}
          //  )
        //this.setState({hsh:sha1().})
        //console.log(createHash('sha1','mini'))
        //passwordHash.generate('mini')
        //sha1(this.state.password).then(hash=>console.log(hash))
        //const sha512Hash = getHash(this.state.password);
        //znajdz email,jezeli nie ma to blad, jezeli istniej sprawdz haslo, jezeli haslo sie zgadza ->home
        //redux
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
            //connect(state => ({ token: state.token }))(LogIn);
            //this.props.dispatch({ type: 'SAVE_TOKEN',payload: '4be022c1-fb18-436c-b1b8-71cbb6a6de31'})
            console.log(responseJson)
            if(responseJson.id==0){
                this.setState({emailError:'zly emial',passwordError:'zle haslo'})
              return;
            }
            this.setState({responseId:responseJson.id,responseToken:responseJson.userToken})
            //console.log(this.state.responseToken)
            this.props.saveUserToken(this.state.responseToken)
            this.getOwner()
            this.getParkings()
          }).catch(()=>{
              this.setState({emailError:'zly emial',passwordError:'zle haslo'})
              return;
          })
         /* 
          .then(user=>{
                  if(user===undefined)
                  {
                      this.setState({emailError: 'niepoprawny email'})
                      return;
                  }
                 if(user.hashPassword!=passwordHash.generate(this.state.password))
                  {
                      console.log(passwordHash.generate(this.state.password))
                      this.setState({passwordError:'niepoprawne haslo dla danego emaila'})
                     return;
                  }
                  const userSend = user
                  this.setState({email:'',password:''})
                  return navigate('Profile',{data:userSend})
                })
                  */
  
        // .then(res => navigate('Profile',{data: res.json()}))
        //  .then(res => res.json().find(user => user.email===this.state.email))
        // .then(user=>{
        //      if(user===undefined)
        //      {
        //          this.setState({emailError: 'niepoprawny email'})
        //          return;
        //      }
          
        //      if(user.password!=this.state.password)
        //      {
        //          this.setState({emailError:'niepoprawne haslo dla danego emaila'})
        //          return;
        //      }

        //   })
        //   .then(res => navigate('Profile',{data: res.json()}))
        
    }

    // _renderItem = data => (
    //     <View style={this.styles.grid} />
    //   );

    render(){
        const { 
            email,
            emailError,
            password,
            passwordError
        } = this.state

        
        
        return(
            
             

        //     <Header title="Parkly" fontSize='30'/>
        //      <Card style={styles.card}> 
        //     <Text style={styles.header}>
        //         Log in
        //     </Text>
        //  {/* <Divider/> */}
        //     <TextInput
        //             label={'Email'}
        //             onChangeText={text => this.setState({email:text.trim()})}
        //             // fullWidth
        //             variant={'outlined'}
        //             error={emailError.length>0}
        //             helperText={emailError}
        //             value={email}
        //             style={styles.textInput}
        //         />
        //     <TextInput
        //             label={'Password'}
        //             onChangeText={text => this.setState({password:text.trim()})}
        //             //fullWidth
        //             error={passwordError.length>0}
        //             helperText={passwordError}
        //             variant={'outlined'}
        //             value={password}
        //             style={styles.textInput}
        //             secureTextEntry={true}
        //         />
        //     {/* <Button 
        //     title="log in"
        //     onPress={this.clickLogIn}
        //     disabled={email.length===0 || password.length===0}
        //     buttonStyle={styles.button}>
            
        //     </Button> */}
            
        //      </Card> 
        //     {this.state.emailError.length>0 || this.state.passwordError.length>0?<Text style={styles.errorText}>Oops! Wrong login or password</Text>:null}
        
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
// //             <Button
// //                 onClick={this.clickLogIn}
// //                 className={button}
// //                 disabled={email.length===0 || password.length===0}
// //                 variant={'contained'}
// //                 color={'primary'}
// //                 >
// //                 login
// // </Button>

const mapStateToProps = (state) => ({
    token: state.token
  })
  const mapDispatchToProps = dispatch => ({
    saveUserToken: (data) => dispatch(saveUserToken(data)),
    getUserToken: ()=>dispatch(getUserToken())
});
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);

// return(
//     <>
//     <Header/>
//     <Card
//         className={card}>
//         {  
//         <View>
//             {
//             <Typography className={header}>
//                 LOGIN
//             </Typography>
// //             <Divider/>
// //             <TextInput
// //                     label={'Email'}
// //                     onChange={e => this.setState({email:e.target.value})}
// //                     value={email}
// //                     error={emailError.length>0}
// //                     helperText={emailError}
// //                     className={field}
// //                     fullWidth
// //                     variant={'outlined'}
// //                 />
// //             <TextInput
// //                 label={'Password'}
// //                 type={'password'}
// //                 onChange={e => this.setState({password:e.target.value})}
// //                 value={password}
// //                 className={field}
// //                 fullWidth
// //                 variant={'outlined'}
// //             />
// //             <Button
// //                 onClick={this.clickLogIn}
// //                 className={button}
// //                 disabled={email.length===0 || password.length===0}
// //                 variant={'contained'}
// //                 color={'primary'}
// //                 >
// //                 login
// // </Button>
// }
// </View> 
// }
//     </Card>
//     </>
// )
// }

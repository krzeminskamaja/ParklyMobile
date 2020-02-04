import React from 'react'

import {Appbar, Button} from 'react-native-paper'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userLogIn } from '../redux/actions'
import { withStyles } from '@material-ui/core'
import { Text } from 'react-native'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: props.title,
            fontSize: props.fontSize,
            ifLogOut: props.ifLogOut
        }
    }

    
    logIn=()=>{
        this.props.history.push('/logIn')
    }

    parkings=()=>{
        this.props.history.push('/parkings')
    }

    logOut=()=>{
        this.props.userLogIn(undefined);
        this.props.history.push("/");
    }
    

    render(){ 
        
        return(
             <Appbar.Header style={styles.header}>
                 <Appbar.Content style={styles.header} title={this.state.text} titleStyle={{fontSize: parseInt(this.state.fontSize,10)}}>
                        {this.state.ifLogOut?<Button title="log out"></Button>:null}
                 </Appbar.Content>
             </Appbar.Header>
             
        )
    }
}
export default (Header);

const styles ={
    header: {
        backgroundColor: '#331832',
        justifyContent: 'space-between'
    },
    titleStyle:{
        fontSize: 30
    }
}

/* <Typography variant='h5' style={{ color: '#565656',width:'50%' }}>
                Parkly
                </Typography>
                {this.props.user===undefined ?
                    <ButtonGroup variant="text" style={{ backgroundColor: '#ffffff',color:'#565656',width:'50%',justifyContent:'flex-end'}}>
                        <Button
                            onClick={this.logIn}>
                            log in
                        </Button>
                        <Button
                            onClick={this.createAccount}>
                            sign up
                        </Button>
                    </ButtonGroup>:
                    <ButtonGroup variant="text" style={{ backgroundColor: '#ffffff',color:'#565656',width:'50%',justifyContent:'flex-end'}}>
                        <Button
                            onClick={this.parkings}>
                            parkings
                        </Button>
                        <Button
                            onClick={this.logOut}>
                            log out
                        </Button>
                    </ButtonGroup>} */
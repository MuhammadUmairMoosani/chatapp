import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../firebase/firebase';
import {AppBar} from 'material-ui';
class CurrentUser extends Component {
    constructor() {
        super();
        this.state = {
            CurrentUser:''
        }
    }
        
    componentWillMount() {
        let ref = firebase.database().ref().child('user');
        ref.on('value',snap => {
            let value = snap.val()
            for(let i in value) {
               if(localStorage.getItem('user') === value[i].email) {
                   this.setState({CurrentUser:value[i].name})
               }
            }
        })

    }
    render() {
        const styles = {
            SignInBar: {
                width:300,
                margin: '0 auto',
                marginTop:100,
            }
        }
        
        return(
            <div>
                <AppBar style={styles.SignInBar} title={"Welcome " + this.state.CurrentUser} showMenuIconButton={false} />
            </div>
        )
    }
}

export default CurrentUser;
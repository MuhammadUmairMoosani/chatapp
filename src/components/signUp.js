import React, { Component } from 'react';
import '../App.css';
import {AppBar,TextField,RaisedButton} from 'material-ui';
import {Link } from 'react-router-dom';
import * as firebase from 'firebase';
import '../firebase/firebase';
import { RingLoader } from 'react-spinners';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:'',
            name:'',
            loading: false
        }
    }
    dataSendFirebase() {
        let data = {
            name:this.state.name,
            email:this.state.email
         }
         firebase.database().ref().child('user').push(data)
    }
    
    SignUpFunc() {
        this.setState({loading:true})
        const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass);
        promise.catch(e => {alert(e.message),this.setState({email:'',pass:'',name:'',loading:false})})
        promise.then(() => {this.dataSendFirebase(),this.props.history.push('/dashboard')})
    
    }
    trueState() {
        const styles = {
            
                 Spinning: {
                   marginLeft:'50%',
                   marginTop:'20%'
                 }
     
             }
             return (
                 <div style={styles.Spinning}>
                   <RingLoader  color={'#123abc'}  loading={this.state.loading} />
                   </div>
                   
               )
    }

    falseState() {
        const styles = {
            SignInBar: {
                width:300,
                margin: '0 auto',
                marginTop:100,
            },
            SignInBtn: {
                marginBottom:20,
                marginTop:50
            }

        }
        return (
            <div className="App">
                     <AppBar style={styles.SignInBar} title="Sign Up" showMenuIconButton={false} />
                     <TextField hintText="Name"  floatingLabelText="Name"  onChange={(text) => this.setState({name:text.target.value})} value={this.state.name}/><br/>
                     <TextField hintText="Email" floatingLabelText="Email" onChange={(text) => this.setState({email:text.target.value})} value={this.state.email}/><br />
                     <TextField hintText="Password" type="password" floatingLabelText="Password" onChange={(text) => this.setState({pass:text.target.value})} value={this.state.pass}/><br />
                     <RaisedButton label="Sign Up" primary={true} style={styles.SignInBtn} onClick={() => this.SignUpFunc()} /><br />
                     <Link to="/"><RaisedButton label="Back" primary={true} /></Link>
             </div>
        )
    }
    render() {
        return (
            <section>
                {
                    this.state.loading ? this.trueState() : this.falseState()

                }
            </section>
        )
 
  

    }
}

export default SignUp;
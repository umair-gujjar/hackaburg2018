import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import RaisedTextButton from '../components/raisedTextButton/index';
import TextButton from '../components/textButton/index';


export default class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    constructor(props) {
  super(props);

  this.press = this.press.bind(this);
 }


    async press(id){
    switch(id){
        case 'signIn' :
            try {
                await AsyncStorage.setItem('@email:key',this.state.username );
                await AsyncStorage.setItem('@password:key',this.state.password );
            } catch (error) {
            // Error saving data
            console.warn("error saving data");
            }
        case 'connectFb' :
        case 'cancel' :
        case 'forgotPass' :
    
}

  }


  render() {
    return (
        <ScrollView style={styles.scroll}>

            <Image source={require('../../assets/images/zoomIcon.png')} style={{width: 200, height: 200, alignSelf:'center'}} />

            <Text >Email</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={(value) => this.setState({username: value})}
                value={this.state.username}
             />
            <Text >Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(value) => this.setState({password: value})}
                value={this.state.password}
            />
            <View style={styles.inline} >
                <Image source={require('../../assets/images/fbIcon.png')} style={{width: 55, height: 55}} />
                    <RaisedTextButton 
                        id='connectFb' 
                        title="Connect with Facebook"
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        titleColor = '#3b5998'
                        style={{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        onPress={this.press.bind(this)}>
                    </RaisedTextButton>
                </View>

   
            <View style={styles.inline , {marginTop: 50}}>
                    <RaisedTextButton 
                        title="Sign In"
                        id='signIn' 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'green',paddingLeft:40,paddingRight:40}}
                        titleColor = 'white'
                        style={{alignSelf:'center',backgroundColor:'green'}}
                        onPress={this.press.bind(this)} />
            </View>
            <View style={styles.inline , {marginTop: 20}}> 
                    <TextButton 
                        title="CANCEL" 
                        id='cancel' 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        titleColor = '#0d8898'
                        style={{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        onPress={this.press.bind(this)} />
            </View>
            <TextButton
                    title="Forgot Login/Pass" 
                    id='forgotPass' 
                    titleStyle={styles.buttonTextStyle,{alignSelf:'flex-end',backgroundColor:'#E1D7D8'}}
                    titleColor = '#0d8898'
                    style={{alignSelf:'flex-end',backgroundColor:'#E1D7D8'}}
                    onPress={this.press.bind(this)} />
        </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
    buttonTextStyle:{
        fontSize: 20,
    },
    scroll: {
        backgroundColor: '#E1D7D8',
        padding: 30,
        backgroundColor: '#E1D7D8'
    },
    label: {
        backgroundColor: '#0d8898',
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInput: {
        height: 40,
        fontSize: 15,
        backgroundColor: '#E1D7D8'
    },
    buttonWhiteText: {
        fontSize: 20,
        backgroundColor: '#FFF',
    },
    buttonBlackText: {
        fontSize: 20,
        backgroundColor: '#595856'
    },
    primaryButton: {
        backgroundColor: '#34A853'
    },
    transparentButton: {
        marginTop: 0,
        borderColor: '#3B5699',
        borderWidth: 2
    },
    buttonBlueText: {
        fontSize: 20,
        backgroundColor: '#3B5699'
    },
    buttonBigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row'
    },
    footer: {
       marginTop: 100
    }
});
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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
 

export default class Login extends Component {

    constructor(props) {
  super(props);
  this.press = this.press.bind(this);
  this.state = {
      myText: 'swipe me',
      gestureName: 'none',
      backgroundColor: '#ffffff00',
    };
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
     const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
        
        <ScrollView style={styles.scroll}>

        <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeUp={(state) => this.onSwipeUp(state)}
            onSwipeDown={(state) => this.onSwipeDown(state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={{
              backgroundColor: 'transparent'
            }}
            >

            <Image source={require('../../assets/images/zoomIcon.png')} style={{width: 200, height: 200, alignSelf:'center'}} />

            <Text style={{fontSize:20,alignSelf:'center'}}>Welcome to the hottest news app</Text>
            <Text style={{fontSize:40,alignSelf:'center'}} >Zoom</Text>
            <Text style={{fontSize:20,alignSelf:'center',textAlign:'center'}}>{"\n"}Write News{"\n"}Challenge Us !{"\n"}Be creative and polite</Text>
   
            <View style={styles.inline , {marginTop: 50,alignItems:'stretch'}}>
                    <RaisedTextButton 
                        title="Tap to Login/Sign up"
                        id="LoginSignUp" 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'#FFFFFF00'}}
                        titleColor = 'white'
                        style={{alignSelf:'stretch',backgroundColor:'#026384'}}
                        onPress={() => this.props.navigation.navigate('login')} />
            </View>
            <View style={styles.inline , {marginTop: 20,alignItems:'stretch'}}> 

                    <TextButton 
                        title="Swipe to Zoom Fire News >>" 
                        id='moveToNews' 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'#E1D7D800'}}
                        titleColor = '#d7490b'
                        style={{alignSelf:'stretch',backgroundColor:'#E1D7D8'}}
                        onPress={() => this.props.navigation.navigate('read')} />
            </View>
        </GestureRecognizer>


        </ScrollView>
    
    )};



  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }
 
  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }
 
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'transparent'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'transparent'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'transparent'});
        break;
      case SWIPE_RIGHT:
        //this.setState({backgroundColor: 'transparent'});
        //console.warn("right");
        //break;
    }
  }
}
const styles = StyleSheet.create({
    buttonTextStyle:{
        fontSize: 40,
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

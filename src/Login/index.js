import React, { PureComponent ,Component} from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet,ToastAndroid,View,Item,Text, ScrollView, Platform,Label,TextInput, Animated, Easing,Image } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import { Button } from 'react-native-material-ui';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Dialog } from 'react-native-simple-dialogs';
import Tags from '../../src/components/Tags';
import routes from '../routes';
import Container from '../Container';
import RaisedTextButton from '../../src/components/raisedTextButton/index';
import TextButton from '../../src/components/textButton/index';

// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
} from '../react-native-material-ui/src';

const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;
        this.state = {
            selected: [],
            dialogVisible: false,
            selectedIndex: 0,
            searchText: '',
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }

    
    onAvatarPressed = (value) => {
        const { selected } = this.state;

        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({ selected });
    }
    onScroll = (ev) => {
        const currentOffset = ev.nativeEvent.contentOffset.y;

        const sub = this.offset - currentOffset;

        // don't care about very small moves
        if (sub > -2 && sub < 2) {
            return;
        }

        this.offset = ev.nativeEvent.contentOffset.y;

        const currentDirection = sub > 0 ? UP : DOWN;

        if (this.scrollDirection !== currentDirection) {
            this.scrollDirection = currentDirection;

            this.setState({
                bottomHidden: currentDirection === DOWN,
            });
        }
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 56, // because the bottom navigation bar has height set to 56
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({ selected: [] })}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: { backgroundColor: 'white' },
                        titleText: { color: 'rgba(0,0,0,.87)' },
                        leftElement: { color: 'rgba(0,0,0,.54)' },
                        rightElement: { color: 'rgba(0,0,0,.54)' },
                    }}
                />
            );
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement="Home"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: value => this.setState({ searchText: value }),
                    onSearchClosed: () => this.setState({ searchText: '' }),
                }}
            />
        );
    }
    showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };
    renderItem = (title, route) => {
        const searchText = this.state.searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                divider
                leftElement={<Avatar text={title[0]} />}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigation.navigate(route)}
            />

        );
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
                        onPress={() =>{}}>
                    </RaisedTextButton>
                </View>

   
            <View style={styles.inline , {marginTop: 50}}>
                    <RaisedTextButton 
                        title="Sign In"
                        id='signIn' 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'green',paddingLeft:40,paddingRight:40}}
                        titleColor = 'white'
                        style={{alignSelf:'center',backgroundColor:'green'}}
                        onPress={() => this.props.navigation.navigate('read')} />
            </View>
            <View style={styles.inline , {marginTop: 20}}> 
                    <TextButton 
                        title="CANCEL" 
                        id='cancel' 
                        titleStyle={styles.buttonTextStyle,{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        titleColor = '#0d8898'
                        style={{alignSelf:'center',backgroundColor:'#E1D7D8'}}
                        onPress={() =>{}} />
            </View>
            <TextButton
                    title="Forgot Login/Pass" 
                    id='forgotPass' 
                    titleStyle={styles.buttonTextStyle,{alignSelf:'flex-end',backgroundColor:'#E1D7D8'}}
                    titleColor = '#0d8898'
                    style={{alignSelf:'flex-end',backgroundColor:'#E1D7D8'}}
                    onPress={() =>{}} />
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
Login.propTypes = propTypes;
export default Login;

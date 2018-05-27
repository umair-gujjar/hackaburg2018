import React, { PureComponent ,Component} from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid,View,Item,Text, ScrollView, Platform,Label,TextInput, Animated, Easing,Image } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import { Button } from 'react-native-material-ui';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Dialog } from 'react-native-simple-dialogs';
import Tags from '../../src/components/Tags';
import NewTagModal from '../../src/components/NewTagModal';
import routes from '../routes';
import Container from '../Container';
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

const TAGS = [
    '#hackaburg@2018',
    '#Regensburg',
    '#Zoom',
    '#Challenge',
    '#Digital',
    '#Journalism',
];

type State = {
  modalVisible: boolean,
};

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Post extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;
        this.state = {
            modalVisible: false,
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
                leftElement="close"
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement="Add Post"
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
        this.setState({ dialogVisible: true ,  });
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

    // Reference Tags component
    _tagsComponent: ?Tags;

    openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  onSubmitNewTag = (tag: string) => {
    this._tagsComponent && this._tagsComponent.onSubmitNewTag(tag);
  };

    render() {

        const { modalVisible } = this.state;
        return (

            <Container>
                {this.renderToolbar()}
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                >
                    <View style={{margin: 20}}>
                        <SegmentedControlTab
                            values={['Article', 'Challenge']}
                            selectedIndex={this.state.selectedIndex}
                            height={30}
                              onTabPress={() => {}}
                              borderRadius={5}
                            />
                    </View>
                    <PhotoUpload
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                console.log('Image base64 string: ', avatar)
                            }
                        }}
                    >
                        <View style={{
                                    width: 300,
                                    height: 60,
                                    borderRadius: 25,
                                    backgroundColor: '#3B5699'
                                }}>
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    alignSelf: 'center',
                                    width: 60,
                                    height: 60,
                                }}
                                resizeMode='cover'
                                source={require('../../assets/images/plus.png')}
                            />
                        </View>
                    </PhotoUpload>
                    <View style={{margin: 20}}>
                        <ScrollView>
                            <Text>Content</Text>  
                            <TextInput style={{ flex:2, backgroundColor: '#ffffff', minHeight: '65%', maxHeight: 410,borderColor: '#3b5998',borderRadius: 5,borderWidth: 2,}} multiline={true} numberOfLines={10} />
                        </ScrollView>
                    </View>
                    <View>
                        <NewTagModal
                          visible={modalVisible}
                          onSubmit={this.onSubmitNewTag}
                          onClose={this.closeModal}
                        />
                    </View>
                    <View style={{margin: 7}}>
                        <Tags
                        style={{flex:2, backgroundColor: '#3b5998'}}
                            ref={component => this._tagsComponent = component }
                          tags={TAGS}
                          onPressAddNewTag={this.openModal}
                        />
                    </View>
                    <View style={{margin: 20}}>
                        <Button raised primary text="Post It!!" onPress={this.showDialog} style={{backgroundColor: '#3B5699'}}/>
                    </View>
                </ScrollView>
                <Dialog 
                    visible={this.state.dialogVisible} 
                    title="Your Post Added Successfully"
                    onTouchOutside={() => this.setState({dialogVisible: false})} >
                    <View>
                        <Image
                            resizeMode='cover'
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png'
                            }}
                        />
                        <Button raised primary text="OK" onPress={this.handleCancel} style={{backgroundColor: '#3B5699'}}/>
                    </View>
                </Dialog>
            </Container>
        );
    }
}

Post.propTypes = propTypes;
export default Post;

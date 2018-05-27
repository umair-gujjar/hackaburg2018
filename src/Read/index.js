import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, Image,ToastAndroid, ScrollView, Platform, Animated, Easing } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
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

const cards = [
  {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.card}>
            <Image style={styles.thumbnail} source={{uri: this.props.image}} />
            <Image style={styles.bookimark} source={{uri: 'https://cdn2.iconfinder.com/data/icons/crystalproject/crystal_project_256x256/apps/keditbookmarks.png'}} />
            <Text style={styles.text}>Any text here {this.props.name}</Text>
        </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

class Read extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            cards: cards,
            outOfCards: false,
            selected: [],
            searchText: '',
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }
    handleYup (card) {
        console.log("like")
    }

    handleNope (card) {
        console.log("dislike")
    }

    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
    }

    handleAny (card) {
        console.log(`Any for ${card.text}`)
    }

    cardRemoved (index) {
        console.log(`The index is ${index}`);
        let CARD_REFRESH_LIMIT = 3
        if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
            console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
            if (!this.state.outOfCards) {
                console.log(`Adding ${cards2.length} more cards`)
                this.setState({
                    cards: this.state.cards.concat(cards2),
                    outOfCards: true
                })
            }

        }

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
            <Container>
                {this.renderToolbar()}
                <SwipeCards
                        cards={this.state.cards}
                        loop={true}
                        renderCard={(cardData) => <Card {...cardData} />}
                        renderNoMoreCards={() => <NoMoreCards />}
                        showYup={true}
                        showNope={true}
                        handleYup={this.handleYup}
                        handleNope={this.handleNope}
                        handleMaybe={this.handleMaybe}
                        hasMaybeAction
                        cardRemoved={this.cardRemoved.bind(this)}
                    />
                <ActionButton
                    actions={[
                        { icon: 'email', label: 'Email' },
                        { icon: 'phone', label: 'Phone' },
                        { icon: 'sms', label: 'Text' },
                        { icon: 'favorite', label: 'Favorite' },
                    ]}
                    hidden={this.state.bottomHidden}
                    icon="share"
                    transition="speedDial"
                    onPress={(action) => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show(action, ToastAndroid.SHORT);
                        }
                    }}
                    style={{
                        positionContainer: { bottom: 76 },
                    }}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
        elevation: 1,
    },
    bookimark: {
        width: '5%',
        height: '5%',
        alignItems: 'flex-end',
        marginTop: 0,
        resizeMode: 'contain',
        marginBottom: 0,
        paddingBottom: 0,
        marginRight: '35%',
        position: 'absolute',
    },
    thumbnail: {
        width: 360,
        height: 400,
    },
    text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

Read.propTypes = propTypes;
export default Read;


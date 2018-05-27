import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Login from './src/pages/Login';
import Intro from './src/pages/Intro';

export default class ReactNativeCommonScreens extends Component {
  render() {
    return (
      <Intro />
    );
  }
}

AppRegistry.registerComponent('ReactNativeCommonScreens', () => ReactNativeCommonScreens);
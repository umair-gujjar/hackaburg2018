// @flow

import React, { PureComponent } from 'react';
import {
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';
import TagsArea from './TagsArea';
import type { TagObject, GestureState } from '../types';

type Props = {
  // Array of tag titles
  tags: string[],
  animationDuration: number,
  // Passes onPressAddNewTag callback down to TagsArea component
  onPressAddNewTag: () => void,
};

type State = {
  tags: TagObject[],
};

export default class Tags extends PureComponent {

  props: Props;

  static defaultProps = {
    animationDuration: 250
  };

  state: State = {
    // Convert passed array of tag titles to array of objects of TagObject type,
    // so ['tag', 'another'] becomes [{ title: 'tag' }, { title: 'another' }]
    tags: [...new Set(this.props.tags)]       // remove duplicates
      .map((title: string) => ({ title })),   // convert to objects
  };

  // PanResponder to handle drag and drop gesture
  panResponder: PanResponder;

  // Initialize PanResponder
  componentWillMount() {
    this.panResponder = this.createPanResponder();
  }


   // Animate layout changes when dragging or removing a tag
  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration
    });
  }

  // Create PanResponder
  createPanResponder = (): PanResponder => PanResponder.create({
    // Handle drag gesture
    onMoveShouldSetPanResponder: (_, gestureState: GestureState) => this.onMoveShouldSetPanResponder(gestureState),
    onPanResponderGrant: (_, gestureState: GestureState) => this.onPanResponderGrant(),
    onPanResponderMove: (_, gestureState: GestureState) => this.onPanResponderMove(gestureState),
    // Handle drop gesture
    onPanResponderRelease: (_, gestureState: GestureState) => this.onPanResponderEnd(),
    onPanResponderTerminate: (_, gestureState: GestureState) => this.onPanResponderEnd(),
  });

  // Find out if we need to start handling tag dragging gesture
  onMoveShouldSetPanResponder = (gestureState: GestureState): boolean => {
    console.log('setting PanResponder');
    return true;
  };

  // Called when gesture is granted
  onPanResponderGrant = (): void => {
    console.log('granted');
  };

  // Handle drag gesture
  onPanResponderMove = (gestureState: GestureState): void => {
    const { moveX, moveY } = gestureState;
    console.log('onPanResponderMove', moveX, moveY);
  };

   // Called after gesture ends
  onPanResponderEnd = (): void => {
    console.log('ended');
  };

   // Remove tag
  removeTag = (tag: TagObject): void => {
    this.setState((state: State) => {
      const index = state.tags.findIndex(({ title }) => title === tag.title);
      return {
        tags: [
          // Remove the tag
          ...state.tags.slice(0, index),
          ...state.tags.slice(index + 1),
        ]
      }
    });
  };

   // Update the tag in the state with given props
  updateTagState = (tag: TagObject, props: Object): void => {
    this.setState((state: State) => {
      const index = state.tags.findIndex(({ title }) => title === tag.title);
      return {
        tags: [
          ...state.tags.slice(0, index),
          {
            ...state.tags[index],
            ...props,
          },
          ...state.tags.slice(index + 1),
        ],
      }
    });
  };

    // Update tag coordinates in the state
  onRenderTag = (tag: TagObject,
                 screenX: number,
                 screenY: number,
                 width: number,
                 height: number): void => {
    this.updateTagState(tag, {
      tlX: screenX,
      tlY: screenY,
      brX: screenX + width,
      brY: screenY + height,
    });
  };

  // Add new tag to the state
  onSubmitNewTag = (title: string): void => {
    // Remove tag if it already exists to re-add it to the bottom of the list
    const existingTag = this.state.tags.find((tag: TagObject) => tag.title === title);
    if (existingTag) {
      this.removeTag(existingTag);
    }
    // Add new tag to the state
    this.setState((state: State) => {
      return {
        tags: [
          ...state.tags,
          { title },
        ],
      }
    });
  };


  render() {
    const { tags } = this.state;
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
      >

        <TagsArea
          tags={tags}
          onPress={this.removeTag}
          onRenderTag={this.onRenderTag}
          onPressAddNew={this.props.onPressAddNewTag}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
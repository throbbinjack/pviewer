import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

PhotoPane = ({ photo, width, height }) => (
  <Animated.View
    style={[
      styles.InnerPane,
      {
        width: width,
        height: height
      }
    ]}
  >
    <Animated.Image
      style={{ width, height }}
      source={photo.source}
      resizeMode={'contain'}
    />
  </Animated.View>
);

class InnerViewer extends React.Component {
  state = {
    width: new Animated.Value(SCREEN_WIDTH),
    height: new Animated.Value(SCREEN_HEIGHT)
  };

  constructor(props) {
    super(props);

    console.log('width is set to ', this.state.width);

    // const { onClose, photos, photoKey, onPhotoKeyChange } = this.props;
    // const initalIndex = photos.map(photo => photo.key).indexOf(photoKey);
    // const { width, height } = this.state;

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 0 };
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(
      this
    );
  }

  handleViewableItemsChanged({ viewableItems }) {
    const item = viewableItems[0];
    if (item && item.key !== this.props.photoKey) {
      this.props.onPhotoKeyChange(item.key);
    }
  }

  render() {
    const { onClose, photos, photoKey, onPhotoKeyChange } = this.props;
    const initalIndex = photos.map(photo => photo.key).indexOf(photoKey);
    const { width, height } = this.state;

    return (
      <Animated.View
        style={styles.viewer}
        onLayout={Animated.event(
          [
            {
              nativeEvent: {
                layout: { width, height }
              }
            }
          ],
          {
            listener: e => {
              if (this.flatList && initalIndex != null) {
                this.flatList.scrollToIndex({
                  viewPosition: 0,
                  index: initalIndex
                });
              }
            }
          }
        )}
      >
        <FlatList
          ref={fl => {
            this.flatList = fl;
          }}
          style={styles.hscroll}
          horizontal={true}
          pagingEnabled={true}
          data={photos}
          renderItem={({ item }) => {
            return <PhotoPane photo={item} width={width} height={height} />;
          }}
          getItemLayout={(data, index) => ({
            length: width.__getValue(),
            offset: index * width.__getValue(),
            index
          })}
          initialNumToRender={1}
          initialScrollIndex={initalIndex}
          // onViewableItemsChanged={({ viewableItems }) => {
          //   const item = viewableItems[1];
          //   if (item && item.key !== photoKey) {
          //     onPhotoKeyChange(item.key);
          //   }
          // }}
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={this.handleViewableItemsChanged}
        />

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default class PhotoViewer extends React.Component {
  state = {
    photos: null
  };

  open = (photos, key) => {
    this.setState({ photos, key });
  };

  close = () => {
    this.setState({ photos: null, key: null });
  };

  changePhoto = key => {
    this.setState({ key: key });
  };

  render() {
    const { photos, key } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {this.props.renderContent({ onPhotoOpen: this.open })}
        {photos && (
          <InnerViewer
            photos={photos}
            photoKey={key}
            onClose={this.close}
            onPhotoKeyChange={this.changePhoto}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeText: {
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderWidth: 1,
    padding: 20,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  InnerPane: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  hscroll: {
    flex: 1
  }
});

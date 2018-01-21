/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

import PhotoViewer from "./PhotoViewer";

const PHOTOS = [
  {
    key: "a",
    width: 300,
    height: 200,
    source: { uri: "https://placebear.com/200/300", cache: "force-cache" },
    caption: "Grizzly"
  },
  {
    key: "b",
    width: 200,
    height: 1000,
    source: { uri: "https://placebear.com/200/1000", cache: "force-cache" },
    caption: "Grizzly"
  },
  {
    key: "c",
    width: 300,
    height: 50,
    source: { uri: "https://placebear.com/300/50", cache: "force-cache" },
    caption: "Grizzly"
  },
  {
    key: "d",
    width: 200,
    height: 200,
    source: { uri: "https://placebear.com/200/200", cache: "force-cache" },
    caption: "Grizzly"
  }
];

const Item = ({ photo, onPress }) => (
  <View style={styles.item}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Image style={{ width: 300, height: 300 }} source={photo.source} />
    </TouchableWithoutFeedback>
    <Text style={styles.caption}>{photo.caption}</Text>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <PhotoViewer
        renderContent={({ onPhotoOpen }) => (
          <ScrollView style={styles.container}>
            {PHOTOS.map(photo => (
              <Item
                key={photo.key}
                photo={photo}
                onPress={() => {
                  onPhotoOpen(PHOTOS, photo.key);
                }}
              />
            ))}
          </ScrollView>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },

  item: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
    alignItems: "center"
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import RNImagePicker from "react-native-image-picker";
import firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {
  state = {
    uri: '',
  };

  // image picker
  openPicker = () => {
    RNImagePicker.showImagePicker({}, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = { uri: res.uri };
        this.setState(source);
      }
    });
  };

  // 画像のアップロード機能
  upload = () => {
    Firebase.storage()
      .ref('images/' + new Date().getTime())
      .putFile(this.state.uri, { contentType: "image/jpeg" })
      .then(() => alert("Uploaded"))
      .catch(e => {
        console.log(e);
        alert("Error");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.state.uri }} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={this.openPicker}>
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.upload}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  button: {
    padding: 20,
  },
});

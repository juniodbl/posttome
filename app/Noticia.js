import React from 'react';
import { StyleSheet, View, Linking, Share } from 'react-native';
import {WebView} from 'react-native-webview';


const styles = StyleSheet.create({
  radioButtomText: { color: 'white', textAlign: "center", lineHeight: 50, fontSize: 20 },
  radioButtom: { margin: 5, borderRadius: 100, width: 50, height: 50, backgroundColor: "blue" },
  container: { flex: 1 }
});

export default class Noticia extends React.Component {
  static navigationOptions = {
    title: 'Noticia',
  }

  linkTitle = ''
  titulo = ''
  resumo = ''

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    linkTitle = navigation.getParam('link', 'titulo generico');
    titulo = navigation.getParam('titulo', 'titulo generico');
    resumo = navigation.getParam('resumo', 'resumo generico');

    this.btnAction = this.btnAction.bind(this);
    this.share = this.share.bind(this);
  }

  btnAction() {
    Linking.openURL(linkTitle);
  }

  share() {
    Share.share({
      message: linkTitle,
      url: linkTitle,
      title: titulo
    }, {
        // Android only:
        dialogTitle: 'Posta logo ai BROW',
      });
  }

  strip(text) {
    return text.replace(new RegExp("<.*?>", "gm"), "");
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: linkTitle }} />
      </View>
    );
  }
}
import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Linking, Share } from 'react-native';


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
        <View style={{ padding: 10, margin: 15 }}>
          <Text style={{ textTransform: "capitalize", fontSize: 20 }}>{titulo}</Text>
          <Text style={{ textTransform: "capitalize", fontSize: 14 }}>{this.strip(resumo)}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, marginLeft: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={this.btnAction}>
              <View style={styles.radioButtom}>
                <Text
                  style={styles.radioButtomText}>Full</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.share}>
              <View style={styles.radioButtom}>
                <Text
                  style={styles.radioButtomText}>Share</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
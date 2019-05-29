import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking, Share } from 'react-native';

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
      <View>
        <View style={{ padding: 10, margin: 15 }}>
          <Text style={{ textTransform: "capitalize", fontSize: 20 }}>{titulo}</Text>
          <Text style={{ textTransform: "capitalize", fontSize: 14 }}>{this.strip(resumo)}</Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Ver Noticia No Navegador"
              onPress={this.btnAction} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              title="Publicar"
              onPress={this.share} />
          </View>
        </View>
      </View>
    );
  }
}
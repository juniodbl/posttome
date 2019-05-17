import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native';

export default class Noticia extends React.Component {
  static navigationOptions = {
    title: 'Noticia',
  }

  constructor(props) {
    super(props);

    this.btnAction = this.btnAction.bind(this);
  }

  btnAction() {
    const { navigation } = this.props;
    const link = navigation.getParam('link', 'titulo generico');
    Linking.openURL(link);
  }

  strip(text) {
    return text.replace(new RegExp("<.*?>", "gm"), "");
  }

  render() {
    const { navigation } = this.props;
    const titulo = navigation.getParam('titulo', 'titulo generico');
    const resumo = navigation.getParam('resumo', 'resumo generico');

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
              onPress={this.btnAction} />
          </View>
        </View>
      </View>
    );
  }
}
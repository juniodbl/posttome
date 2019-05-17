import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Noticia from './Noticia';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: true, pagina: 0 }

    this.anterior = this.anterior.bind(this);
    this.proxima = this.proxima.bind(this);
    this.carregar = this.carregar.bind(this);
  }

  proxima() {
    this.setState({ isLoading: true, pagina: this.state.pagina + 1 });
  }

  anterior() {
    this.setState({ isLoading: true, pagina: this.state.pagina - 1 });
  }

  carregar() {
    fetch(`https://news-platform-service.herokuapp.com/api/v1/noticia/search?size=20&page=${this.state.pagina}&tags=jogos`)
      .then((response) => (response.json()))
      .then((responseJson) => {
        responseJson.forEach(item => item.key = item.id);
        this.setState({
          pagina: this.state.pagina,
          isLoading: false,
          dataSource: responseJson
        }, () => { });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.carregar();
    }
  }

  componentDidMount() {
    this.carregar();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View>
        <View style={{ height: 510 }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <View style={{ borderWidth: 1, borderColor: 'black', borderStyle: "solid", margin: 10, padding: 5 }}>
                <Text style={{ paddingTop: 5, fontSize: 20 }} onPress={() => {
                  this.props.navigation.navigate('Noticia', item);
                }}>
                  {item.titulo}
                </Text>
              </View>}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row", position: "absolute", bottom: 0 }}>
          <View style={{ width: '30%', height: 1 }}>
            <Button title="Anterior" onPress={this.anterior} />
          </View>
          <View style={{ width: '5%', height: 1 }}></View>
          <View style={{ width: '30%', height: 1, alignItems: "center" }}>
            <Text>Pagina {this.state.pagina + 1}</Text>
          </View>
          <View style={{ width: '5%', height: 1 }}></View>
          <View style={{ width: "30%", height: 1 }}>
            <Button title="próximo" onPress={this.proxima} />
          </View>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Noticia: Noticia
}, {
    initialRouteName: "Home"
  });

export default createAppContainer(AppNavigator);
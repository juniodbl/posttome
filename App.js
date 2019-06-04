import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Noticia from './app/Noticia';
import ItemView from './app/ItemView'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: true, pagina: 0, dataSource: [] }

    this.proxima = this.proxima.bind(this);
    this.carregar = this.carregar.bind(this);
    this.tratarDataSource = this.tratarDataSource.bind(this);
  }

  proxima() {
    this.setState({ isLoading: true, pagina: this.state.pagina + 1 });
  }

  carregar() {
    fetch(`https://news-platform-service.herokuapp.com/api/v1/noticia/search?size=20&page=${this.state.pagina}&tags=jogos`)
      .then((response) => (response.json()))
      .then((responseJson) => {
        responseJson.forEach(item => item.key = item.id);

        ;

        this.setState({
          pagina: this.state.pagina,
          isLoading: false,
          dataSource: this.tratarDataSource(responseJson)
        }, () => { });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  tratarDataSource(resp = []) {
    resp.forEach((v, i) => {
      var myRegexp = /<img src=['\"](.*?)['\"]/g;
      var match = myRegexp.exec(v.resumo.replace('\r\n', ''));
      if (match) {
        v.imageTemplate = match[1];
      }
    });
    
    return this.state.dataSource.concat(resp);
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
    return (
      <View style={{ backgroundColor: '#84ffff' }}>
        <View>
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            onEndReached={() => {
              this.proxima()
            }}
            data={this.state.dataSource}
            renderItem={
              ({ item }) =>
                <ItemView item={item} onPress={() => this.props.navigation.navigate('Noticia', item)} />
            } />
          {this.state.isLoading ? <ActivityIndicator /> : <View />}
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
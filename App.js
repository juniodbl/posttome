import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Noticia from './Noticia';
import ItemView from './app/ItemView'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: true, pagina: 0 }

    this.proxima = this.proxima.bind(this);
    this.carregar = this.carregar.bind(this);
  }

  proxima() {
    this.setState({ isLoading: true, pagina: this.state.pagina + 1 });
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
    return (
      <View style={{ backgroundColor: '#84ffff' }}>
        <View>
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            onEndReached={() => {
              this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
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
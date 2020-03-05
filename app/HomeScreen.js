import React from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, Text, View, Linking } from 'react-native';
import ItemView from './ItemView';
import { store } from './search';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Inicio'
    }

    constructor(props) {
        super(props);
        this.state = { isLoading: true, pagina: 0, dataSource: [] }

        this.proxima = this.proxima.bind(this);
        this.carregar = this.carregar.bind(this);
    }

    proxima() {
        this.setState({ isLoading: true, pagina: this.state.pagina + 1 });
    }

    carregar() {
        store.search(this.state.pagina)
            .then((dataSource) => {
                this.setState({
                    pagina: this.state.pagina,
                    isLoading: false,
                    dataSource: this.state.dataSource.concat(dataSource)
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
            <View style={{ backgroundColor: '#e0e0e0' }}>
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

export default HomeScreen;
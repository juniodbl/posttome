import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    item: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: 150
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    title: {
        paddingTop: 25,
        fontSize: 18,
    },
    resume: {
        paddingTop: 10,
        fontSize: 13
    },
    author: {
        paddingTop: 10,
        fontSize: 13,
        fontWeight: 'bold'
    },
    footer: {
        paddingTop: 10,
        color: '#bdbdbd'
    }
});

export default (props) => {
    let image = { uri: props.item.imageTemplate };

    if (!props.item.imageTemplate) {
        image = require('./generic.jpg');
    }

    let logo = !props.item.logo ? 'https://image.shutterstock.com/image-vector/generic-vector-logo-your-company-600w-305592803.jpg' : props.item.logo;

    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={styles.item}>
                <Image source={image} style={styles.image} />
                <Text style={styles.title}>
                    {props.item.titulo}
                </Text>
                <Text style={styles.resume}>
                    {props.item.resumo.replace(new RegExp("<.*?>", "gm"), "")}
                </Text>
                <Text style={styles.author}>
                    <Image source={{uri: props.item.logo}} style={props.item.logo} /> {props.item.fonte}
                </Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.footer}>
                        {props.item.dataPublicacao}
                    </Text>
                    <Icon name='heart' type='font-awesome' />
                </View>
            </View>
        </TouchableHighlight>
    )
}
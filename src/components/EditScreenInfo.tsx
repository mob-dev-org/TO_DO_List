import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { AntDesign } from '@expo/vector-icons';

export default function EditScreenInfo() {
    const [text, setText] = useState<string>('');
    const [items, setItems] = useState<string[]>([]);

    const submit = () => {
        // item.push(text);
        setItems([...items, text]);
        setText('');
    };

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Write something"
                    value={text}
                    // onChange={(e) => setText(e.nativeEvent.text)}
                    // onChangeText={setText} ispravan - najkraca verzije
                    // onChangeText={(text) => setText(text)} ispravan - srednje kratka verzija
                    onChangeText={(text) => {
                        console.log(text);
                        setText(text); // ispravan najduza verzija
                    }}
                />

            </View>
            <View style={styles.body}>
                {items.map((text, index) => (
                    <Text style={styles.taskText}>{text}</Text>
                ))}
            </View>
            <View style={styles.footer}>
                <Pressable style={[{ alignItems: 'flex-end', marginEnd: 20 }]} onPress={submit}>
                    <Text style={styles.button}>Add<AntDesign name="pluscircleo" size={24} color="black" /></Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        fontSize: 45,
        backgroundColor: 'red',
        width: 60,
        height: 60,
        textAlign: 'center',
        alignItems: 'flex-end',
    },
    textInput: {
        width: 350,
        height: 35,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 20,
    },
    text: {
        fontSize: 40,
        backgroundColor: 'blue',
        textAlign: 'right',
        color: 'white',
        margin: 20,
        padding: 10,
    },
    taskText: {
        fontSize: 25,
        backgroundColor: '#0f0',
        textAlign: 'right',
        margin: 20,
        padding: 10,
    },
    header: {
        flex: 7,
        backgroundColor: '#fa1',
        // alignItems: 'center',
    },
    page: {
        flex: 1,

        backgroundColor: 'blue',
    },
    body: {
        flex: 25,
        backgroundColor: '#cf0',
    },
    footer:{
        backgroundColor:"#303050",
        height:90
        
    }
});

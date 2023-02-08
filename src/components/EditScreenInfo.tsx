import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

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
                    <View style={styles.taskPerent}>
                        <Text style={styles.taskText}>{text}</Text>
                        <Pressable style={styles.itemButton}>
                            <Entypo name="edit" size={24} color="black" />
                        </Pressable>
                        <Pressable style={styles.itemButton}>
                            <MaterialCommunityIcons name="close-box-multiple" size={24} color="black" />
                        </Pressable>
                    </View>
                ))}
            </View>
            <View style={styles.footer}>
                <Pressable style={[{ alignItems: 'flex-end' }]} onPress={submit}>
                    <Text style={styles.button}>
                        Add
                        <AntDesign name="pluscircleo" size={24} color="black" />
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemButton: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginLeft: 8,
    },

    button: {
        fontSize: 45,
        backgroundColor: 'red',
        width: '100%',
        padding: 8,
        textAlign: 'center',
        alignItems: 'center',
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
    taskPerent: {
        margin: 8,
        flexDirection: 'row',
    },
    text: {
        fontSize: 40,
        backgroundColor: 'white',
        textAlign: 'right',
        color: 'white',
        margin: 20,
        padding: 10,
    },
    taskText: {
        fontSize: 25,
        textAlign: 'left',
        flex: 1,
        padding: 10,
    },
    header: {
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
    footer: {
        backgroundColor: '#303050',
    },
});

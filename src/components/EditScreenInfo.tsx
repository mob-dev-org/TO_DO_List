import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Button, Pressable, GestureResponderEvent } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function EditScreenInfo() {
    const [text, setText] = useState<string>('');
    const [items, setItems] = useState<string[]>([]);

    const clear = () => setItems([]);

    const clearTask = (index: number) => {
        console.log('proba', index);
        items.splice(index, 1);
        setItems([...items]);
    };

    const submit = () =>
        // event: GestureResponderEvent
        {
            // item.push(text);
            // console.log('pageX', event.nativeEvent.pageX);
            setItems([...items, text]);
            setText('');
        };

    const renderItem = (task: string, index: number) => {
        console.log('task, index', task, index);

        return (
            <View style={styles.taskPerent}>
                <Text style={styles.taskText}>{task}</Text>
                <Pressable style={styles.itemButton}>
                    <Entypo name="edit" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.itemButton} onPress={() => clearTask(index)}>
                    <MaterialCommunityIcons name="close-box-multiple" size={24} color="black" />
                </Pressable>
            </View>
        );
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
                        // console.log(text);
                        setText(text); // ispravan najduza verzija
                    }}
                />
            </View>
            <View style={styles.body}>
                {items.map((task: string, index: number) => {
                    console.log('task, index', task, index);

                    return (
                        <View style={styles.taskPerent}>
                            <Text style={styles.taskText}>{task}</Text>
                            <Pressable style={styles.itemButton}>
                                <Entypo name="edit" size={24} color="black" />
                            </Pressable>
                            <Pressable style={styles.itemButton} onPress={() => clearTask(index)}>
                                <MaterialCommunityIcons name="close-box-multiple" size={24} color="black" />
                            </Pressable>
                        </View>
                    );
                })}
                {/* {items.map((value: string, index: number) => renderItem(value, index))} */}
                {/* {items.map(renderItem)} syntactic sugar */}

                <Pressable
                    style={styles.clear}
                    onPress={clear} // syntactic sugar
                >
                    <Text style={styles.ClearText}>Clear</Text>
                    <MaterialCommunityIcons name="delete-alert" size={44} color="black" />
                </Pressable>
            </View>
            <View style={styles.footer}>
                <Pressable
                    style={[{ alignItems: 'flex-end' }]}
                    onPress={submit}
                    // onPress={(event) => submit(event)} // These 2 function calls are the same
                >
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
        backgroundColor: '#37bbbe',
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
    clear: {
        width: 200,
        color: 'red',
        borderRadius: 32,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        marginTop: 8,
    },
    body: {
        flex: 25,
        backgroundColor: '#cf0',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#303050',
    },
    ClearText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

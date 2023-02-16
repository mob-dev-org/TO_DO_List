import * as WebBrowser from 'expo-web-browser';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    Pressable,
    GestureResponderEvent,
    TextStyle,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useState } from 'react';
import { Text, View } from './Themed';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
type ToDo = {
    text: string;
    completed: boolean;
    editing: boolean;
    index: number;
    disableing: boolean;
};
export default function EditScreenInfo() {
    // let task: ToDo;
    const [edited, setEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ToDo[]>([]);

    const edit = (index: number, malik: boolean) => {
        if (text === '') {
            setText(tasks[index].text);
        } else {
            tasks[index].text = text;
            setText('');
        }

        const newArrayWithEditingChanged = tasks.map((toDoItem, indexFromItem, disableing) => {
            if (indexFromItem === index && toDoItem.editing === false) {
                return {
                    ...toDoItem,
                    // text: text + 'editovani',
                    editing: !malik,
                    [tasks[index].text]: text,
                    disableing: false,
                };
                // console.log(edited);
            } else {
                return {
                    ...toDoItem,
                    editing: false,
                    disableing: true,
                };
            }
        });
        // const newArrayWithEditingChanged2 = tasks.map((toDoItem, indexFromItem) =>
        //     index === indexFromItem ? { ...toDoItem, editing: true } : toDoItem,
        // ); - kraci ispravan nacin
        console.log('arrayOfTextsFromTasks', newArrayWithEditingChanged);
        setEdit(!edited);
        setTasks(newArrayWithEditingChanged);
    };

    const clear = () => setTasks([]);

    const removeTask = (index: number) => {
        let newListOfTasks: ToDo[] = [...tasks];
        newListOfTasks.splice(index, 1);
        setTasks(newListOfTasks);
    };

    const checkTasks = (index: number, checked: boolean) => {
        const newArray: ToDo[] = tasks.map((itemFromList, itemIndex) => {
            if (itemIndex === index) {
                return {
                    ...itemFromList,
                    completed: !checked,
                };
            } else {
                return itemFromList;
            }
        });
        setTasks(newArray);
        setChecked(!checked);
    };

    const submit = (index: number) => {
        const newArray: ToDo[] = [
            { text: text, completed: checked, editing: edited, index: index, disableing: disable },
            ...tasks,
        ];
        setTasks(newArray);
        setText('');
        console.log(...newArray);
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
                {tasks.map((toDoItem, index: number) => {
                    return (
                        <View style={styles.taskPerent}>
                            <BouncyCheckbox
                                style={styles.checkBox}
                                isChecked={toDoItem.completed}
                                disableBuiltInState
                                onPress={() => checkTasks(index, toDoItem.completed)}
                            />
                            <Text
                                style={[
                                    // styles.text,
                                    toDoItem.completed && {
                                        textDecorationLine: 'line-through',
                                    },
                                    // {
                                    //     textDecorationLine: checked ? 'line-through' : 'none',
                                    // },
                                    styles.text2,
                                ]}>
                                {toDoItem.text}
                            </Text>

                            <Pressable
                                style={styles.itemButton}
                                onPress={() => edit(index, toDoItem.editing)}
                                key={index}>
                                {!toDoItem.disableing ? (
                                    <Entypo name={!toDoItem.editing ? 'edit' : 'save'} size={24} color="black" />
                                ) : (
                                    ''
                                )}
                            </Pressable>
                            <Pressable style={styles.itemButton} onPress={() => removeTask(index)}>
                                <MaterialCommunityIcons name="close-box-multiple" size={24} color="black" />
                            </Pressable>
                        </View>
                    );
                })}
                {/* {tasks.map((value: string, index: number) => renderItem(value, index))} */}
                {/* {tasks.map(renderItem)} syntactic sugar */}

                <Pressable
                    style={styles.clear}
                    onPress={clear} // syntactic sugar
                >
                    <Text style={styles.ClearText}>Clear</Text>
                    <MaterialCommunityIcons name="delete-alert" size={44} color="black" />
                </Pressable>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.submitButton} onPress={() => submit(1)}>
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
    submitButton: {
        alignItems: 'flex-end',
    },

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
        // backgroundColor: 'white',
        color: '#000',
        textAlign: 'right',
        // color: 'white',
        margin: 20,
        padding: 10,
    },
    text2: {
        fontSize: 25,
        textAlign: 'left',
        flex: 1,
        padding: 10,
    },
    // tasksText: {
    //     fontSize: 25,
    //     textAlign: 'left',
    //     flex: 1,
    //     padding: 10,
    //     textDecorationLine:checked?"line-through":""
    // },
    header: {
        backgroundColor: '#fa1',
        // alignItems: 'center',
    },
    page: {
        flex: 1,
        backgroundColor: 'blue',
    },
    checkBox: {
        margin: 5,
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

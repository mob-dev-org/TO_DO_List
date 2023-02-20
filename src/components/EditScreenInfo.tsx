import { StyleSheet, TextInput, Pressable } from 'react-native';
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
    const [tasks, setTasks] = useState<ToDo[]>([
        { text: 'a', completed: false, editing: false, index: 0, disableing: false },
        { text: 'b', completed: false, editing: false, index: 0, disableing: false },
        { text: 'c', completed: false, editing: false, index: 0, disableing: false },
    ]);
    const [disableAdd, setdisableAdd] = useState<boolean>(true);

    const edit = (index: number, editing: boolean) => {
        if (text === '') {
            setText(tasks[index].text);
        } else {
            tasks[index].text = text;
            setText('');
        }

        const newArrayWithEditingChanged = tasks.map((toDoItem, indexFromItem) =>
            indexFromItem === index && editing === false
                ? {
                      ...toDoItem,

                      [tasks[index].text]: text,
                      editing: !editing,
                  }
                : {
                      ...toDoItem,
                      disableing: !editing,
                      editing: !editing,
                  },
        );

        setEdit(!edited);
        setDisable(!disable);
        setTasks(newArrayWithEditingChanged);
        setdisableAdd(!disableAdd);
    };

    const clear = () => {setTasks([]), setdisableAdd(true)};

    const save = () => {
        const newArrayWithEditingChanged: ToDo[] = tasks.map((toDoItem) => {
            if (toDoItem.disableing === false) {
                return {
                    ...toDoItem,
                    text: text,
                    editing: false,
                };
            } else {
                return {
                    ...toDoItem,
                    disableing: false,
                    editing: false,
                };
            }
        });
        setdisableAdd(!disableAdd);
        setTasks(newArrayWithEditingChanged);
        console.log('bajro', tasks);
        setText('');
    };

    const removeTask = (index: number) => {
        let newListOfTasks: ToDo[] = [...tasks];
        const newArrayWithOneRemoved = newListOfTasks.map((taskFromTasks, i) => {
            if (index === i && taskFromTasks.disableing === true && taskFromTasks.editing === true) {
                newListOfTasks.splice(index, 1);
                taskFromTasks.disableing = false;
                taskFromTasks.editing = false;}

             else if (index === i && taskFromTasks.editing === false){ 
            newListOfTasks.splice(index, 1);}
            
            else{newListOfTasks }
            setTasks(newListOfTasks);
            // setdisableAdd(true);
        });
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
            { text: text, completed: false, editing:false, index: index, disableing: false },
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
                    onChangeText={(text) => {
                        setText(text); // ispravan najduza verzija
                    }}
                />
            </View>

            <View style={styles.body} darkColor="rgba(255,255,255,0.1)">
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

                            {!toDoItem.disableing ? (
                                <Pressable
                                    style={styles.itemButton}
                                    onPress={() => edit(index, toDoItem.editing)}
                                    key={index}>
                                    <Entypo name={!toDoItem.editing ? 'edit' : 'save'} size={20} color="red" />
                                </Pressable>
                            ) : null}
                            <Pressable style={styles.itemButton} onPress={() => removeTask(index)}>
                                <MaterialCommunityIcons name="close-box-multiple" size={20} color="red" />
                            </Pressable>
                        </View>
                    );
                })}

                <Pressable
                    style={styles.clear}
                    onPress={clear} // syntactic sugar
                >
                    <Text style={styles.ClearText}>Clear</Text>
                    <MaterialCommunityIcons name="delete-alert" size={44} color="red" />
                </Pressable>
            </View>
            <View style={styles.footer}>
                {disableAdd ? (
                    <Pressable style={styles.submitButton} onPress={() => submit(1)}>
                        <Text style={styles.button}>
                            Add
                            <AntDesign name="pluscircleo" size={24} color="#fff" />
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.submitButton} onPress={save}>
                        <Text style={styles.button}>
                            Save
                            <AntDesign name="pluscircleo" size={24} color="#fff" />
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'flex-end',
    },

    itemButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        marginRight: 5,
    },

    button: {
        fontSize: 45,
        color: '#fff',
        backgroundColor: '#103030ee',
        width: '100%',
        padding: 8,
        textAlign: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        height: 35,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 20,
    },
    taskPerent: {
        margin: 8,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    text: {
        fontSize: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        color: '#fff',
        textAlign: 'right',
        margin: 20,
        padding: 10,
    },
    text2: {
        fontSize: 25,
        textAlign: 'left',
        borderRadius: 20,
        flex: 1,
        padding: 10,
        color: '#fff',
    },
    header: {
        backgroundColor: '#103030ee',
        // alignItems: 'center',
    },
    page: {
        flex: 1,
    },
    checkBox: {
        margin: 5,
    },
    clear: {
        width: 200,
        color: 'white',
        borderRadius: 32,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        marginTop: 8,
    },
    body: {
        flex: 25,
        backgroundColor: '#103030ee',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#303050',
    },
    ClearText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
});

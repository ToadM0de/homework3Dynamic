import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable } from 'react-native';
import {Feather} from "@expo/vector-icons";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingText(name);
  }

  const saveEdit = (id) => {
    setList(list.map((g) => g.id === id ? {...g, name: editingText} : g));
    setEditingId(null);
    setEditingText("");
  };

  const addItem = () => {
    if (item.trim().length === 0) return;
    setList([...list, {id: Date.now().toString(), name: item}]);
    setItem("");
  };

  const removeItem = (id) => {
    setList(list.filter((g) => g.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder='Add To List' value={item} 
        onChangeText={setItem}
         />
        <Button title='Add' onPress={addItem}/>
      </View>
      <FlatList
      data={list}
      keyExtractor={(g) => g.id}
       renderItem={({item}) => {
        return (
        <View style={styles.itemRow}>
          {editingId ===item.id ?(
            <TextInput
            style={styles.input}
            value={editingText}
            onChangeText={setEditingText}
            onSubmitEditing={() => saveEdit(item.id)}
            autoFocus
            />
          ) : (
             <Text style={styles.itemText}>{item.name}</Text>
          )}
          <View style={{flexDirection: 'row'}}>
            {editingId === item.id ? (
             <Pressable onPress={() => saveEdit(item.id)}>
              <Feather name="save" size={22} color="green" style={styles.save}/>
          </Pressable>
            ):(
              <Pressable onPress={() => startEditing(item.id, item.name)}>
            <Feather name="edit" size={22} color="blue" style={styles.edit}/>
          </Pressable>
            )}
          <Pressable onPress={() => removeItem(item.id)}>
            <Feather name="trash-2" size={22} color="red" style={styles.deleteButton}/>
          </Pressable>
          </View>
        </View>
        );
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DC9BD",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#679E8B',
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#a9dde4',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
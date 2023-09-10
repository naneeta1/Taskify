import { firebase } from './config';
import { Alert, Platform, ToastAndroid } from 'react-native';
const todoRef = firebase.firestore().collection('todos')

const deleteTodo = (todo) => {
    todoRef
        .doc(todo?.id)
        .delete()
        .then(() => {
            console.log('Deleted Successfully')
            return Platform.OS == 'android' ? ToastAndroid.show('Deleted Successfully', ToastAndroid.SHORT) : Alert('Deleted Successfully')
        })
        .catch(error => {
            console.log('error', error)
        })

}



const addTodo = (newTodo) => {
    console.log('New To Do=====>>>>', newTodo)
    if (newTodo) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            ...newTodo,
            createdAt: timestamp
        }

        todoRef.add(data).then(() => {
            console.log('added')
            return Platform.OS == 'android' ? ToastAndroid.show('Added Successfully', ToastAndroid.SHORT) : Alert('Added Successfully')
            Keyboard.dismiss();
        }).catch(error => {
            Alert('error', error)
        })
    }
}

const updateTodo = (todo) => {
    console.log('Todo updating==========>>>>>>>>', todo)
    todoRef.doc(todo?.id).update(
        {...todo}
    ).then(() => {
        console.log('Successfully updated')
        return Platform.OS == 'android' ? ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT) : Alert('Updated Successfully')

    }).catch((error) => {
        console.log('error', error)
    })
}

export {deleteTodo, updateTodo, addTodo}
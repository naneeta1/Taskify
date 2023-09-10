import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Keyboard, Alert, Dimensions, Platform, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'
import Header from '../Components/Header';
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Calendar } from 'react-native-calendars';
import { TimerPickerModal } from 'react-native-timer-picker';
import moment from 'moment';
import { ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Dates from '../Components/Dates';
import TopList from '../Components/TopList';
import { addTodo, deleteTodo, updateTodo } from '..';
import PushNotification from 'react-native-push-notification';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window')



const Home = () => {
    
    const [todos, setTodos] = useState([])
    console.log('Todos:==========>>>', todos)
    const [selectedItem, setSelectedItem] = useState({})

    const [newTodo, setNewTodo] = useState('')
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [selectedDate, setselectedDate] = useState('')
    const [timePicker, setTimePicker] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedTab, setSelectedTab] = useState('')
    const todoRef = firebase.firestore().collection('todos')
    console.log('SelectedItem==========>>>>>>>>>>', selectedItem.alarm)
    const [alarm, setAlarm] = useState(selectedItem?.alarm ? selectedItem?.alarm : {})
    console.log('alarm======>>>>>', alarm)
    const [time, setTime] = useState(selectedItem?.time ? selectedItem?.time : '')
    const [date, setdate] = useState(selectedItem?.date ? selectedItem?.date : '')
    const navigation = useNavigation()
    const [rbSheetRef, setRbSheetRef] = useState(null)
    // console.log('RBSheet=========>>>>>>>>>>', rbSheetRef)


    const scheduleNotification = () => {
        const combinedDateTime = moment(`${date} ${time.hours}:${time.minutes}`);
    
        const now = moment();
        const timeDiff = combinedDateTime.diff(now);
    
        if (timeDiff > 0) {
          PushNotification.localNotificationSchedule({
            message: 'Time for your task!',
            date: combinedDateTime.toDate(), // Convert to JavaScript Date object
          });
        }
        console.log('scheduled succesfuly',combinedDateTime)
      };



    useEffect(() => {

        if(Object.keys(selectedItem).length>0){
            setAlarm(selectedItem?.alarm)
            setTime(selectedItem?.time)
            setdate(selectedItem?.date)
            setTitle(selectedItem?.title)
            setNotes(selectedItem?.Notes)
        }
     
    }, [selectedItem])
    

    useEffect(() => {
        // console.log('Here===')
        todoRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                // console.log('Query=====>>>', querySnapshot)
                const todos = []
                querySnapshot.forEach(doc => {
                    // console.log('Document======>>>', doc);
                    const data = doc.data()
                    todos.push({
                        id: doc.id,
                        ...data
                    })
                })
                setTodos(todos);
            })


    }, [selectedItem])

    
    return (
        <View>
            <Header />
            <Dates />

            <View style={{
                width: width,
                height: height,
                backgroundColor: 'white',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingVertical: moderateScale(15, .6)
            }}>
                <TopList />
                <TouchableOpacity style={styles.plusBtn} onPress={() => { rbSheetRef.open() }}>
                    <Text style={{
                        fontSize: moderateScale(15, .6),
                        color: 'white',
                    }}>Add</Text>
                </TouchableOpacity>
                <FlatList
                    data={todos}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TodoComponent item={item} rbSheetRef={rbSheetRef} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                        )
                    }}
                />
            </View>

            <RBSheet
                ref={ref => {
                    setRbSheetRef(ref)
                }}
                height={500}
                closeOnDragDown={true}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: moderateScale(30, .6),
                        borderTopRightRadius: moderateScale(30, .6),
                    }
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        fontSize: moderateScale(20, .6),
                        // borderBottomWidth: 1,
                        fontWeight: '500',
                        // borderBottomColor: 'black',
                        textAlign: 'center',
                        color: 'black'
                    }}>New Task</Text>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TextInput
                            placeholder='Enter Title'
                            onChangeText={(text) => {
                                setTitle(text)
                            }}
                            value={title}
                            autoCapitalize='none'
                            placeholderTextColor={'gray'}
                            style={{
                                // backgroundColor: 'black',
                                width: width * 0.8,
                                borderColor: 'black',
                                borderBottomWidth: 1,
                                fontSize: moderateScale(15, .6),
                            }}
                        />
                    </View>


                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Enter Notes'
                            onChangeText={(text) => {
                                setNotes(text)
                            }}
                            value={notes}
                            autoCapitalize='none'
                            placeholderTextColor={'gray'}
                            style={{
                                // backgroundColor: 'black',
                                width: width * 0.8,
                                borderColor: 'black',
                                borderBottomWidth: 1,
                                fontSize: moderateScale(15, .6),
                            }}
                        />
                    </View>
                    <View style={{
                        paddingVertical: moderateScale(10, .6),
                        flexDirection: 'row',
                        marginTop: moderateScale(20, .3),
                        justifyContent: 'space-between',
                        paddingHorizontal: moderateScale(5, 6),
                        borderRadius: moderateScale(10, .6),
                        borderWidth: 1,
                        borderColor: 'gray',
                        width: width * 0.8,
                    }}>
                        <Text style={{
                            fontSize: moderateScale(17, .6),
                            color: 'black',
                            alignSelf: 'center'
                        }}>{date ? date : 'Select Date'}</Text>
                        <Icon name='calendar'
                            as={EvilIcons}
                            color={'#AAAAAA'}
                            size={moderateScale(30, .6)}
                            onPress={() => {
                                setModalVisible(true)
                            }} />

                    </View>

                    {modalVisible &&
                        <View style={{
                            paddingVertical: moderateScale(10, .6)
                        }}>
                            <Calendar
                                onDayPress={day => {
                                    setdate(day.dateString);
                                    setModalVisible(false)
                                }}
                                minDate={moment().format('YYYY-MM-DD')}
                                markedDates={{
                                    [date]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                                }}
                            /></View>}

                    <View style={{
                        flexDirection: 'row',
                        marginTop: moderateScale(20, .3)
                    }}>
                        <View style={{ width: width * 0.5 }}>
                            <Text style={styles.time}
                                onPress={() => {
                                    setSelectedTab('time')
                                    setTimePicker(true)
                                }}
                            >Time</Text>
                            {time && <Text style={styles.time}>{time.hours}:{time.minutes}</Text>}
                        </View>
                        <View style={{ width: width * 0.5 }}>
                            <Text style={styles.time} onPress={() => {
                                setSelectedTab('alarm')
                                setTimePicker(true)
                            }}>Alarm</Text>
                            {alarm && <Text style={styles.time}>{alarm.hours}:{alarm.minutes}</Text>}
                        </View>

                    </View>
                    <TouchableOpacity style={styles.dateBtn} onPress={() => {
                        const body = {
                            title: title,
                            Notes: notes,
                            date: date,
                            time: time,
                            alarm: alarm,
                        }
                        for (key in body) {
                            if (body[key] == '') {
                                return Platform.OS == 'android' ?
                                    ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT) :
                                    alert(`${key} is required`)
                            }

                        }
                        if(Object.keys(selectedItem).length>0){
                            console.log('dtaa',{id:selectedItem?.id,...body})
                            updateTodo({id:selectedItem?.id,...body})
                            setSelectedItem({})
                            scheduleNotification()
                        }else{

                            addTodo(body)
                            scheduleNotification()
                            setSelectedItem({})
                        }
                        setTitle('')
                        setNotes('')
                        setdate('')
                        setTime('')
                        setAlarm('')
                        rbSheetRef.close()
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: moderateScale(20, .6),
                            color: 'white',
                            textAlign: 'center'
                        }}>Save</Text>
                    </TouchableOpacity>

                    <TimerPickerModal
                        visible={timePicker}
                        setIsVisible={setTimePicker}
                        onConfirm={(pickedDuration) => {
                            selectedTab == 'alarm' ? setAlarm(pickedDuration) : setTime(pickedDuration)
                            // setAlarm(formatTime(pickedDuration));
                            setTimePicker(false);
                        }}
                        modalTitle={selectedTab == 'alarm' ? "Set Alarm" : 'Set Time'}
                        onCancel={() => setTimePicker(false)}
                        closeOnOverlayPress
                        // LinearGradient={LinearGradient}
                        styles={{
                            theme: "dark",
                        }}
                        modalProps={{
                            overlayOpacity: 0.2,
                        }}
                    />

                </ScrollView>
            </RBSheet>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // width: width,
        height: height * 0.12,
        // backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10, .3)
    },
    time: {
        fontSize: moderateScale(20, .6),
        color: 'black',
        textAlign: 'center'
    },
    dateBtn: {
        backgroundColor: 'purple',
        marginTop: moderateScale(20, .3),
        width: width * 0.5,
        alignSelf: 'center',
        paddingVertical: moderateScale(10, .6),
        borderRadius: moderateScale(10, .6)
    },
    plusBtn: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.2) / 2,
        backgroundColor: 'purple',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 280,
        elevation: 4,
        shadowColor: 'purple',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // bottom:700,
        zIndex: 1,
    }
})


const TodoComponent = ({ item, rbSheetRef, setSelectedItem }) => {
    return (
        <View style={{
            width: width * 0.8,
            height: height * 0.15,
            borderTopLeftRadius: moderateScale(20, .6),
            marginTop: moderateScale(10, .3),
            justifyContent: 'center',
            shadowColor: 'purple',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            shadowOpacity: 0.3,
            elevation: 4,
            alignItems: 'center',
            borderBottomRightRadius: moderateScale(20, .6)
        }}>
            <Text style={{
                fontSize: moderateScale(10, .6),
                color: 'gray',
                textAlign: 'left',
                width: width * 0.4,
                marginRight: moderateScale(12, .3),
                fontStyle: 'italic',

            }}>{item?.time?.hours}</Text>
            <Text style={{
                fontSize: moderateScale(14, .6),
                width: width * 0.4,
                textAlign: 'left',
                color: 'black',
                marginRight: moderateScale(12, .3),
                fontWeight: '500',
            }}>{item?.title}</Text>
            <Text style={{
                fontSize: moderateScale(14, .6),
                width: width * 0.4,
                textAlign: 'left',
                color: 'black',
                marginRight: moderateScale(12, .3),
            }}>{item?.Notes}</Text>
            <View style={{
                position: 'absolute',
                top: 20,
                right: 10,
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    backgroundColor: 'purple',
                    flexDirection: 'row',
                    color: 'white',
                    width: width * 0.14,
                    padding: moderateScale(5, .6),
                    borderRadius: moderateScale(10, .6),
                    marginRight: moderateScale(5, .6)
                }} onPress={() => { 
                    setSelectedItem(item)
                    rbSheetRef.open() }}>
                    <Icon name='edit' as={AntDesign} color={'white'} />
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: moderateScale(10, .6)
                    }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: 'purple',
                    color: 'white',
                    flexDirection: 'row',
                    width: width * 0.14,
                    padding: moderateScale(5, .6),
                    borderRadius: moderateScale(10, .6)
                }}
                    onPress={() => { 
                        // setSelectedItem(item)
                        deleteTodo(item)
                    }}>
                    <Icon name='delete' as={AntDesign} color={'white'} />
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: moderateScale(10, .6)
                    }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
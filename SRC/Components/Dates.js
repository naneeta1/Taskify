import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window')


const Dates = () => {

    const [dateRange, setDateRange] = useState([]);
    const [selectedDate, setSelectedDate] = useState('')

    const generateDateRange = () => {
        const today = moment();
        const oneMonthAgo = moment().subtract(1, 'month');

        const range = [];

        while (oneMonthAgo.isSameOrBefore(today)) {
            range.push(oneMonthAgo.clone());
            oneMonthAgo.add(1, 'day');
        }

        setDateRange(range.reverse());
    };

    useEffect(() => {
        console.log('Here')

        generateDateRange();

    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                data={dateRange}
                renderItem={({ item }) => {

                    return (<TouchableOpacity
                        onPress={() => { setSelectedDate(item) }}
                        style={{
                            width: width * 0.1,
                            height: height * 0.08,
                            backgroundColor: 'white',
                            borderTopLeftRadius: moderateScale(20, .6),
                            borderBottomRightRadius: moderateScale(20, .6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: moderateScale(10, .3),
                        }}>
                        <Text>{item?.format('DD')}</Text>
                        <Text style={{
                            fontSize: moderateScale(12, .6),
                            fontWeight: '500',
                            color: 'black'
                        }}>{item?.format('ddd')}</Text>
                    </TouchableOpacity>)
                }
                }
            />

        </View>
    )
}

export default Dates

const styles = StyleSheet.create({

    container: {
        // width: width,
        height: height * 0.12,
        // backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
const {width, height} = Dimensions.get('window')

const TopList = () => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor:'black',
        width:width,
    }}>
        <Text style={{
            fontSize: moderateScale(10, .6),
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginRight: moderateScale(12, .3)
        }}>All</Text>
        <Text style={{
            fontSize: moderateScale(10, .6),
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginRight: moderateScale(12, .3)
        }}>Complete</Text>
        <Text style={{
            fontSize: moderateScale(10, .6),
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginRight: moderateScale(12, .3)
        }}>Active</Text>

    </View>
  )
}

export default TopList

const styles = StyleSheet.create({})
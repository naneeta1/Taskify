import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import moment from 'moment'
const { width, height } = Dimensions.get('window')

const Header = () => {
  return (
    <View style={{
      height: height * 0.15, width: width,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'purple',
      borderBottomLeftRadius:moderateScale(20,.6),
      borderBottomRightRadius:moderateScale(20,.6)
    }}>
      <Text style={{
        fontSize: moderateScale(15, .6),
        fontWeight: '500',
        textAlign: 'left',
        color:'white',

        // backgroundColor: 'purple',
        width: width * 0.9
      }}>{moment().format('ddd Do MMMM')}</Text>
      <Text style={{
        fontSize: moderateScale(20, .6),
        fontWeight: '500',
        textAlign: 'left',
        color:'white',
        // backgroundColor: 'purple',
        width: width * 0.9
      }}>toDo List</Text>
    <View style={{
      width:width*0.18, 
      height:height*0.1, 
      position:'absolute',right:20}}>
      <Image 
        style={{width:'100%', height:'100%'}} source={require('../Assets/Images/logo.png')} resizeMode={'cover'}/>
    </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
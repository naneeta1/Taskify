import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";


const AddTodo = ({setRbSheetRef}) => {

   
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
   
  </View>
  )
}

export default AddTodo

const styles = StyleSheet.create({})
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native';

export default function GramInput({ title = 'Ingredient', percentValue = 0, gramValue = 0 }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.inputText, styles.subtitle]} defaultValue={`${percentValue}%`} />
        <TextInput style={[styles.inputText, styles.subtitle]} defaultValue={`${gramValue}g`} />
        {/* <View style={styles.inputButtons}>
          <TouchableOpacity>
            <Text style={styles.subtitle}>{`-`}</Text>
          </TouchableOpacity>
          <Text style={[styles.subtitle, { opacity: 0.4, fontWeight: '100', marginHorizontal: 20 }]}>{`|`}</Text>
          <TouchableOpacity>
            <Text style={styles.subtitle}>{`+`}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  inputText: {
    // width: 100,
    // backgroundColor: 'gray'
  },
  inputButtons: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 30,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '300'
  }
});

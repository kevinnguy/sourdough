import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';

export default function GramInput({
  title = 'Ingredient',
  percentValue = 0,
  gramValue = 0,
  editablePercent = true,
  onChange,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          defaultValue={`${percentValue}%`}
          editable={editablePercent}
          keyboardType={'number-pad'}
          onChangeText={(text) => onChange(text, 'percent', title)}
          style={[styles.inputText, styles.subtitle]}
        />
        <TextInput
          defaultValue={`${gramValue}`}
          keyboardType={'number-pad'}
          onChangeText={(text) => onChange(text, 'gram', title)}
          style={[styles.inputText, styles.subtitle]}
        />
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputContainer: {
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  inputText: {
    // width: 100,
    // backgroundColor: 'gray'
  },
  inputButtons: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black'
  },
});

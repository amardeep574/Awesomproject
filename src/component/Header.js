import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // You can choose another icon library if needed


class Header extends Component {
  render() {
    const { title, iconName, onIconPress } = this.props; // Receive title and icon name from props

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <Icon name={iconName} size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#000', // You can change the background color
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Header;

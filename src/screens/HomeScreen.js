import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import RbSheet from '../component/RbSheet';

const { width, height } = Dimensions.get('screen');

export class HomeScreen extends Component {
  state = {
    users: [],
    isLoading: true,
    error: null,
  };

  // Create a ref for the BottomSheet
  bottomSheetRef = React.createRef();

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (response.ok) {
        const data = await response.json();
        this.setState({ users: data, isLoading: false });
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleUpdate = () => {
    // Open the bottom sheet when the Update button is pressed
    this.bottomSheetRef.current.openBottomSheet();
  };

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>City: {item.address.city}, Street: {item.address.street}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.handleUpdate}  // Open the bottom sheet on Update button click
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => this.handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    const { users, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#12CBC4" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text>Error: {error}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={users}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollViewContentContainer}
        />
        
        {/* Pass the ref to RbSheet */}
        <RbSheet ref={this.bottomSheetRef} />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollViewContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    width: width - 40,
    marginLeft: 20,  
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#12CBC4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdddd',
    padding: 20,
  },
});

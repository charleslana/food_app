import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  onEndEditing?(): void | undefined;
  didTouch(): void;
  autoFocus?: boolean | undefined;
  onTextChange(text: string): void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onEndEditing,
  didTouch,
  autoFocus = false,
  onTextChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image style={styles.icon} source={require('../images/search.png')} />
        <TextInput
          style={styles.input}
          placeholder={'Search Foods'}
          autoFocus={autoFocus}
          onTouchStart={() => didTouch()}
          onChangeText={text => onTextChange(text)}
          onEndEditing={() => onEndEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchBar: {
    display: 'flex',
    height: 32,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ededed',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#E5E5E5',
    borderWidth: 2,
  },
  icon: {
    width: 25,
    height: 25,
  },
  input: {
    marginLeft: 5,
    flex: 9,
    display: 'flex',
    fontSize: 20,
    height: 42,
  },
});

export { SearchBar };

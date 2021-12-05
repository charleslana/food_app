import React, { useState } from 'react';
import { ButtonWithIcon, SearchBar } from '../components';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '../utils';
import {
  ApplicationState,
  FoodModel,
  ShoppingState,
  UserState,
} from '../redux';

interface SearchScreenProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onUpdateCart: void;
}

const _SearchScreen: React.FC<SearchScreenProps> = props => {
  const { navigate } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onTapFood = (item: FoodModel) => {
    navigate('FoodDetailPage', { food: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            display: 'flex',
            height: 60,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 4,
          }}
        >
          <ButtonWithIcon
            icon={require('../images/back_arrow.png')}
            onTap={() => navigate('HomePage')}
            width={40}
            height={50}
          />
          <SearchBar
            onTextChange={setKeyword}
            onEndEditing={() => setIsEditing(false)}
            didTouch={() => setIsEditing(true)}
          />
        </View>
      </View>

      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  navigation: { flex: 1, marginTop: 43 },
  body: { flex: 10, justifyContent: 'center', alignItems: 'center' },
  footer: { flex: 1, backgroundColor: 'cyan' },
});

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const SearchScreen = connect(mapStateToProps, {})(_SearchScreen);

export { SearchScreen };

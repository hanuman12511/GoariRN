import React from 'react';
import DrawerStack from './src/navigation/Logout';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/data/store';

import StackNav from './src/navigation/StackNav';

export default App = props => {
  return (
    <Provider store={store}>
      <StackNav />
    </Provider>
  );
};

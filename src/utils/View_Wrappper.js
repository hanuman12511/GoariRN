import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {StyleSheet} from 'react-native';

// components
import CustomLoader from 'views/components/CustomLoader';
import ProcessingLoader from 'views/components/ProcessingLoader';

const View_Wrappper = WrappedComponent => {
  const view_Wrappper = props => {
    const {isFetching = false, isProcessing = false} = props;

    return (
      <SafeAreaView style={styles.container}>
        {isFetching ? <CustomLoader /> : <WrappedComponent {...props} />}
        {isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  };

  return view_Wrappper;
};

export default View_Wrappper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

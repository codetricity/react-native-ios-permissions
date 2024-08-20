import  React from 'react';
import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RNPermissions, {check, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';



function App(): React.JSX.Element {

  const [permMessage, setPermMessage ] = useState('');

  const checkPerm = (permName: Permission ) => {
    RNPermissions.check(permName).then((status) => {
      console.log( permName, status);
      setPermMessage( permName + ": " + status)

    })

  }

  const checkPhotoPerm = () => {
    checkPerm(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }

  const checkPhotoAddOnly = () => {
    checkPerm(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  }

  const requestPerm = (permName: Permission) => {
    RNPermissions.request(permName).then((status) => {
      console.log(status);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const requestPhotoPerm = () => {
    requestPerm(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }

  const requestPhotoAddOnly = () => {
    requestPerm(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  }

  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>iOS Permissions Test</Text>
        <Button onPress={checkPhotoPerm} title='Check Photo Permissions' />
        <Button onPress={checkPhotoAddOnly} title='Check Photo Add Perm' />
        <Button onPress={requestPhotoPerm} title='request photo perm' />
        <Button onPress={requestPhotoAddOnly} title='request photo add perm' />
        <Text>{permMessage}</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

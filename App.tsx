import  React from 'react';
import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RNPermissions, {check, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';



function App(): React.JSX.Element {

  const [permMessage, setPermMessage ] = useState('');
  const [url, setUrl] = useState('https://placehold.co/400x400');
  const [ localFilePath, setLocalFilePath] = useState('');

  const handleDownload = async () => {
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', url)
      .then(res => {
        RNPermissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((status) => {
          console.log('photo library permissions: ', status);
        })
        setLocalFilePath(res.path());
        console.log('resource path: ', res.path());
        

      })
      .catch(error => console.log(error));
  };

  const saveToCameraRoll = () => {
    console.log('local file path: ', localFilePath);
        CameraRoll.saveAsset(localFilePath, {type: 'photo'})
          .then(res => console.log(res))
          .catch(err => console.log(err))
  }

  const getFromCameraRoll = () => {
        CameraRoll.getPhotos({first: 10} )
          .then(res => {
            console.log(res.edges);
            // console.log(res);
          })
          .catch(err => console.log(err))
  }

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
        <Button  onPress={handleDownload} title='download to local temp' />
        {/* <Button  onPress={saveToCameraRoll} title='save ' /> */}
        <Button onPress={getFromCameraRoll} title='get list' />

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
  downloadButton: {
    backgroundColor: 'white',
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 3,
  },
});

export default App;

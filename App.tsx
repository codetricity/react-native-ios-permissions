import  React from 'react';
import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import RNPermissions, {check, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';



function App(): React.JSX.Element {

  const [permMessage, setPermMessage ] = useState('');
  const [url, setUrl] = useState('https://fake-theta.vercel.app/files/150100525831424d42075b53ce68c300/100RICOH/R0010015.JPG');
  const [ localFilePath, setLocalFilePath] = useState('');
  const [counter, setCounter] = useState(0);

  const imageList = [
    'https://live.staticflickr.com/65535/52282804643_06049e61d0_o.jpg',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010002.JPG',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010012.JPG',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010028.JPG',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010027.JPG',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010016.JPG',
    'https://codetricity.github.io/fake-storage/files/100RICOH/R0010001.JPG',
    'https://images.unsplash.com/photo-1557971370-e7298ee473fb',
    'https://live.staticflickr.com/65535/52281801817_5d5e7f2669_o.jpg',
    'https://live.staticflickr.com/65535/52379470065_1e9134827d_o.jpg',
  ];

  

  const changeImage = () => {
    console.log(`number of images: ${imageList.length}`)
    if (counter < imageList.length ) {
      setCounter(counter + 1);
    } else {
      console.log('counter is reset')
      setCounter(0);
    }
    console.log(`counter: ${counter}`);
    console.log(`url: ${imageList[counter]}` );
    setUrl(imageList[counter]);
  };

  async function checkGalleryPermissions() {
  
    try {
    await CameraRoll.getPhotos({ first: 1 });
      console.log('Gallery permissions: Granted');
    } catch (error) {
      console.log('Gallery permissions: Denied');
      console.log('Permission error:', error);
      }
    }

  const handleDownload = async () => {
    ReactNativeBlobUtil.config({
      fileCache: true,
      // appendExt: 'png',
      appendExt: 'jpg',
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


  const saveToCameraRoll = async () => {
    let status = await RNPermissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      console.log('photo library permissions: ', status);
      console.log('local file path: ', localFilePath);
    await checkGalleryPermissions();
    await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    try {
      let res = await CameraRoll.saveAsset(localFilePath, {type: 'photo', album: 'THETA'});
        // let res = await CameraRoll.saveAsset(`file:\\${localFilePath}`, {type: 'photo'})

      console.log(res);
    }
  
    catch(err) {
      console.log(err);
    } 
    
  }

  const getFromCameraRoll = () => {
        CameraRoll.getPhotos({first: 10, include: ['filename']} )
          .then(res => {
            console.log(res.edges);
            for(let i = 0; i < res.edges.length; i++) {
              console.log(res.edges[i].node.image)
            }
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
        <Button  onPress={saveToCameraRoll} title='save ' />
        <Button onPress={getFromCameraRoll} title='get list' />
        <Button onPress={changeImage} title='change image' />

        <Text>{permMessage}</Text>

        <Image source={{uri: url}} style={styles.imageStyle} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {width: 400, height: 200},
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

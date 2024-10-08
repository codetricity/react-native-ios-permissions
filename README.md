
# React Native iOS permissions test

Save network images to iOS Camera Roll or separate album.
Download image to local application storage on iOS device with
react-native-blob-util then copy to album.

Set permission with user agreement.  Stores permissions in app.

[Written Tutorial and Tips](https://community.theta360.guide/t/react-native-save-network-image-to-ios-camera-roll-solved-error-phphotoserrordomain-error-1/9875?u=craig)

## Features

### album

![album](readme_assets/album.png)

### gallery

![gallery](readme_assets/image_in_gallery.png)

### view as equirectangular

![equirectangular view](readme_assets/equirectangular.png)

### verify permissions

![photo library](readme_assets/photo_library.png)

![screenshot permissions granted](readme_assets/screenshot.png)

### delete and manage photos using iOS photos app

![delete](readme_assets/delete.png)

## Tips

There is some type of incompatibility between react-native-permissions and camera-roll.
The workaround is described [here](https://github.com/react-native-cameraroll/react-native-cameraroll/issues/617).

Without the workaround, I was getting the error below.

`PHPhotosErrorDomain error -1.`

### Packages Used

* react-native-permissions
* @react-native-camera-roll/camera-roll
* [react-native-blob-util](https://github.com/RonRadtke/react-native-blob-util)

```text
npm install --save react-native-blob-util
...
...
cd ios
pod install
cd ..
```

Note: There seems to be two React Native packages called `react-native-blob-util`. I used
the one linked above.

## Sample Images

* https://fake-theta.vercel.app/files/150100525831424d42075b53ce68c300/100RICOH/R0010015.JPG

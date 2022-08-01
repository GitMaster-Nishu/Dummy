import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
let TaskTypeArry = [
  {TaskCode: 0, Task: 'All'},
  {TaskCode: 1, Task: 'Pending'},
  {TaskCode: 2, Task: 'Complete'},
];
const App = () => {
  useEffect(() => {}, []);

  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    // requestPermissions: Platform.OS === 'ios',
    requestPermissions: true,
  });
  const SendNotification = () => {
    PushNotification.localNotification({
      channelId: 'My Id',
      title: 'Notification',
      message: 'Done RND',
    });
  };

  const item = item => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={({item}) => {
          handleNotification(item.item);
        }}
        style={{
          height: 100,
          width: 200,
          backgroundColor: 'yellow',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{item.item.Task}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      <FlatList data={TaskTypeArry} renderItem={item} />
      <TouchableOpacity
        style={{height: 50, width: 80, borderWidth: 1}}
        onPress={() => {
          SendNotification();
        }}>
        <Text>notification</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;

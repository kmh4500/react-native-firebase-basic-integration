/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firebase from 'react-native-firebase';

// Read the document for user 'Ada Lovelace':
firebase.firestore().collection('profile')
  .doc('user1').get().then((documentSnapshot) => {
    console.log('User data', documentSnapshot.data());
  });

declare var global: {HermesInternal: null | {}};


registerPush = () => {
    console.log("------ register push -------");
    firebaseApp = firebase;
    firebaseMsg = firebase.messaging;

    if (Platform.OS === 'android') {
      const channel = new firebaseApp.notifications.Android.Channel('pet-ch', 'Noti Channel',
          firebaseApp.notifications.Android.Importance.Max).setDescription('Notification channel');

      firebaseApp.notifications().android.createChannel(channel)
    }

    firebaseMsg().hasPermission().then(enabled => {
      if (enabled) {
        // user has permissions
        var notificationDisplayedListener =
            firebaseApp.notifications().onNotificationDisplayed((notification) => {
              // Process your notification as required
              // ANDROID: Remote notifications do not contain the channel ID.
              // You will have to specify this manually if you'd like to re-display the notification.
              // console.log("abcde3")
              // firebaseApp.notifications().displayNotification(notification)
            });
        this.notificationListener =
            firebaseApp.notifications().onNotification((notification) => {
              // Process your notification as required
              // console.log("abcde4")
              if (this.props.rootStore.appStore.profile.settings.pushNoti === undefined ||
                  this.props.rootStore.appStore.profile.settings.pushNoti) {
                localizedNoti = this.makeLocalizedNoti(notification)
                if (Platform.OS === 'android') {
                  notification.android.setChannelId('aloha-noti-ch');
                  notification.android.setSmallIcon("@mipmap/ic_notification");
                  notification.android.setAutoCancel(true);
                }
                firebaseApp.notifications().displayNotification(localizedNoti)
                this.alarmOn = true;
              }
            });
      } else {
        // user doesn't have permission
        firebaseMsg().requestPermission().then(() => {
          this.notificationDisplayedListener =
              firebaseApp.notifications().onNotificationDisplayed((notification) => {
                // Process your notification as required
                // ANDROID: Remote notifications do not contain the channel ID.
                // You will have to specify this manually if you'd like to re-display the notification.
                // console.log("abcde")
                // firebase.notifications().displayNotification(notification)
              });
          this.notificationListener =
              firebaseApp.notifications().onNotification((notification) => {
                // Process your notification as required
                // console.log("abcde2")
                if (this.props.rootStore.appStore.profile.settings.pushNoti === undefined ||
                    this.props.rootStore.appStore.profile.settings.pushNoti) {
                  localizedNoti = this.makeLocalizedNoti(notification)
                  if (Platform.OS === 'android') {
                    notification.android.setChannelId('aloha-noti-ch');
                    notification.android.setSmallIcon("@mipmap/ic_notification");
                    notification.android.setAutoCancel(true);
                  }
                  firebaseApp.notifications().displayNotification(localizedNoti)
                  this.alarmOn = true;
                }
              });
        }).catch(error => {
          // User has rejected permissions
          //console.log("abcde5")
          console.log(error)
        });
      }
    });

    this.notificationOpenedListener = firebaseApp.notifications().onNotificationOpened(
      (notificationOpen) => {
        // Get the action triggered by the notification being opened
        // Get information about the notification that was opened
        if (notificationOpen) {
          const notification = notificationOpen.notification;
          // console.log("NOTI OPEN", notification)
          this.moveToProperScreen(notification);
        }
      }
    );

    if (Platform.OS === 'android') {
      firebaseApp.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
          // console.log("GET INITIAL NOTI", notification)
          this.moveToProperScreen(notification);
        }
      });
    }
  }

const App = () => {
  registerPush();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js');
/*Update this config*/
var firebaseConfig = {
    apiKey: "AIzaSyAvveJ1pJu1ZiIi_tMZz8ZpwvZh5wkdWZU",
    authDomain: "stockmanagement-socialcodia.firebaseapp.com",
    projectId: "stockmanagement-socialcodia",
    storageBucket: "stockmanagement-socialcodia.appspot.com",
    messagingSenderId: "1002537035270",
    appId: "1:1002537035270:web:4877baaa1799950a6c4587",
    measurementId: "G-E6TCK79MMF"
  };

const icon = 'http://store.socialnewsia.com/src/icons/home.png';

  firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
	icon: icon
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
// [END background_handler]
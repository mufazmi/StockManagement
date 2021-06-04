    const vapidKey =  'BHmBfCjBEUhSHrd8iEqjsPEsxkPAv7yNO6N7MS9W0TpA76U_0ADYinFLndCdfzWRBdHLdgHlyyHlh07k0OOLASo';

    var firebaseConfig = {
      apiKey: "AIzaSyAvveJ1pJu1ZiIi_tMZz8ZpwvZh5wkdWZU",
      authDomain: "stockmanagement-socialcodia.firebaseapp.com",
      projectId: "stockmanagement-socialcodia",
      storageBucket: "stockmanagement-socialcodia.appspot.com",
      messagingSenderId: "1002537035270",
      appId: "1:1002537035270:web:4877baaa1799950a6c4587",
      measurementId: "G-E6TCK79MMF"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const messaging = firebase.messaging();

    messaging.requestPermission()
    .then(function(){
        if(isTokenSentToServer())
            console.log("Token Already Saved");
        else
          generateFirebaseToken();
    })
    .catch(function(err)
    {
      console.log("Permission Declined"+err);
    });
    
    function generateFirebaseToken()
    {
      messaging.getToken({ vapidKey: vapidKey }).then((currentToken) => {
        if (currentToken) {
          updateFirebaseWebToken(currentToken);
            setTokenSentToServer(true);
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        setTokenSentToServer(false);
      });
    }
    
  	messaging.onMessage(function(payload) {
  	  console.log("Message received. ", payload);
  	  notificationTitle = payload.data.title;
  	  notificationOptions = {
  	  	body: payload.data.body,
  	  	icon: payload.data.icon
  	  };
  	  var notification = new Notification(notificationTitle,notificationOptions);
  	});
    
    
    
    function setTokenSentToServer(sent)
    {
        window.localStorage.setItem('sentToServer', sent ? 1 : 0);
    }
    
    function isTokenSentToServer() {
  	    return window.localStorage.getItem('sentToServer') == 1;
  	}
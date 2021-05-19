    const vapidKey =  'BHpLLjz0VSROmW953akT28aLgZd9lBHQH9pRqYhoHfhH6UPAyC22T19sLw3veLneQv62hS6694PpX6vVi17y_D8';
    var firebaseConfig = {
      apiKey: "AIzaSyCIE272STpMIefynAFZpIVo74Wn5Ig7U-8",
      authDomain: "azmi-unani-store.firebaseapp.com",
      projectId: "azmi-unani-store",
      storageBucket: "azmi-unani-store.appspot.com",
      messagingSenderId: "498531760192",
      appId: "1:498531760192:web:f302cad7fba6ac35e947a5",
      measurementId: "G-8JJS3FBQ78"
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
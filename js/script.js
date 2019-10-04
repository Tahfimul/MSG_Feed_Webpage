// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBH5-ZGqsTfU-TI7mCGGVV1UjZKaZ0g9aM",
  authDomain: "portfolio-website-tp.firebaseapp.com",
  databaseURL: "https://portfolio-website-tp.firebaseio.com",
  projectId: "portfolio-website-tp",
  storageBucket: "portfolio-website-tp.appspot.com",
  messagingSenderId: "878652500631",
  appId: "1:878652500631:web:8ac74a3e90033132fb57d2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var expires;
var posted;
var msgs = [];

// Listen for latest message updates.
// [START child_event_listener_recycler]

var commentsRef = firebase.database().ref('latest/');
commentsRef.on('child_added', function(data) {
  if (data.key==="expires") expires = data.val();
  if (data.key==="posted")
  {
    posted = data.val();
    createHeaders();
  }
  msgs=[]
  if (data.key==="messages")
  {
    parseMessages();
  }
  createMessagesCards(data.key, data.val());
});

commentsRef.on('child_changed', function(data) {
  if (data.key==="expires") expires = data.val();
  if (data.key==="posted") posted = data.val();
  msgs=[]
  if (data.key==="messages")
  {
    parseMessages();
  }
});

commentsRef.on('child_removed', function(data) {
  deleteAllMessages(postElement, data.key);
});

function parseMessages()
{
  var query = firebase.database().ref("/latest/messages").orderByKey();
  query.once("value")
    .then(function(messagesSnapshot) {
      messagesSnapshot.forEach(function(messageSnapshot) {
        heading = messageSnapshot.child("0").val();
        sub_heading = messageSnapshot.child("1").val();
        msgs[messageSnapshot.key] = [heading, sub_heading];
    });
    createContainer();
    console.log(msgs.length);
    createMessagesCards();
  });
}
// [END child_event_listener_recycler]

var body = document.body;

function createHeaders()
{
  var content =
      '<h3>Posted: '+posted+'</h3>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
      '<h3>Expires: '+expires+'</h3><br><br><br>';
  body.innerHTML += content;
}

function createContainer(){
  var content =
      '<div id="container">'+

      '</div>';

  body.innerHTML += content;
  container = document.getElementById("container");
}

function createMessagesCards(){

  for (var i=1; i<msgs.length; i++)
  {
    console.log(i);
    createMessageCard(i);
  }
}

function createMessageCard(i)
{
    console.log(i);
    console.log(msgs[1]);
    heading = msgs[i][0];
    sub_heading = msgs[i][1];
    console.log(heading);
    var content =
        '<div id="'+i+'">'+
              '<h3>Message#'+i+'</h3>'+
              '<h3><strong>Heading: '+heading+'</strong></h3><br><br>'+
              '<h3>Subheading: '+sub_heading+'</h3>'+
              '--------------------------------------'+
              '<br><br>'+

        '</div>';
    container.innerHTML += content;
}

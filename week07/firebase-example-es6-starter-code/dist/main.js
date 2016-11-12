"use strict";

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAPizkwkvA6QbEyuVQRMdJOY4htiZ3ajMw",
	authDomain: "fir-example-d8600.firebaseapp.com",
	databaseURL: "https://fir-example-d8600.firebaseio.com",
	storageBucket: "fir-example-d8600.appspot.com",
	messagingSenderId: "851745096774"
};

$(function () {

	firebase.initializeApp(config);

	firebase.auth().signInAnonymously().catch(function (error) {
		console.log(error);
		alert("Something went wrong during authentication. Open your console.");
	});

	var messagesRef = firebase.database().ref("messages");

	var writeNewMessage = function writeNewMessage(user, message) {
		var key = firebase.database().ref().child("messages").push().key;
		firebase.database().ref(("messages/" + key).set({ user: user, message: message }));
	};

	var fetchMessages = function fetchMessages() {
		// add event listener
		messagesRef.on("child_added", function (data) {
			var message = data.val();
			$("#messages").append("<li>" + message.user + " said {message.message}</li>");
		});
	};

	fetchMessages();

	$("#new-message").on("click", function () {
		writeNewMessage($("#user").val(), $("#message").val());
	});
});
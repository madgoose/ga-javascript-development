"use strict";

// firebase credentials

var config = {
	apiKey: "AIzaSyAPizkwkvA6QbEyuVQRMdJOY4htiZ3ajMw",
	authDomain: "fir-example-d8600.firebaseapp.com",
	databaseURL: "https://fir-example-d8600.firebaseio.com",
	storageBucket: "fir-example-d8600.appspot.com",
	messagingSenderId: "851745096774"
};

// facebook oauth credentials
hello.init({
	facebook: 554509158073473
}, {
	redirect_uri: "/"
});

$(function () {

	// handlebars
	var chatTemplate = Handlebars.compile($("#chat-template").html());
	var messageTemplate = Handlebars.compile($("#message-template").html());

	// hello.js
	var requestData = function requestData() {
		hello("facebook").api("me").then(function (userInfo) {
			// returned object "userInfo" can be saved in local app database
			window.currentUser = userInfo;
			$("#login").html("Logged in as " + userInfo.name + " <img src=\"" + userInfo.thumbnail + "\">");
			$("body").append(chatTemplate(userInfo));
		});
	};

	var loggedIn = hello.getAuthResponse("facebook");
	if (loggedIn) {
		requestData();
	} else {
		$("#facebook-login").on("click", function () {
			hello("facebook").login().then(requestData);
		});
	}

	// firebase
	firebase.initializeApp(config);

	firebase.auth().signInAnonymously().catch(function (error) {
		console.log(error);
	});

	var messagesRef = firebase.database().ref("messages");

	var fetchMessages = function fetchMessages() {
		messagesRef.on("child_added", function (data) {
			var messageData = data.val();
			$("#messages-list").append(messageTemplate(messageData));
		});
	};

	fetchMessages();

	// write to database
	$("body").on("click", "#send-message", function () {
		// event delegation. elements added dynamically by handlebar template, not in DOM
		var message = $("#message-input").val();
		var key = firebase.database().ref().child("/messages").push().key;
		firebase.database().ref("messages/" + key).set({ user: window.currentUser, message: message });
	});
});
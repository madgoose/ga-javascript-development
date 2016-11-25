"use strict";

// firebase credentials
const config = {
	apiKey: "AIzaSyAPizkwkvA6QbEyuVQRMdJOY4htiZ3ajMw",
	authDomain: "fir-example-d8600.firebaseapp.com",
	databaseURL: "https://fir-example-d8600.firebaseio.com",
	storageBucket: "fir-example-d8600.appspot.com",
	messagingSenderId: "851745096774"
};

// facebook oauth credentials
hello.init({
	facebook: 554509158073473
},{
	redirect_uri: "/"
});

$(() => {

	// handlebars
	let chatTemplate = Handlebars.compile($("#chat-template").html());
	let messageTemplate = Handlebars.compile($("#message-template").html())

	// hello.js
	let requestData = () => {
		hello("facebook").api("me").then ( (userInfo) => {
			// returned object "userInfo" can be saved in local app database
			window.currentUser = userInfo;
			$("#login").html(`Logged in as ${userInfo.name} <img src="${userInfo.thumbnail}">`);
			$("body").append(chatTemplate(userInfo));
		})
	}

	let loggedIn = hello.getAuthResponse("facebook");
	if (loggedIn){
		requestData();
	} else {
		$("#facebook-login").on("click", () => {
			hello("facebook").login().then(requestData);

		})
	}

	// firebase
	firebase.initializeApp(config);

	firebase.auth().signInAnonymously().catch( (error) => {
		console.log(error);
	})

	const messagesRef = firebase.database().ref("messages");

	let fetchMessages = () => {
		messagesRef.on("child_added", (data) => {
			let messageData = data.val();
			$("#messages-list").append(messageTemplate(messageData));
		})
	}

	fetchMessages();

	// write to database
	$("body").on("click", "#send-message", ()=> { // event delegation. elements added dynamically by handlebar template, not in DOM
		let message = $("#message-input").val();
		let key = firebase.database().ref().child("/messages").push().key;
		firebase.database().ref(`messages/${key}`).set({user: window.currentUser, message});
	})

})
// Initialize Firebase
const config = {
	apiKey: "AIzaSyAPizkwkvA6QbEyuVQRMdJOY4htiZ3ajMw",
	authDomain: "fir-example-d8600.firebaseapp.com",
	databaseURL: "https://fir-example-d8600.firebaseio.com",
	storageBucket: "fir-example-d8600.appspot.com",
	messagingSenderId: "851745096774"
};

$( () => {

	firebase.initializeApp(config)

	firebase.auth().signInAnonymously().catch( (error) => {
		console.log(error);
		alert("Something went wrong during authentication. Open your console.")
	});

	const messagesRef = firebase.database().ref("messages");

	const writeNewMessage = (user, message) => {
		let key = firebase.database().ref().child("messages").push().key
		firebase.database().ref(`messages/${key}`).set({ user, message })
	}

	const fetchMessages = () => {
		// add event listener
		messagesRef.on("child_added", (data) => {
			const message = data.val();
			$("#messages").append(`<li>${message.user} said ${message.message}</li>`)
		})
	}

	fetchMessages()

	$("#new-message").on("click", () => {
		writeNewMessage($("#username").val(), $("#message").val())
	})

})
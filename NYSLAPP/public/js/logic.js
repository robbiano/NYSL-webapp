$(document).ready(function () {

    $("#schoolsInfo-page").hide();
    $("#schedule-page").hide();
    $("#chat-page").hide();
    $("#home-page").show();

    $(".chat-btn").click(function () {
        $("#schoolsInfo-page").hide();
        $("#schedule-page").hide();
        $("#home-page").hide();
        $("#chat-page").show();
    });

    $("#home-btn").click(function () {
        $("#chat-page").hide();
        $("#schoolsInfo-page").hide();
        $("#schedule-page").hide();
        $("#home-page").show()
    });

    $("#schoolsInfo-btn").click(function () {
        $("#chat-page").hide();
        $("#home-page").hide();
        $("#schedule-page").hide();
        $("#schoolsInfo-page").show();
    });

    $(".schedule-btn").click(function () {
        $("#chat-page").hide();
        $("#home-page").hide();
        $("#schoolsInfo-page").hide();
        $("#schedule-page").show();
    });
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBkEogREd_WLi7Mj4RCKRykRpAOBAocxaw",
    authDomain: "nysl-soccer-757b5.firebaseapp.com",
    databaseURL: "https://nysl-soccer-757b5.firebaseio.com",
    projectId: "nysl-soccer-757b5",
    storageBucket: "nysl-soccer-757b5.appspot.com",
    messagingSenderId: "613950864125",
    appId: "1:613950864125:web:ccc4c8368944d2d1441c94",
    measurementId: "G-36RGN39W07"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



var app = new Vue({
    el: "#app",
    data: {
        email: "",
        password: "",
        mensaje: "",
        mensajes: [],
        user: null,
        juego: "",
    },
    methods: {

        registrar: function () {
            firebase.auth().createUserWithEmailAndPassword(app.email, app.password)
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        ingresar: function () {
            firebase.auth().signInWithEmailAndPassword(app.email, app.password)
                .then(function () {
                    alert("ingresaste");
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        ingresarGoogle: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        },

        salir: function () {
            firebase.auth().signOut();
        },

        enviar: function () {
            firebase.database().ref(app.juego).push({usuario: app.user.email, texto: app.mensaje});

            app.mensaje= "";
            
        },

        sala: function (numeroSala) {
            app.juego = numeroSala;

            firebase.database().ref(app.juego).on("child_added", function (childSnapshot, prevChildKey) {
                app.mensajes.push(childSnapshot.val());
    
            });

        },

        reset: function(){
            app.mensajes=[];
            firebase.database().ref(app.juego).off();
        }
    }
})

firebase.auth().onAuthStateChanged(function (user) {

    app.user = user;
    

});




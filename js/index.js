var BookIt = BookIt || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

// app.signupController = new BookIt.SignUpController();
app.signInController = new BookIt.SignInController();
app.homeController   = new BookIt.homeController();
app.infoController   = new BookIt.infoController();

//$(document).delegate("#page-signup", "pagebeforeshow", function () {
//    // Reset the signup form.
//    app.signupController.resetSignUpForm();
//});

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signUpController.resetSignUpForm();
                break;
                case "page-signin":
                // Reset signin form.
                app.signInController.resetSignInForm();
                break;
            }
        }
    });

$(document).delegate("#page-signup", "pagebeforecreate", function () {

    app.signupController.init();

    app.signupController.$btnSubmit.off("tap").on("tap", function () {
        app.signupController.onSignupCommand();
    });

});

$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signInController.init();

    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

$(document).on("pagecontainerbeforechange", function (event, ui) {

    if (typeof ui.toPage !== "object") return;
    switch (ui.toPage.attr("id")) {
        case "page-index":
        if (!ui.prevPage) {
            var session = BookIt.Session.getInstance().get(),
            today = new Date();
            if (session && session.keepSignedIn) {
                ui.toPage = $("#page-main-menu");             
            }
        }
    }
});

$(document).delegate("#page-info", "pagebeforecreate", function () {
    app.infoController.init();

    // app.signInController.$btnSubmit.off("tap").on("tap", function () {
    //     app.signInController.onSignInCommand();
    // });
});

$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
    app.homeController.init();

    // app.signInController.$btnSubmit.off("tap").on("tap", function () {
    //     app.signInController.onSignInCommand();
    // });
});
var BookIt = BookIt || {};

BookIt.SignInController = function () {
    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtEmailAddress = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

BookIt.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.mainMenuPageId = "#page-main-menu";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtEmailAddress = $("#txt-email", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chck-rememberme", this.$signInPage);
};

BookIt.SignInController.prototype.resetSignInForm = function () {

    var invisibleStyle = "bi-invisible",
    invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtEmailAddress.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtEmailAddress.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);
};

BookIt.SignInController.prototype.onSignInCommand = function () {

    var me = this,
    emailAddress = me.$txtEmailAddress.val().trim(),
    password = me.$txtPassword.val().trim(),
    checksession = me.$chkKeepSignedIn.is(":checked"),
    invalidInput = false,
    invisibleStyle = "bi-invisible",
    invalidInputStyle = "bi-invalid-input";

    // alert(checksession)
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtEmailAddress.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtEmailAddress.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Por favor llenar los datos.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    // if (!me.emailAddressIsValid(emailAddress)) {
    //     me.$ctnErr.html("<p>Please enter a valid email address.</p>");
    //     me.$ctnErr.addClass("bi-ctn-err").slideDown();
    //     me.$txtEmailAddress.addClass(invalidInputStyle);
    //     return;
    // }

    $.mobile.loading("show", {
        theme: 'a'
    });

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "http://eventos.cbn.bo/cbnapp/entrar_de_datos.php",
        data: "usuario=" + emailAddress + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");
            if (resp.validacion === true) {
                // Create session. 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + BookIt.Settings.sessionTimeoutInMSec);

                BookIt.Session.getInstance().set({
                    userProfileModel: resp.nombre,
                    sessionId: emailAddress,
                    expirationDate: expirationDate,
                    keepSignedIn:checksession
                });
                // Go to main menu.
                $.mobile.navigate(me.mainMenuPageId);
                return;
            } else {
                // if (resp.extras.msg) {
                    switch (resp.validacion) {
                        case "false":
                        // TODO: Use a friendlier error message below.
                        me.$ctnErr.html("<p>Perdon hubo un problema al iniciar sesión. Por favor intentelo de nuevo.</p>");
                        me.$ctnErr.addClass("bi-ctn-err").slideDown();
                        break;
                        case "false":
                        case "false":
                        me.$ctnErr.html("<p>Ingreso sus datos incorrectos. Por favor verificar.</p>");
                        me.$ctnErr.addClass("bi-ctn-err").slideDown();
                        me.$txtEmailAddress
                        .addClass(invalidInputStyle);
                        break;
                    }
                // }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Perdon hubo un problema al iniciar sesión. Por favor intentelo de nuevo.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};
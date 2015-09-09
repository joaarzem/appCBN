var BookIt = BookIt || {};

BookIt.infoController = function () {
    this.$infoPage      = null;
    this.mainMenuPageId = null;
    this.$legajo        = null;
    this.$fechaIngreso  = null;
    this.$posicion      = null;
    this.$banda         = null;
    this.$depende       = null;
    this.$legajo        = null;
    this.$leagjosesion  = null;
};

BookIt.infoController.prototype.init = function () {
    var session = BookIt.Session.getInstance().get();
    var leagjosesion   = session.sessionId;
    this.$infoPage     = $("#page-info");
    this.$legajo       = $("#legajo", this.$infoPage);
    this.$fechaIngreso = $("#fechaIngreso", this.$infoPage);
    this.$posicion     = $("#posicion", this.$infoPage);
    this.$banda        = $("#banda", this.$infoPage);
    this.$depende      = $("#depende", this.$infoPage);
    $.mobile.loading("show", {
        theme: 'a'
    });

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "http://eventos.cbn.bo/cbnapp/get_all_data.php",
        data: "legajo=" + leagjosesion ,
        success: function (resp) {
            $.mobile.loading("hide");
            if (resp.validacion === true) {
                // Create session. 
                $("#legajo").html(leagjosesion);
                $("#fechaIngreso").html(resp.fechaIngreso);
                $("#posicion").html(resp.posicion);
                $("#banda").html(resp.banda);
                $("#depende").html(resp.depende);
                $("#rciva").html(resp.rciva);
                return;
            } else {
                    alert(resp.validacion)
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
        }
    });

    $.ajax({
        type: 'POST',
        dataType: 'html',
        url: "http://eventos.cbn.bo/cbnapp/get_own_vacations.php",
        data: "legajo=" + leagjosesion ,
        success: function (resp) {
            $.mobile.loading("hide");
            $("#vacacionesPropias").html(resp)
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
        }
    });

    
};
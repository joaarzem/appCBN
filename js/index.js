

jQuery(document).ready(function($) {
	document.addEventListener("deviceready", ondeviceready, false);
	$('#formulario').submit(function() { 


	// recolecta los valores que inserto el usuario
	var datosUsuario = $("#txt-number").val()
	var datosPassword = $("#txt-password").val()
	
	archivoValidacion = "https://www.cbn.com.bo/webpedidos/cbnapp/validacion_de_datos.php?jsoncallback=?"
	$.getJSON( archivoValidacion, { usuario:datosUsuario ,password:datosPassword})
	.done(function(respuestaServer) {
		
		alert(respuestaServer.mensaje + "\nGenerado en: " + respuestaServer.hora + "\n" +respuestaServer.generador)
		
		if(respuestaServer.validacion == "ok"){

		 	/// si la validacion es correcta, muestra la pantalla "home"
		 	$.mobile.changePage("#home")

		 }else{

		  /// ejecutar una conducta cuando la validacion falla
		}

	})
	return false;
})
});

function ondeviceready() {
	console.log("Entro aplicacion")
}
﻿var BookIt = BookIt || {};

BookIt.homeController = function () {
	this.$homePage = null;
	this.mainMenuPageId = null;
	this.$nombreUsuario = null;
	this.$profile_info  = null;
};

BookIt.homeController.prototype.init = function () {
	var session = BookIt.Session.getInstance().get();
    // $("#nombreUsuario").text(session.userProfileModel)
    this.$homePage      = $("#page-main-menu");
    this.$nombreUsuario = $("#nombreUsuario", this.$homePage);
    this.$profile_info  = $(".profile_info", this.$homePage);
    this.$nombreUsuario.html("HOLA, "+session.userProfileModel);
    this.$profile_info.html("<strong>"+session.userProfileModel+"</strong>");

    
};

$( document ).on( "swipeleft swiperight", "#list li", function( event ) {
	var listitem = $( this ),
	
	dir = event.type === "swipeleft" ? "left" : "right",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
            confirmAndDelete( listitem, transition );
        });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#list" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
        	var listitem = $( this ).parent( "li" );
        	confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
            // Remove with a transition
            if ( transition ) {
            	listitem
                    // Add the class for the transition direction
                    .addClass( transition )
                    // When the transition is done...
                    .on( "webkitTransitionEnd transitionend otransitionend", function() {
                        // ...the list item will be removed
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        $( "#list" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                    })
                    // During the transition the previous button gets bottom border
                    .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                    // Remove the highlight
                    .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
                }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
            	listitem.remove();
            	$( "#list" ).listview( "refresh" );
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
        	listitem.removeClass( "ui-btn-active" );
        	$( "#confirm #yes" ).off();
        });
    }

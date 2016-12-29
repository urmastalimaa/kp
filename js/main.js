;(function () {

	'use strict';

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

  var rsvpSubmissionKey = 'rsvp_submitted';

  function disableRsvpForm() {
    $("#rsvp-form button[type='submit']").hide();
    $("#rsvp-form select,input,textarea").prop('disabled', true);
  }

  function onRsvpSuccess() {
    localStorage[rsvpSubmissionKey] = "true";
    $("#formResult")
      .removeClass("alert-danger")
      .addClass("alert-success")
      .text("Aitäh! Sinu registreerimine on salvestatud")
      .show();
    disableRsvpForm();
  }

  function onRsvpFail() {
    $("#formResult")
      .removeClass("alert-success")
      .addClass("alert-danger")
      .text("Registreerimisel tekkis viga. Proovi hiljem uuesti")
      .show();
  }

  function gatherFormData() {
    var $target = $("#rsvp-form");
    return {
      nimi: $target.find("#inputName").val(),
      email: $target.find("#inputEmail").val(),
      osalemine: $target.find("#inputOsalemine option:selected").text(),
      saabumine: $target.find("#inputSaabumine option:selected").text(),
      erisoovid: $target.find("#inputErisoovid").val(),
      _next: "/form/thanks.html"
    };
  }

  function setupForm() {
    if (localStorage[rsvpSubmissionKey] === "true") {
      $("#registrationQuery")
        .text("Sinu registreerimine on salvestatud")
        .addClass("alert-success");
      disableRsvpForm();
    }

    $("#rsvp-form").validator().on('submit', function(event){
      var formTargetURL = "https://formspree.io/urmas.talimaa@gmail.com";
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        $.post(formTargetURL, gatherFormData()).then(onRsvpSuccess, onRsvpFail);
      }
    });
  }

	$(function(){
		loaderPage();
    setupForm();
	});

}());

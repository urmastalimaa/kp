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

  function disableRsvpClear() {
    $("#rsvp-form button#clear").hide();
  }

  function enableRsvpClear() {
    $("#rsvp-form button#clear").show();
  }

  function clearRsvp() {
    disableRsvpClear();
    $("#rsvp-form button[type='submit']").show();
    $("#rsvp-form select,input,textarea").prop('disabled', false);
  }

  function gatherFormData() {
    var $target = $("#rsvp-form");
    return {
      nimi: $target.find("#inputName").val(),
      osalemine: $target.find("#inputOsalemine option:selected").text(),
      saabumine: $target.find("#inputSaabumine option:selected").text(),
      lahkumine: $target.find("#inputLahkumine option:selected").text(),
      erisoovid: $target.find("#inputErisoovid").val(),
      _next: "/form/thanks.html"
    };
  }

  $.extend(
{
    redirectPost: function(location, args)
    {
        var form = $('<form></form>');
        form.attr("method", "post");
        form.attr("action", location);

        $.each( args, function( key, value ) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });
        $(form).appendTo('body').submit();
    }
});


  function setupForm() {
    if (localStorage[rsvpSubmissionKey] === "true") {
      $("#registrationQuery")
        .text("Sinu registreerimine on salvestatud")
        .addClass("alert-success");
      disableRsvpForm();
      $('button#clear').on('click', function(event) {
        localStorage[rsvpSubmissionKey] = "false";
        clearRsvp();
      });
    } else {
      disableRsvpClear();
    }

    $("#rsvp-form").validator().on('submit', function(event){
      var formTargetURL = "https://formspree.io/reinumagi.dagmar@gmail.com";
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        localStorage[rsvpSubmissionKey] = "true";
        $.redirectPost(formTargetURL, gatherFormData());
      }
    });
  }

	$(function(){
		loaderPage();
    setupForm();
	});

}());

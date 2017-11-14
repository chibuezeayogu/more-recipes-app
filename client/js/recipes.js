$(document).ready(() => {
    $(".dropdown-button").dropdown();
    $('select').material_select();
    $('#textarea1').val('New Text');
  	$('#textarea1').trigger('autoresize');
  	$(".button-collapse").sideNav();
  	$('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
  });
    $('ul.tabs').tabs();
    $( "#postComment" ).on('click', () => {
    let value = $('#editablediv').attr('contenteditable');

    if (value == 'false') {
        $('#editablediv').attr('contenteditable','true');
        $('#editablediv').show();
        $('#postReview').show();
    }
    else {
        $('#editablediv').attr('contenteditable','false');
        $('#editablediv').hide();
        $('#postReview').hide();
    }
  });
});
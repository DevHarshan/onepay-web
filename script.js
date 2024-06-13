$(document).ready(function() {
    // Load header.html
    $.ajax({
        url: 'header.html',
        dataType: 'html',
        success: function(response) {
            $('#header').html(response);
        }
    });

    // Load footer.html
    $.ajax({
        url: 'footer.html',
        dataType: 'html',
        success: function(response) {
            $('#footer').html(response);
        }
    });
});

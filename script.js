// $(document).ready(function() {
   
//     $.ajax({
//         url: 'header.html',
//         dataType: 'html',
//         success: function(response) {
//             $('#header').html(response);
//             setActiveLink();  
//         }
//     });

 
//     $.ajax({
//         url: 'footer.html',
//         dataType: 'html',
//         success: function(response) {
//             $('#footer').html(response);
//         }
//     });

//     function setActiveLink() {
//         const navLinks = $('.nav-link, .navbar-brand');
//         const activeLink = localStorage.getItem('activeLink');
//         const nonActiveLinks = [
//             'index.html',
//             'https://developer.onepay.lk/#introduction'
//         ];

//         if (activeLink) {
//             navLinks.each(function () {
//                 const link = $(this);
//                 if (link.attr('href') === activeLink) {
//                     link.addClass('active');
//                 } else {
//                     link.removeClass('active');
//                 }
//             });
//         }

//         navLinks.each(function () {
//             const link = $(this);

//             link.on('click', function (event) {
//                 event.preventDefault();
//                 const href = link.attr('href');

//                 if (nonActiveLinks.includes(href)) {
//                     localStorage.removeItem('activeLink');
//                     navLinks.removeClass('active');
//                 } else {
//                     localStorage.setItem('activeLink', href);
//                     navLinks.removeClass('active');
//                     link.addClass('active');
//                 }
//                 window.location.href = href;
//             });
//         });
//     }
// });


$(document).ready(function() {
    // Load header.html
    $.ajax({
        url: 'header.html',
        dataType: 'html',
        success: function(response) {
            $('#header').html(response);
            setActiveLink();  // Call setActiveLink after loading the header
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

    function setActiveLink() {
        const navLinks = $('.nav-link, .navbar-brand');
        const activeLink = localStorage.getItem('activeLink');
        const nonActiveLinks = [
            'index.html',
            'https://developer.onepay.lk/#introduction'
        ];

        // Set active class based on stored activeLink
        if (activeLink) {
            navLinks.each(function () {
                const link = $(this);
                if (link.attr('href') === activeLink) {
                    link.addClass('active');
                } else {
                    link.removeClass('active');
                }
            });
        }

        navLinks.each(function () {
            const link = $(this);

            link.on('click', function (event) {
                const href = link.attr('href');

                if (nonActiveLinks.includes(href)) {
                    localStorage.removeItem('activeLink');
                    navLinks.removeClass('active');
                } else {
                    localStorage.setItem('activeLink', href);
                    navLinks.removeClass('active');
                    link.addClass('active');
                }

                // Navigate to the href of the clicked link
                if (href === 'https://developer.onepay.lk/#introduction') {
                    event.preventDefault();
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            });
        });
    }
});


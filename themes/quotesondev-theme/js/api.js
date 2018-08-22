(function($) {
  'use strict';
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    let lastPage = document.URL;

    $.ajax({
      beforeSend: xhr => xhr.setRequestHeader('X-WP-Nonce', apiVars.nonce),
      url:
        apiVars.restUrl +
        'wp/v2/posts/' +
        '?filter[orderby]=rand&filter[posts_per_page]=1',
      method: 'GET'
    }).done(data => {
      history.pushState(null, null, data[0].slug);
      $('.entry-content p').html(data[0].content.rendered);
      $('.entry-title').html('— ' + data[0].title.rendered);
      if (data[0]._qod_quote_source !== '') {
        if (data[0]._qod_quote_source_url === '') {
          $('.source').html(`, ${data[0]._qod_quote_source}`);
        } else {
          $('.source').html(
            `, <a href="${data[0]._qod_quote_source_url}">${
              data[0]._qod_quote_source
            }</a>`
          );
        }
      } else {
        $('.source').empty();
      }
    });
  });

  $(window).on('popstate', () => window.location.replace(lastPage));
})(jQuery);

// TODO: fix page refresh
// TODO: fix browser load on back

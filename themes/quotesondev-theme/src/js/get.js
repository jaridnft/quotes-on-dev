(function($) {
  'use strict';
  let lastPage = '';

  $('.new-quote-button').on('click', function(event) {
    event.preventDefault();
    let lastPage = document.URL;

    $.ajax({
      beforeSend: xhr => xhr.setRequestHeader('X-WP-Nonce', apiVars.nonce),
      url: `${
        apiVars.restUrl
      }wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1`,
      method: 'GET'
    })
      .done(data => {
        history.pushState(null, null, `${apiVars.rootUrl}/${data[0].slug}`);
        $('.entry-content p').html(data[0].content.rendered);
        $('.entry-title').html(`&mdash; ${data[0].title.rendered}`);
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
      })
      .fail(() => alert('Something went wrong.'));
  });

  $(window).on('popstate', () => window.location.replace(lastPage));
})(jQuery);

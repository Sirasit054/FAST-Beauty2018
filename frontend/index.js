$(function(){
    loadAllPost();
});

$('#search').click(function(){
    loadPostByUser();
});

function loadAllPost() {
    $('#posts').empty();
    //Get all posts
    var url = 'http://localhost:3001/api/posts';

    // POINT 6. Call REST APIs with Axios
    axios.get(url)
    .then(function (response) {
        $.get('post.mst', function(template) {
            for(i=0; i<response.data.length; i++){
                response.data[i].create_date = moment().format('LLL');
                var rendered = Mustache.render(template, response.data[i]);
                $('#posts').append(rendered);
            }
          });
    })
    .catch(function (error) {
      console.log(error);
    });
  

    // POINT 7. User Mustache render template(post.mst) with json data from the API

    

}

function loadPostByUser() {
    // Additional 1.
    $('#posts').empty();

    var url = 'http://localhost:3001/api/posts/mypost';
    axios.get(url)
    .then(function (response) {
        $.get('post.mst', function(template) {
            for(i=0; i<response.data.length; i++){
                response.data[i].create_date = moment().format('LLL');
                var rendered = Mustache.render(template, response.data[i]);
                $('#posts').append(rendered);
            }
          });
    })
    .catch(function (error) {
      console.log(error);
    });
}
    


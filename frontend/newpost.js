$('#post').click(function(){
    createNewPost();
});

$('#photo').change(function(){
    previewPhoto($('#photo').val());
});

function createNewPost(req, res){

    var uname = $('#username').val();
    var utitle = $('#title').val();
    var ucomment = $('#comment').val();
    var uimage_url = $('#photo').val();
    moment.locale('th');
    var newpost = {
        // POINT 8. Use jQuery to get form data and create an object for new post
        username : uname,
        title : utitle,
        comment : ucomment,
        image_url : uimage_url,
        create_date: moment().format('LLL')
    };
    console.log(newpost);

    var url = 'http://localhost:3001/api/posts';
    // POINT 9. Insert data to REST API with axios
    axios.post(url, newpost)
    .then(function (response) {
        window.location.href = 'http://localhost:3001/';
    })
    .catch(function (error) {
      console.log(error);
    });

}

function previewPhoto(src){
    $('#preview').attr('src', src);
}
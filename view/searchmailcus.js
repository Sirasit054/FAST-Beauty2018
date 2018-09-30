$(function(){
  $('#search').click(function(){
    var email = document.getElementById("emailsearch").value; 
    console.log("email : " + email);

    axios.get('http://localhost:3000/customers/searchmail?email='+ email)
    .then(function (response) {
      console.log(response.data.length);
      if(response.data.length > 0){
        $('#panel').empty();
        for(i=0; i<response.data.length; i++){
          $('#panel').append(
            '<tr><th scope="row" id="num"><center>'+ response.data[i]._id +'</center></th>'+
            '<td id="fname">'+ response.data[i].fname +'</td>'+
            '<td id="lname">'+ response.data[i].lname +'</td>'+
            '<td id="email">'+ response.data[i].email +'</td>'+
            '<td id="pass">'+ response.data[i].pass +'</td></tr>'
          );
        }
      }else{
        $('#panel').empty();
        $('#panel').append(
          '<tr><th scope="row" id="num"><center>No data</center></th>'+
          '<td id="fname">No data</td>'+
          '<td id="lname">No data</td>'+
          '<td id="email">No data</td>'+
          '<td id="pass">No data</td></tr>'
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  
  
});

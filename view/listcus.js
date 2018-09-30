axios.get('http://localhost:3000/customers')
  .then(function (response) {
    console.log(response.data.length);
    for(i=0; i<response.data.length; i++){
      $('#panel').append(
        '<tr><th scope="row" id="num"><center>'+ response.data[i]._id +'</center></th>'+
        '<td id="fname">'+ response.data[i].fname +'</td>'+
        '<td id="lname">'+ response.data[i].lname +'</td>'+
        '<td id="email">'+ response.data[i].email +'</td>'+
        '<td id="pass">'+ response.data[i].pass +'</td></tr>'
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });

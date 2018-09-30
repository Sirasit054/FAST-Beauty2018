axios.get('http://localhost:3000/beautys')
  .then(function (response) {
    console.log(response.data.length);
    for(i=0; i<response.data.length; i++){
      $('#panel').append(
        '<tr><th scope="row" id="num"><center>'+ response.data[i].beautyname +'</center></th>'+
        '<td id="username">'+ response.data[i].username +'</td>'+
        '<td id="phone">'+ response.data[i].phone +'</td>'+
        '<td id="email">'+ response.data[i].email +'</td>'+
        '<td id="day ">'+ response.data[i].day +'</td>'+
        '<td id="gender">'+ response.data[i].gender +'</td></tr>'
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });

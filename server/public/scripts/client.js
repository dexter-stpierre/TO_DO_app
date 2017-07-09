console.log("js sourced");
$(document).ready(function(){
  console.log("jquery sourced");
  $("#submit").on('click', function(){
    console.log('submit button clicked');
    var newTask = $('#newTask').val();
    console.log(newTask);
    $('#newTask').val("");
    $.ajax({
      type: "POST",
      url: '/addTask',
      data: {newTask: newTask},
      success: function(response){
        console.log('new task added');
      }
    })
  })
})

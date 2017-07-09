console.log("js sourced");
$(document).ready(function(){
  console.log("jquery sourced");
  refreshTasks();
  addClickListeners();
})//end document readt

function addNewTask(task){
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
}

function addClickListeners(){
  $("#submit").on('click', function(){
    console.log('submit button clicked');
    addNewTask();
  })
}

function refreshTasks(){
  $.ajax({
    type: "GET",
    url: '/tasks',
    success: function(response){
      console.log(response);
    }
  })
}

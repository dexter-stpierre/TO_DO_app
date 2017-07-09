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
      appendToDom(response.tasks);
    }
  })
}

function appendToDom(listOfTasks){
  //console.log(listOfTasks[3].complete);
  for(var i = 0; i < listOfTasks.length; i++){
    var task = listOfTasks[i];
    console.log(task.complete);
    if(task.complete == false){
      var $tr = $("<tr class='incomplete'></tr>")
    }
    else if (task.complete == true){
      var $tr = $("<tr class='complete'></tr>")
    }
    console.log(task.task_name)
    $tr.append("<td data-id=" + task.id + ">" + task.task_name + "</td>")
    $('#tasks').append($tr);

  }
}

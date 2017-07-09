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
    url: '/tasks',
    data: {newTask: newTask},
    success: function(response){
      console.log('new task added');
      refreshTasks();
    }
  })
}

function addClickListeners(){
  $("#submit").on('click', function(){
    console.log('submit button clicked');
    addNewTask();
  })
  $("#tasks").on('click', '.complete', function(){
    var id = $(this).data("id");
    completeTask(id);
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
  $("#tasks").empty();
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
    $tr.append("<td class='name'>" + task.task_name + "</td>")
    if(task.complete == true){
      $tr.append("<td>Yes</td>")
    }
    else if(task.complete == false){
      $tr.append("<td>No</td>")
    }
    $tr.append("<td><button class='complete' data-id='" + task.id + "'>Task Completed</button></td>")
    $tr.append("<td><button class='delete' data-id='" + task.id + "'>Delete</button></td>")
    $('#tasks').append($tr);

  }
}

function completeTask(id){
  console.log(id);
  $.ajax({
    type: "PUT",
    url: '/tasks/' + id,
    success: function(response){
      refreshTasks();
    }
  })
}

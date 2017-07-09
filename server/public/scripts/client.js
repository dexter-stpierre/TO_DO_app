console.log("js sourced");
$(document).ready(function(){
  console.log("jquery sourced");
  //display tasks
  refreshTasks();
  addClickListeners();
})//end document ready

//send new task to server
function addNewTask(task){
  var newTask = {}
  //set new task object
  newTask.name = $('#newTask').val();
  newTask.completeBy = $('#completeBy').val();
  console.log(newTask);
  //reset input fields
  $('#newTask').val("");
  $('#completeBy').val("");
  //send to server
  $.ajax({
    type: "POST",
    url: '/tasks',
    data: newTask,
    success: function(response){
      console.log('new task added');
      refreshTasks();
    }
  })
}

//name explains it!
function addClickListeners(){
  $("#submit").on('click', function(){
    console.log('submit button clicked');
    addNewTask();
  })
  $("#tasks").on('click', '.completeBtn', function(){
    var id = $(this).data("id");
    console.log("clicked complete btn");
    completeTask(id);
  })

  $('#tasks').on('click', '.deleteBtn', function(){
    var id = $(this).data("id");
    //confirm delete
    var answer = confirm("are you sure you want to delete this task?")
    console.log(answer)
    if(answer == true){deleteTask(id);}
  })
}

//get new list of tasts and append to dom
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

//clear table and display new list of tasks
function appendToDom(listOfTasks){
  $("#tasks").empty();
  for(var i = 0; i < listOfTasks.length; i++){
    var task = listOfTasks[i];
    //convert dates to formats to be displayed and compared
    var completeBy = new Date(task.complete_by).toDateString();
    var comp = Date.parse(completeBy);
    var today = Date.parse(new Date().toDateString());
    //Check if task is complete to determine class
    var $tr = $("<tr class='"+ task.id + task.task_name + "'></tr>")
    $tr.append("<td class='name'>" + task.task_name + "</td>")
    //compare dates to determine class
    if(today == comp){
      $tr.addClass("doToday");
    }
    else if(today > comp){
      $tr.addClass("overdue")
    }
    $tr.append("<td>" + completeBy + "</td>");
    //check if task is complete
    if(task.complete == true){
      $tr.append("<td class='center'>Yes</td>");
      $tr.append("<td></td>")
      $tr.removeClass('doToday overdue')
      $tr.addClass("complete")
    }
    else if(task.complete == false){
      $tr.append("<td class='center'>No</td>");
      $tr.append("<td class='center'><button class='completeBtn' data-id='" + task.id + "'>Task Completed</button></td>")
      $tr.addClass("incomplete")
    }
    $tr.append("<td class='center'><button class='deleteBtn' data-id='" + task.id + "'>Delete</button></td>")
    $('#tasks').append($tr);
  }
}

//tell server a task is complete
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

//tell server to delete task
function deleteTask(id){
  console.log(id);
  $.ajax({
    type: "DELETE",
    url: "/tasks/" + id,
    success: function(response){
      refreshTasks();
    }
  })
}

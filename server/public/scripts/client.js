console.log("js sourced");
$(document).ready(function(){
  console.log("jquery sourced");
  refreshTasks();
  addClickListeners();
})//end document readt

function addNewTask(task){
  var newTask = {}
  newTask.name = $('#newTask').val();
  newTask.completeBy = $('#completeBy').val();
  console.log(newTask);
  $('#newTask').val("");
  $('#completeBy').val("");
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
  $("#tasks").on('click', '.completeBtn', function(){
    var id = $(this).data("id");
    console.log("clicked complete btn");
    completeTask(id);
  })

  $('#tasks').on('click', '.deleteBtn', function(){
    var id = $(this).data("id");
    var answer = confirm("are you sure you want to delete this task?")
    console.log(answer)
    if(answer == true){deleteTask(id);}
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
    var d = new Date(task.complete_by);
    var completeBy = d.toDateString();
    var comp = Date.parse(completeBy);
    var t = new Date();
    var today = Date.parse(t.toDateString());
    if(task.complete == false){
      var $tr = $("<tr class='incomplete "+ task.id + task.task_name + "'></tr>")
    }
    else if (task.complete == true){
      var $tr = $("<tr class='complete "+ task.id + task.task_name + "'></tr>")
    }
    console.log(task.task_name)
    $tr.append("<td class='name'>" + task.task_name + "</td>")
    console.log(today);
    console.log(comp);
    if(today == comp){
      $tr.addClass("doToday");
    }
    else if(today > comp){
      $tr.addClass("overdue")
    }
    $tr.append("<td>" + completeBy + "</td>");
    if(task.complete == true){
      $tr.append("<td class='center'>Yes</td>");
      $tr.append("<td></td>")
      $tr.removeClass('doToday overdue')
      //$tr.removeClass('overdue')
    }
    else if(task.complete == false){
      $tr.append("<td class='center'>No</td>");
      $tr.append("<td class='center'><button class='completeBtn' data-id='" + task.id + "'>Task Completed</button></td>")
    }
    $tr.append("<td class='center'><button class='deleteBtn' data-id='" + task.id + "'>Delete</button></td>")
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

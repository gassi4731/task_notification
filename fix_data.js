// APIの結果に対して優先度の値を付与
function fixData(tasks) {
  for (var i=0; i<tasks.length; i++){
    tasks[i].deadline = new Date(tasks[i].deadline)
    tasks[i].priority = createTaskPriority(tasks[i].deadline)
  }
  return tasks
}

// 優先度を作成
function createTaskPriority(deadline) {
  let now = new Date();
  let diff = (deadline.getTime() - now.getTime()) / (60*60*1000);
  if (diff <= 24.0){
    return 0
  } else if  (diff <= 48.0){
    return 1
  } else {
    return 2
  }
}

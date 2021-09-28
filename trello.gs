var trelloKey   = PropertiesService.getScriptProperties().getProperty('TRELLO_KEY');
var trelloToken = PropertiesService.getScriptProperties().getProperty('TRELLO_TOKEN');
var boardId = PropertiesService.getScriptProperties().getProperty('TRELLO_BOARD_ID');
var listId　= PropertiesService.getScriptProperties().getProperty('TRELLO_LIST_ID');

function trelloAction(tasks) {
  const newTasks = [].concat(tasks);
  const registeredTasks = JSON.parse(trelloGetCard());

  // 既存のカードと被りがないか確認
  for(var i=0; i<newTasks.length; i++) {
    const newTask = newTasks[i];
    const name = '【課題】' + newTask.title;
    const desc = newTask.url + '  ' + newTask.className;
    var okFlag = true;

    for(var j=0; j<registeredTasks.length; j++) {
      const registeredTask = registeredTasks[j];
      if(name == registeredTask.name && desc == registeredTask.desc) {
        okFlag = false;
        break
      }
    }
    if (okFlag) {
      // カードを追加
      trelloAddCard(newTask.title, new Date(newTask.deadline), newTask.url, newTask.className)
    }
  }
  Logger.log('Success: Trello Action')
}

// リスト情報を取得
function trelloGetList() {
  var url = "https://trello.com/1/boards/" + boardId + "/lists?key=" + trelloKey + "&token=" + trelloToken + "&fields=name";
  res = UrlFetchApp.fetch(url, {'method':'get'});
  return res;
}

// カード情報を取得
function trelloGetCard() {
  var url = "https://trello.com/1/lists/" + listId + "/cards?key=" + trelloKey + "&token=" + trelloToken + "&fields=desc,name";
  var res = UrlFetchApp.fetch(url, {'method':'get'});
  return res;
}

// カードを追加する
function trelloAddCard(taskTitle, taskDeadline, taskURL, className) {
  var cardName = '【課題】' + taskTitle;
  var cardDesc = taskURL + '  ' + className;
  var cardPos = "top";
  var cardDue = taskDeadline.setHours(taskDeadline.getHours());

  var url = "https://trello.com/1/cards?key=" + trelloKey 
    + "&token=" + trelloToken 
    + "&idList=" + listId
    + "&name=" + cardName
    + "&desc=" + cardDesc
    + '&due=' + cardDue
    + '&pos=' + cardPos
  res = UrlFetchApp.fetch(url, {'method':'post'});
  Logger.log(res);
}
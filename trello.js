var trelloKey   = PropertiesService.getScriptProperties().getProperty('TRELLO_KEY');
var trelloToken = PropertiesService.getScriptProperties().getProperty('TRELLO_TOKEN');
var boardId = PropertiesService.getScriptProperties().getProperty('TRELLO_BOARD_ID');
var listId　= PropertiesService.getScriptProperties().getProperty('TRELLO_LIST_ID');
var taskTypeText = ['小テスト', 'アンケート', 'レポート'];

function trelloAction(tasks) {
  const registeredTasks = JSON.parse(trelloGetCard());

  // 既存のカードと被りがないか確認
  tasks.forEach(function(task){
    Logger.log(task);
    const taskName = '【' + taskTypeText[task.type] + '】' + task.title.replace("#","");
    const taskDesc = task.url + '  ' + task.className;
    var okFlag = true;

    registeredTasks.some(function(registeredTask){
      if(taskName == registeredTask.name && taskDesc == registeredTask.desc) {
        okFlag = false;
        return true
      }
    });
    var taskDue = new Date(task.deadline);
    taskDue.setHours(taskDue.getHours() - 9);
    if (okFlag) {
      const cardContent = {
        'name': taskName,
        'desc': taskDesc,
        'due': taskDue,
        'pos': 'top'
      }

      // カードを追加
      trelloAddCard(cardContent);
    }
  });
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
function trelloAddCard(cardContent) {
  const url = 'https://trello.com/1/cards?pos=top&key=' + trelloKey + "&idList=" + listId + "&token=" + trelloToken + '&due=' + cardContent.due + "&desc=" + cardContent.desc + "&name=" + cardContent.name;
  Logger.log(url);
  UrlFetchApp.fetch(url, {'method':'post'});
}

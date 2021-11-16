var userId = PropertiesService.getScriptProperties().getProperty('SLACK_USER_ID'); // SlackのメンションするユーザーID
var youbiText = ["日", "月", "火", "水", "木", "金", "土"];
var priorityText = ['danger', 'warning', '#898989'];
var taskTypeText = ['小テスト', 'アンケート', 'レポート'];
var pretextFlag = true;

function createFallback(tasks){
  var text = '';
  var dangerTaskCount = 0;
  var warningTaskCount = 0;
  var normalTaskCount = 0;
  tasks.forEach(function(value){
    switch (value.priority){
      case 0:
        dangerTaskCount += 1;
        break;
      case 1:
        warningTaskCount += 1;
        break;
      case 2:
        normalTaskCount += 1;
        break;
    }
  });

  if (dangerTaskCount >= 1) {
    text = '<@' + userId + '> *24時間以内に締め切りの課題が' + dangerTaskCount + '個あります*' ;
  } else if (warningTaskCount >= 1) {
    text = '<!here> *48時間以内に締め切りの課題が' + warningTaskCount + '個あります*' ;
  } else {
    text = '早めに終わらせたほうが良い課題が' + normalTaskCount + '個あります';
  }
  return text 
}

function createField(fallback, taskTitle, taskDeadline, taskType, taskURL, className) {
  var deadLineText = Utilities.formatDate(taskDeadline, 'Asia/Tokyo', 'yyyy/MM/dd') + "(" + youbiText[taskDeadline.getDay()] + ") " + Utilities.formatDate(taskDeadline, 'Asia/Tokyo', 'HH:mm')

  var message = {
    "fallback": fallback,
    "color": priorityText[createTaskPriority(taskDeadline)],
    "pretext": pretextFlag ? fallback : '',
    "title": taskTitle + '（' + taskTypeText[taskType] + '）',
    "title_link": taskURL,
    "text": "受付終了日時: " + deadLineText + "\n授業名: " + className 
  };

  if (pretextFlag) {
    pretextFlag = false;
  }

  return message;
}

// ●課題に関する内容
// 課題タイトル taskTitle
// 受付終了日時 taskDeadline
// タイプ: 小テスト・アンケート・レポート taskType
// 課題のURL taskURL

// ●授業
// 授業名 className

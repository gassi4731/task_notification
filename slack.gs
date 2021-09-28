var username = '課題リマインドBot';  // 通知時に表示されるユーザー名
var userId = PropertiesService.getScriptProperties().getProperty('SLACK_USER_ID'); // SlackのメンションするユーザーID
var icon = ':ninja:';  // 通知時に表示されるアイコン

function slackAction(tasks){
  var tasks = fixData(tasks);
  const attachments = slackFormatMessage(tasks);
  slackSendMessage(attachments);
  Logger.log('Success: Slack Action')
}

function slackFormatMessage(tasks) {
  const fallbackText = createFallback(tasks);

  var attachmentContents = [];
  tasks.forEach(function(value){
    attachmentContents.push(createField(fallbackText, value.title, value.deadline, value.type, value.url, value.className));
  });
  return attachmentContents;
}

function slackSendMessage(attachments) {
  var jsonData =
  {
    "username" : username,
    "icon_emoji": icon,
    "attachments": attachments
  };
  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL'), options);
  Logger.log('Success: Slack Action')
}

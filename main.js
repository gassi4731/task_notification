function mainTrelloAndSlack() {
	(async () => {
		const apiResults = await fixData(JSON.parse(getTasks()));

		// Trelloに追加
		trelloAction(apiResults.tasks);

		// Slackに送信
		slackAction(apiResults.tasks);
	})();
}

function mainTrelloOnly() {
	(async () => {
		const apiResults = await fixData(JSON.parse(getTasks()));

		// Trelloに追加
		trelloAction(apiResults.tasks);
	})();
}

function settingENV() {
	const scriptProperties = PropertiesService.getScriptProperties();
	scriptProperties.setProperties({
		SLACK_USER_ID: "",
		SLACK_WEBHOOK_URL: "",
		TRELLO_KEY: "",
		TRELLO_TOKEN: "",
		TRELLO_BOARD_ID: "",
		TRELLO_LIST_ID: "",
		MANABA_COMMON_API_URL: "",
	});
}

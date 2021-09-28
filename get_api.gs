function getTasks() {
	var options = { method: "get" };

	var res = UrlFetchApp.fetch(
		PropertiesService.getScriptProperties().getProperty(
			"MANABA_COMMON_API_URL"
		),
		options
	);
	if (res != null) {
		Logger.log("Success: Get Tasks");
		return res;
	} else {
		Logger.log("Error: Get Tasks");
		return { tasks: [] };
	}
}

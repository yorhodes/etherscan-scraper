var rp = require("request-promise-native");
var BN = require("bn.js");
var fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json"));
const urlConfig = config.urlEncoded;

var options = {
	uri: "https://api.etherscan.io/api",
	qs: {
		module: "account",
		action: "txlist",
		address: urlConfig.contractAddress,
		startblock: urlConfig.startBlock,
		endblock: urlConfig.endBlock
	}	
}

const parseConfig = config.desiredSums;

var sums = {};
parseConfig.forEach((key) => sums[key] = new BN(0, 10));

rp(options)
.then((response) => {
	// console.log(JSON.parse(response));
	json = JSON.parse(response);
	if (json.status == "1") {
		return json.result;
	} else {
		throw json.message;
	}
})
.then((blockList) => {
	blockList.forEach((block) => {
		parseConfig.forEach((key) => {
			sums[key] = sums[key].add(new BN(block[key], 10));
		});
	});
	parseConfig.forEach((key) => console.log(
		key+":", sums[key].toString(10)
	));
})
.catch(console.log);
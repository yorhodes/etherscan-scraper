# etherscan-scraper

## Setup:
```
npm install etherscan-scraper
```

## Config:

Edit config.json to suit your needs.
Strings within desiredSums array must be valid properties of JSON block objects.
```
{
	"urlEncoded": {
		"startBlock": 0,
		"endBlock": 0,
		"contractAddress": "0xabc123"	
	},
	"desiredSums": [
		"value",
		"gas"
	]
}
```

## Run:
```
node scrape.js
```



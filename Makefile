.DEFAULT_GOAL := help

.PHONY: clean
clean: ## Cleanup dist files
	@rm -rf dist

.PHONY: firefox
firefox: ## Prepare firefox sources
	@mkdir -p dist/firefox
	@cp saml-searchbox.js dist/firefox/saml-searchbox.js
	@cp manifest_v2.json dist/firefox/manifest.json

.PHONY: firefox-extension
firefox-extension: firefox ## Create firefox extension
	@zip -j -0 dist/saml-searchbox-firefox.zip dist/firefox/saml-searchbox.js dist/firefox/manifest.json

.PHONY: chrome
chrome: ## Prepare chrome sources
	@mkdir -p dist/chrome
	@cp saml-searchbox.js dist/chrome/saml-searchbox.js
	@cp manifest_v3.json dist/chrome/manifest.json

.PHONY: chrome-extension
chrome-extension: chrome ## Create chrome extension
	@zip -j -0 dist/saml-searchbox-chrome.zip dist/chrome/saml-searchbox.js dist/chrome/manifest.json

.PHONY: extensions
extensions: clean chrome-extension firefox-extension ## Create all extensions

.PHONY: help
help: ## Show this help message
	@grep -Eh '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

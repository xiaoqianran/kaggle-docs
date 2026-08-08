# Public API

### kagglehub & kaggle CLI

Kaggle offers two different ways to interact programmatically with Kaggle:

- [kaggle CLI](https://github.com/Kaggle/kaggle-cli): This is a command-line interface tool for interacting via commands in a terminal or shell script ([Documentation](https://github.com/Kaggle/kaggle-cli/blob/main/docs/README.md)).
- [kagglehub](https://github.com/Kaggle/kagglehub): This is a Python library designed to allow users to interact with Kaggle resources, primarily models, datasets & competitions. It's intended for seamless integration into **Python** ML workflows ([Documentation](https://github.com/Kaggle/kagglehub/blob/main/README.md)).

### Authentication

You can authenticate via an OAuth flow using `kaggle auth login` for the CLI. You can also create an API key from your [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api).

### Rate Limits

Kaggle uses dynamic rate limiting on both the public API and on calls made while using the kaggle.com website. If you encounter an HTTP 429 error code or a "Too many requests" error, we recommend the following steps:

- Pause and Retry: Often, the most effective solution is to simply wait a few minutes and try your request again later.
- Review Your Logic: It is worth a quick look at your code to ensure no unintended loops or redundant calls are being triggered. This is particularly helpful when making API calls in automated scripts, where a small logic error can inadvertently lead to a high volume of requests.
- Report Platform Issues: If you have investigated your code and believe a bug on the Kaggle site is causing a request to happen more frequently than it should, please report it in the [Product Feedback](https://www.kaggle.com/discussions/product-feedback) forum so we can investigate.
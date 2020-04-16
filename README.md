An serverless app to AWS Lambda.
This app are using AWS SNS Service to send SMS with notification message and Bitbucket CI Pipeline.

## Installation

This installation require only AWS Credentials configured in local machine to test app and Bitbucket Pipelines Repository Variables.

Each new push to master branch, will go start automatic deploy to AWS SNS.

OBS:
Don't forgot to add rules with SNS and Lambda permissions in credentials. 


## License
[MIT](https://choosealicense.com/licenses/mit/)
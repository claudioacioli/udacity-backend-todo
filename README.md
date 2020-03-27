# Udacity Claudio Acioli's Project
### Serverless TODO Backend

Here is only the backend side of aplication, for the frontend side please click [here](https://github.com/claudioacioli/udacity-frontend-todo)

### Install

First clone the project:

```bash
https://github.com/claudioacioli/udacity-backend-todo.git backend-todo
```

Then install the dependencies:

```bash
cp backend-todo
npm install
```

### Deploy

For deploy on AWS, install the [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/):

```bash
npm install -g serverless
```

Then run the deploy command:

```bash
cd backend-todo
serverless deploy -v
```

### Test on AWS

The url for this project on AWS is:

```
https://fchmg7sj8c.execute-api.us-east-1.amazonaws.com/dev
```

For test this app on AWS:

- Make sure you have [Postman](https://www.postman.com/downloads/canary) installed.
- If you don`t want clone the project, only download the [collection](https://github.com/claudioacioli/udacity-backend-todo/blob/master/Todo.postman_collection.json) file:

```bash
curl -o Todo.postman_collection.json https://raw.githubusercontent.com/claudioacioli/udacity-backend-todo/master/Todo.postman_collection.json
```

- [Import](https://kb.datamotion.com/?ht_kb=postman-instructions-for-exporting-and-importing) them on Postman
- Set [variables](https://learning.postman.com/docs/postman/variables-and-environments/variables/#defining-variables) on Postman:
```bash
{{apiId}} = fchmg7sj8c
{{authToken}} = eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UVXdRamN4TWpNeU5EYzFOelF4TWpKRE5UYzNSa0UwUlRZNU56UkZSRFpEUlRoRE9EaEJSQSJ9.eyJpc3MiOiJodHRwczovL3VkYWdyYW0tYWNpb2xpLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwOTQ1NTkzODAxNjQyNTY3ODQxMiIsImF1ZCI6InVMQlZzbU94MXJRSVQ0c21TY2pwYjNiNHdUZFZQZVFaIiwiaWF0IjoxNTg1MzA4NDY1LCJleHAiOjE1ODUzNDQ0NjUsImF0X2hhc2giOiI3eDE5WUlDbG5sUWFMazVITWlhQjJBIiwibm9uY2UiOiJzd2F6Y3ZFbE9jN0R3OEZTcXE1SWlzXy4wX1o3bzJqMiJ9.nk6oo-6VgiGx95yb93DtNlP_40PjB5qNN_CcEUs6od-uLddLzbwIEUmfz9RuF9WvoUH1omAeqp0fJoHEqQEW60qXTWfxC7dyP1QicYo0ClhHN7g2pjB0CZSZO6BYpGHrmImXLnOpwAEpjG81JygQk_-zNrt6IbTFNeSJZ7Qa6TNbdrGWZ4ano4AMQdZWZN0TaWv2PSq9cFGx89jBgnc08A6mjVmCiSh7-SIUj6A9ZPFMhyEvXe7tOhuz5u2VPmzeA3HECEGbqBuEWEQUiFS1sb_12yHvZHD5ELCXl0yDd2Dt3DQbhEko0lOCajRwteouqPH1ly9px9jrZ-gG2Pi8Rg
```

### Screenshot about tracing

<img src="https://raw.githubusercontent.com/claudioacioli/udacity-backend-todo/master/screenshots/Screenshot%20from%202020-03-27%2008-42-47.png">

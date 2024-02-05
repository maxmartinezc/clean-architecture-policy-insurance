# Clean Architecture Typescript

Welcome to the clean architecture project repository. 

### Install dependencies
```
npm install
```

### Start server
```
npm run start
````

### Test the API
```
curl  -X POST \
  'http://localhost:9001/policy' \
  --header 'Accept: */*' \
  --header 'User-Agent: Some User Agent' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "age": 40,
  "name": "Jhon Doe",
  "sedentary": false,
  "smoker": false,
  "startDate": "2026-12-31"
}'

```
You can get all articles related to this project in my blog: https://maxmartinez.dev
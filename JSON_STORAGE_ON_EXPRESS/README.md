##### Ось посилання на папку із цим завданням виконаним за допомогою koa. https://github.com/AlenaMushko/serverless-academy/tree/main/JSON_STORAGE 
#### Там робочі ендпоїнти auth, але виникла проблема із відправкою вмісту самого файла, так як його небуло.
##### Якщо на express є  Body: file.data, то на koa немає file.data. Тому переписала все.
### Буду дуже вдячна, якщо підкажете, як відправити не порожній файл, а із вмістом  коли використовуєш koa. 
#### @AlonaMyshko мій телеграм. Дякую!!!

### Для реєстрації   http://localhost:5001/auth/sign-up

### Для логанізації   http://localhost:5001/auth/sign-in

### Для відправки файла    http://localhost:5001/json-file/:userId

### Для отримання списку файлів які ти маєш в backet  http://localhost:5001/json-file/:userId/listFiles

### Для отримання файлe із backet по адресі   http://localhost:5001/json-file/:userId/listFiles/:filePath
### 
### копія мого .env, для перевірки.

### DB configs
#
DB_USER=user
DB_HOST=0.0.0.0
DB_NAME=rest-api
DB_PASSWORD=pass
DB_PORT=5432
#
### POSTGRES configs
#
POSTGRES_USER=user
POSTGRES_DB=rest-api
POSTGRES_PASSWORD=pass
POSTGRES_PORT=5432

#
### TOKEN configs
#
ACCESS_TOKEN_SECRET=jwtAccess
REFRESH_TOKEN_SECRET=jwtRefresh
ACCESS_TOKEN_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=
#
#
PORT=5001
#
### AWS_S3 configs
#
AWS_S3_BUCKET=taskjson
AWS_S3_REGION=eu-north-1
AWS_S3_ACCESS_KEY=AKIASQSSKNYN5QQKD5NR
AWS_S3_SECRET_ACCESS_KEY=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
AWS_S3_FILE_PATH=jsonFile
AWS_S3_UR=https://taskjson.s3.eu-north-1.amazonaws.com/

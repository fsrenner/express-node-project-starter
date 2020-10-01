# express-node-project-starter
The purpose of this repository is to provide a starter project for Node Express applications

### Setting up postgres db
```npm run sequelize -- init```

Change config.json to the following: 

``` json
{
  "development": {
    "username": "test",
    "password": "test",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

```npm run sequelize -- model:create --name User --attributes username:string,email:string,password:string,last_login:date```
```npm run sequelize -- db:migrate```

In postgres:

``` sql
insert into "Users" (
username, password, email, last_login, "createdAt", "updatedAt"
) values (
'admin', 'passwd', 'f.steve.renner@gmail.com', null, current_timestamp, current_timestamp
);
```
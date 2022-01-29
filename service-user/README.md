## service-user

example

login

```
$ curl -X POST localhost:5000/users/login \
   -H 'Content-Type: application/json' \
   -d '{"email":"web@gmail.com","password":"password"}'
```

will return

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "name": "web",
    "email": "web@gmail.com",
    "profession": "web developer",
    "role": "student",
    "avatar": null
  }
}
```

register

```
$ curl -X POST localhost:5000/users/register \
   -H 'Content-Type: application/json' \
   -d ' {
    "email": "web@gmail.com",
    "name": "alfaroqi",
    "password": "password",
    "profession": "web developer"
}
```

will return

```json
{
  "status": "success",
  "data": {
    "id": 4
  }
}
```

update

```
$ curl -X POST localhost:5000/users/3 \
   -H 'Content-Type: application/json' \
   -d ' {
    "email": "web@gmail.com",
    "name": "alfaroqi",
    "password": "password",
    "profession": "web developer"
}
```

will return

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "name": "web",
    "email": "web@gmail.com",
    "profession": "web developer"
  }
}
```

get user by id

```
$ curl -X GET localhost:5000/users/1
```

will return

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "name": "web",
    "profession": "web developer",
    "avatar": null,
    "role": "student",
    "email": "web@gmail.com",
    "createdAt": "2022-01-29T08:19:28.170Z",
    "updatedAt": "2022-01-29T14:14:38.409Z"
  }
}
```

## Built With

This is a project made with

- [Express](https://expressjs.com/)
- [Validator](https://www.npmjs.com/package/fastest-validator)
- [env](https://www.npmjs.com/package/dotenv)

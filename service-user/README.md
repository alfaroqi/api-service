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

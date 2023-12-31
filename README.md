# Бэкенд для проекта Movies Explorer

API для обеспечения работы проекта Movies Explorer

Ссылка на репозиторий: [https://github.com/Inc0re/movies-explorer-api](https://github.com/Inc0re/movies-explorer-api)

## **Описание**

Бэкенд для проекта Movies Explorer

[Ссылка на репозиторий фронтенда](https://github.com/Inc0re/react-mesto-auth)

API URL: [https://api.pandex.team](https://api.pandex.team)

## Стек

JS, Node.js, Express.js, MongoDB, Mongoose, Editorconfig, ESlint (airbnb-base), REST API

## Директории

`/routes` — папка с файлами роутов для пользователей и фильмов
`/controllers` — папка с файлами контроллеров пользователей и фильмов
`/models` — папка с файлами описания схем пользователя и фильма
`/utils` — папка для утилит (ошибки, валидаторы, константы)
`/middlewares` — миддлвары (проверка авторизации, прав админа, владельца фильма, обработчик ошибок и логгер)

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload
`npm run lint` — запускает линтер

## Эндпоинты

### Авторизация

* /signin POST — авторизует пользователя по почте и паролю, отправляет объект пользователя и сохраняет http only куки
* /signup POST — создает пользователя с полями `name`, `email`, `password` (пароль хранится в виде хэша)
* /logout GET — удаляет http only куки

### /users

Основные (требует авторизации):

* /me GET — получает текущего пользователя
* /me PATCH — обновляет поля `name`, `email` текущего пользователя

Администратор:

* / GET — получает список всех пользователей
* /:id GET — получает пользователя по `id`

### /movies

Основные:

* / GET — получает список всех фильмов сохраненных текущим пользователем
* / POST — создает фильм с полями `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `nameRU`, `nameEN`, `thumbnail`, `movieId`, `owner`
* /:movieId DELETE — удаляет фильм если текущий пользователь соответствует владельцу или является администратором

### Прочее

* /crash GET — запрос вызывает необработанную ошибку из-за чего сервер падает (нужно для проверки автоперезапуска приложения на сервере)

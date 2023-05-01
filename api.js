// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "prod"
export const baseHost = "https://webdev-hw-api.vercel.app"
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`

const forUserPosts = `${baseHost}/api/v1/${personalKey}/instapro/user-posts/}`
// Полуение всех постов c api

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      // console.log(response);
      if (response.status === 401) {
        throw new Error("Нет авторизации")
      }

      return response.json()
    })
    .then((data) => {
      //  console.log(data);
      return data.posts
    })
}

// получение постов конкретного юзера

export function getAllPostsUser({ token, id }) {
  // с index.js передаем сюда data, а дальше в апи запрос по конкретному айди что нам нужен, затем вызываем ф-ию в индекс и отрисовываем там что получили с апи
  console.log(id)
  return fetch(
    // проверить адрес---------------
    "https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/" +
      id.userId,
    // forUserPosts + `${data.userId}`, // выдает ошибку из за плюса...

    // baseHost + "/api/v1/prod/instapro/user-posts/" + id.userId,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  )
    .then((response) => {
      console.log({ id })
      console.log(response)
      return response.json()
    })
    .then((data) => {
      console.log(data.posts)
      return data.posts
    })
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
// Функция регистрации нового пользователя
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует")
    }
    return response.json()
  })
}

// Функция входа по логину и паролю
export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль")
    }
    return response.json()
  })
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData()
  data.append("file", file)

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json()
  })
}

export function addLike({ token, postID }) {
  return fetch(postsHost + `/${postID}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    console.log(response)
    return response.json()
  })
}

export function delLike({ token, postID }) {
  return fetch(postsHost + `/${postID}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json()
  })
}

export function sendRequestToApi({ description, imageUrl, token }) {
  console.log({ description, imageUrl, token })
  return fetch(postsHost, {
    method: "POST",
    body: JSON.stringify({
      description,
      imageUrl,
    }),
    headers: {
      Authorization: token,
    },
  })
}

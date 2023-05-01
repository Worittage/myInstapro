
const personalKey = "olya-jacobs";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token, id = "" }) {
  return fetch(id ? (postsHost + "/user-posts/" +id) : postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

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
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      alert("Неверный логин или пароль!");   
      throw new Error("Неверный логин или пароль");
 }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}


export function uploadPost({ token, description, imageUrl }) {
  // Запись нового поста
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 401) {
      console.log("Ошибка авторизации");
      throw new Error("Нет авторизации");
    } else {
      console.log("Прочие ошибки");
      throw new Error("Прочие ошибки записи поста");
    }
  });
}

// удалить пост

export function deletePost({ token, id }) {
  return fetch(postsHost + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 200) {
      // Успешное удаление записи
      return response.json();
    }
    else if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
    else {
        alert(`Ошибка при удалении ID: ${id}`);
        throw new Error('Вы не можете удалить чужой пост');
      }
    })

   
}


export function changeLike({ token, id = "",isLike }) {
  //Ставим-снимаем лайк
  const a=postsHost + "/" +id+ (isLike? "/dislike" : "/like");
  return fetch(postsHost + "/"+ id+ (isLike? "/dislike" : "/like"), {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.post;
    });
}
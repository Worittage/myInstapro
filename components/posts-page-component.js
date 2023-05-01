import { USER_POSTS_PAGE, CHANGE_LIKE_PAGE, DELETE_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, getId } from "../index.js";
import { formatDistanceToNow } from "date-fns"

export function renderPostsPageComponent({ appEl }) {

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">`+
posts.map((post, id) => {
return ` <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <div class="post-header-user"><img src=${post.user.imageUrl} class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div>
            <svg class="trash-button" data-delete-id="${post.id}" data-user-delete-id="${post.user.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
            </div>
        </div>
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/${(post.isLiked ? "like-active.svg" : "like-not-active.svg")}">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>
            ${post.likes.length === 0 ? 0 : post.likes[post.likes.length - 1].name + ((post.likes.length > 1) ? " и еще " + (post.likes.length - 1) : "")}
             
            </strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        ${formatDistanceToNow(new Date(post.createdAt))} <span>ago</span>
        </p>
      </li>`
})
.join(" ") + `             
    </ul>
  </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  for (let likeEl of document.querySelectorAll(".like-button")) {
  
    likeEl.addEventListener("click", () => {
      if (!getToken()) {
      alert("Лайкать посты могут только авторизованные пользователи!");
      return;
      }
        goToPage(CHANGE_LIKE_PAGE, {
        postId: likeEl.dataset.postId,
      });
    });
  }

// Обработка клика по кнопке удалить пост

for (let deleteEl of document.querySelectorAll(".trash-button")) {
  deleteEl.addEventListener("click", (event) => {

    event.stopPropagation();
    if (!getToken()) {
    alert("Удалять посты могут только авторизованные пользователи!");
    return;
    }
 
   if (getId() !== deleteEl.dataset.userDeleteId) {
     alert ("Вы можете удалять только свои посты");
     return;
   }

    else {
      goToPage(DELETE_PAGE, {
      postId: deleteEl.dataset.deleteId,
    })
  }
  });
}

}




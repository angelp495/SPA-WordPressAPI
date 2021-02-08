import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let { hash } = location;

  /* Limpiar POSTS */
  $main.innerHTML = null;
  /* Seleccion del menu */
  //console.log(hash);
  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        //console.log(api.POST);
        //console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        //d.querySelector(".loader").style.display = `none`;
        d.getElementById("main").innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      d.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (results) => {
        //console.log(search);
        let html = "";

        if (results.length === 0) {
          html = `
          <p class="error">
            No existen resultados de busqueda para el termino <mark>${query}</mark>
          </p>
          `;
        } else {
          results.forEach((post) => (html += SearchCard(post)));
        }

        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.innerHTML = `<h2>Seccion de Contacto</h2>`;
    //d.querySelector(".loader").style.display = `none`;
  } else {
    //d.getElementById("posts");
    $main.innerHTML = `<h2>Aqui cargara el contenido de el Post previamente seleccionado</h2>`;

    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        //console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.display = `none`;
}

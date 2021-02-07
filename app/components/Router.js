import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";

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
    $main.innerHTML = `<h2>Seccion de Busqueda</h2>`;
    //d.querySelector(".loader").style.display = `none`;
  } else if (hash === "#/contacto") {
    $main.innerHTML = `<h2>Seccion de Contacto</h2>`;
    //d.querySelector(".loader").style.display = `none`;
  } else {
    //d.getElementById("posts");
    $main.innerHTML = `<h2>Aqui cargara el contenido de el Post previamente seleccionado</h2>`;

    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.display = `none`;
}

export function SearchForm() {
  const d = document,
    $form = document.createElement("form"),
    $input = document.createElement("input");

  $form.classList.add("form-search");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";

  $form.appendChild($input);

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;
    e.preventDefault();
    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;
  });

  return $form;
}

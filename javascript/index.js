const title = document.querySelector("#title");

function handleClick(event) {
    title.style.color = "yellow";
}

title.addEventListener("click", handleClick);
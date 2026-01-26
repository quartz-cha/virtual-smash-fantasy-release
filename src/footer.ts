const totopBtn = document.querySelector("#to_top_btn") as HTMLElement;
console.log("footer");
totopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
})
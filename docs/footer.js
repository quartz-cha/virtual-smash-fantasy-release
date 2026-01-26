/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/footer.ts ***!
  \***********************/
var totopBtn = document.querySelector("#to_top_btn");
console.log("footer");
totopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
/******/ })()
;
//# sourceMappingURL=footer.js.map
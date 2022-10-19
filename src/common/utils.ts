export const scrollToTop = () => {};

export const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    const tabBar = document.getElementById("nav").offsetHeight;
    let anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      window.scrollTo({
        top: anchorElement.offsetTop - tabBar,
        behavior: "smooth",
      });
    }
  }
};

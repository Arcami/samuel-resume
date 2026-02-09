function fitText() {
  const buttons = document.querySelectorAll(".service-card");

  buttons.forEach((button) => {
    const span = button.querySelector(".fit-text");
    if (!span) return;

    const maxFontSize = 18;

    const minFontSize = 4;

    const styles = window.getComputedStyle(button);
    const paddingTotal =
      parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const availableHeight = button.offsetHeight - paddingTotal;

    let fontSize = maxFontSize;
    span.style.fontSize = `${fontSize}px`;

    while (span.scrollHeight > availableHeight && fontSize > minFontSize) {
      fontSize -= 0.5;
      span.style.fontSize = `${fontSize}px`;
    }
  });
}

document.addEventListener("DOMContentLoaded", fitText);

if (document.fonts) {
  document.fonts.ready.then(fitText);
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(fitText, 100);
});

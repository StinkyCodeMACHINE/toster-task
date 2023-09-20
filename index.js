const mainImageContainer = document.querySelector(
  ".product-options__main-image-container"
);
const images = Array.from(mainImageContainer.children);
const previewImagesContainer = document.querySelector(
  ".product-options__preview-images-container"
);
const previewImages = Array.from(previewImagesContainer.children);
const timerEl = document.querySelector(".product-info__timer");
const oldPriceElem = document.querySelector(".product-info__old-price");
const newPriceElem = document.querySelector(".product-info__new-price");

//таймер
let timeLeft = 17476;
const timerId = setInterval(() => {
  if (timeLeft === 0) {
    clearInterval(timerId);
  }

  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = Math.floor((timeLeft % 3600) % 60);
  timerEl.innerText = `${hoursLeft < 10 ? "0" : ""}${hoursLeft}:${
    minutesLeft < 10 ? "0" : ""
  }${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  timeLeft -= 1;
}, 1000);

//редактирование цен
let oldPrice = 250;
let newPrice = 160;
oldPriceElem.innerText = (Math.round(oldPrice * 100) / 100).toFixed(2);
newPriceElem.innerText = (Math.round(newPrice * 100) / 100).toFixed(2);

//щёлкание по превью
previewImagesContainer.addEventListener("click", (e) => {
  const targetPreview = e.target.closest(
    ".product-options__preview-image-container"
  );

  if (targetPreview) {
    const targetPreviewIndex = previewImages.indexOf(targetPreview);
    const currentImage = mainImageContainer.querySelector(".current-image");
    const targetImage = images[targetPreviewIndex];

    const imageWidth = images[0].getBoundingClientRect().width;
    const targetImageIndex = images.indexOf(targetImage);
    mainImageContainer.style.transform = `translateX(${
      -imageWidth * targetImageIndex
    }px)`;
    currentImage.classList.toggle("current-image");
    targetImage.classList.toggle("current-image"); //
    const activePreview = previewImagesContainer.querySelector(".preview-selected");
    activePreview.classList.remove("preview-selected");

    previewImages[targetImageIndex].classList.add("preview-selected");
  }
});

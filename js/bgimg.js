function fnChgBgImg(imgList) {
  const chooseImage = imgList[Math.floor(Math.random() * imgList.length)];

  const bgImageSrc = `img/${chooseImage}`;
  document.body.style.background = `#fff url(${bgImageSrc}) no-repeat left top`;
  document.body.style.backgroundSize = "cover";
}
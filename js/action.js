document.addEventListener("DOMContentLoaded", function() {
  // 배경이미지 변경
  const bgImageArr = ["0.jpeg", "1.jpeg", "2.jpeg"];
  fnChgBgImg(bgImageArr);

  // 시간 표시
  getClock();
  setInterval(getClock, 1000);

  //날씨 표시
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  // 로그인 체크
  const lsMemberInfoArr = localStorage.getItem(LOGININFO_KEY);
  loginInfoObj = JSON.parse(lsMemberInfoArr);
  setLoginInfo();

  // 로그인
  const formLogin = this.getElementById("form-login");
  formLogin.addEventListener("submit", onLoginFormSubmit);

  // 로그아웃
  const btnLogout = this.querySelector(".btn-logout");
  btnLogout.addEventListener("click", onLogout);

  // ToDo 리스트 호출
  
});
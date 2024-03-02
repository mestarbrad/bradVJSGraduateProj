function getClock() {
  const arrWeekOfDay = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, 0);
  const week = date.getDay();
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  const nowClock = `${year}-${month}-${day}(${arrWeekOfDay[week]}) ${hour}:${min}:${sec}`;

  const clockWrap = document.querySelector(".clock-wrap");
  clockWrap.innerText = nowClock;
}
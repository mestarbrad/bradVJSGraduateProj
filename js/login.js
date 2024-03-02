function setLoginInfo() {
  const loginForm = document.querySelector(".login-form");
  const loginTitle = document.querySelector(".login-title");
  const todolistWrap = document.querySelector(".todolist-wrap");

  if(loginInfoObj !== null) {
    loginForm.classList.add("hidden");
    loginTitle.classList.remove("hidden");
    todolistWrap.classList.remove("hidden");

    getLoginTitle();
  } else {
    loginForm.classList.remove("hidden");
    loginTitle.classList.add("hidden");
    todolistWrap.classList.add("hidden");
  }
}

function getLoginTitle() {
  const spanLoginInfo = document.querySelector("span.login-info");
  spanLoginInfo.innerText = `반갑습니다. ${loginInfoObj[USER_LOGINID]}님`;
}

function onLoginFormSubmit(event) {
  event.preventDefault();
  
  const loginId = document.getElementById("login-id").value;
  const loginPw = document.getElementById("login-pw").value;

  const lsMemberInfoArr = localStorage.getItem(MEMBERINFO_KEY);
  let memberInfo = {};
  let userInfo = {};
  if(lsMemberInfoArr === null) {
    // 멤버 리스트가 null일 경우 최초 등록
    userInfo[USER_ID] = "m" + String(Date.now());
    userInfo[USER_LOGINID] = loginId;
    loginInfoObj = userInfo;
    localStorage.setItem(LOGININFO_KEY, JSON.stringify(loginInfoObj));

    memberInfo[MEMBER_ID] = userInfo[USER_ID];
    memberInfo[MEMBER_LID] = userInfo[USER_LOGINID];
    memberInfo[MEMBER_LPW] = loginPw;
    memberInfoObj.push(memberInfo);
    localStorage.setItem(MEMBERINFO_KEY, JSON.stringify(memberInfoObj));
  } else {
    // 멤버 리스트가 있을 경우 회원정보 비교 후 로그인 정보가 일치하는 항목이 있으면 재로그인 없다면 멤버 리스트에 저장 후 로그인

    memberInfoObj = JSON.parse(lsMemberInfoArr);
    let checkedMember = false;
    if(memberInfoObj !== null) {
      memberInfoObj.forEach(item => {
        if(String(item.m_loginid) === String(loginId) && String(item.m_loginpw) === String(loginPw)) {
          userInfo[USER_ID] = item.m_id;
          userInfo[USER_LOGINID] = item.m_loginid;
          checkedMember = true;
        }
      });
    }

    if(checkedMember) {
      // 기존 멤버일 경우 멤버 테이블에는 저장하지 않고 로그인만 한다.
      loginInfoObj = userInfo;
      localStorage.setItem(LOGININFO_KEY, JSON.stringify(loginInfoObj));
    } else {
      // 기존 멤버에 정보가 없을 경우 멤버 정보에 저장 후 로그인 정보를 남긴다.      
      userInfo[USER_ID] = "m" + String(Date.now());
      userInfo[USER_LOGINID] = loginId;
      localStorage.setItem(LOGININFO_KEY, JSON.stringify(userInfo));

      memberInfo[MEMBER_ID] = userInfo[USER_ID];
      memberInfo[MEMBER_LID] = userInfo[USER_LOGINID];
      memberInfo[MEMBER_LPW] = loginPw;

      memberInfoObj.push(memberInfo);
      localStorage.setItem(MEMBERINFO_KEY, JSON.stringify(memberInfoObj));
    }
  }

  setLoginInfo();
}

function onLogout() {
  localStorage.removeItem(LOGININFO_KEY);
  loginInfoObj = null;
  const loginId = document.getElementById("login-id");
  const loginPw = document.getElementById("login-pw");

  loginId.value = "";
  loginPw.value = "";

  setLoginInfo();
}
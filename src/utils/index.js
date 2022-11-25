export function isMobile() {
  var u = navigator.userAgent;
  var ua = navigator.userAgent.toLowerCase();

  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    return true;
  }
  if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
    return true;
  }
  //当前页面在微信中打开
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }

  return false;
}

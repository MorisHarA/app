/**
 * 得到Url参数值
 * @param name
 * @returns {*}
 */
export const getQueryString = (name, url) => {
  const reg = new RegExp(`(^|&|\\?)${name}=([^&]*)(&|$)`, 'i');
  let r = url || window.location.search;
  r = r.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/**
 * 得到URL所有参数对象
 * @param url
 * @returns {object}
 */
export const getAllQueryParams = (url) => {
  try {
    const result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g'));
    if (result == null) {
      return {};
    }
    const queryList = {};
    for (let i = 0; i < result.length; i++) {
      const item = result[i].substring(1);
      const keyVal = item.split('=');
      queryList[keyVal[0]] = keyVal[1];
    }
    return queryList;
  } catch (e) {
    return {};
  }
};

/**
 * 去除URL里面的参数
 * @param inputUrl
 * @param splitKeyList
 * @returns {string}
 */
export const getHrefWithSplitKey = (inputUrl, splitKeyList) => {
  let sHref = inputUrl;
  const sharpValue = sHref.split('#')[1];
  sHref = sHref.split('#')[0];
  let args = sHref.split('?');
  let baseUrl = `${args[0]}?`;
  let str = args[1];
  let isFirstParam = true;
  if (str) {
    args = str.split('&');
  } else {
    args = [];
  }
  for (let i = 0; i < args.length; i++) {
    str = args[i];
    const arg = str.split('=');
    // 属性参数没有负值
    if (arg.length <= 1) continue;
    // 检查是否为需要切除的属性参数
    if (splitKeyList && splitKeyList.indexOf(arg[0]) != -1) {
      continue;
    }
    if (isFirstParam) {
      baseUrl = `${baseUrl + arg[0]}=${arg[1]}`;
      isFirstParam = false;
    } else {
      baseUrl = `${baseUrl}&${arg[0]}=${arg[1]}`;
    }
  }
  if (sharpValue) {
    baseUrl = `${baseUrl}#${sharpValue}`;
  }
  return baseUrl;
};

import moment from 'moment';
import Message from 'iview/src/components/message';
import convertpinyin from './convertpinyin';

const oneDay = 24 * 60 * 60 * 1000;

// 当月30
const oneMonth = (time) => {
  let count = 30;

  if (time) {
    const curDate = new Date(time);
    const curMonth = curDate.getMonth() + 1;

    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    count = curDate.getDate();
  }
  return count * oneDay;
};

const string2timestamp = timestring => moment(timestring).unix() * 1000;

const isToDay = (date) => {
  const now = new Date();
  const datetime = new Date(date);

  return now.getDate() === datetime.getDate();
};

const nowDateFormat = date => moment(date).format('YYYY-MM-DD');

/*
 * 今天
 *
 * */
const todayInterval = (type = 'timestamp') => {
  const starttime = moment().unix() * 1000;
  const endtime = moment().unix() * 1000 + oneDay - 1;

  return type === 'timestamp' ? {
    starttime,
    endtime,
  } :
    type === 'string' && {
      starttime: moment(starttime).format('YYYY-MM-DD'),
      endtime: moment(starttime).format('YYYY-MM-DD'),
    };
};

const getMonthLast = (endtime) => {
  const date = new Date(endtime);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return +new Date(year, month, 0) + oneDay - 1;
};

const formatNumber = (n) => {
  n = n.toString();
  return n == '/' ? '-' : n[1] ? n : `0${n}`;
};

/*
 * @param {String} '2017-04-18T10:40:13.738587413+08:00'
 * @return {String} 'MM月 DD日 HH:MM 分'
 * */
const formatTime = (date, type = 0) => {
  date = new Date(date);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  const week = date.getDay();

  month = formatNumber(month);
  day = formatNumber(day);
  hour = formatNumber(hour);
  minute = formatNumber(minute);

  return type === 0 ? `${month}月 ${day}日 ${hour}:${minute} 分` :
    type === 1 ? `${year}-${month}-${day}` :
    type === 2 ? `${formatWeekName(week)} ${month}-${day}` :
    type === 3 ? `${hour}:${minute}` :
    type === 4 ? {
      month,
      week: formatWeek(week),
      day,
    } :
    type === 5 ? `${hour}:${minute}` :
    type === 6 ? `${year}-${month}-${day} ${hour}:${minute}` :
    type === 7 && `${isToDay(date) ? '今日 ' : ''}${month} 月 ${day} 日`;
};

/*
 * @ time interval   **** 具体查询时间  用于请求服务器数据时的参数
 * @ params { starttime,endtime }
 * @ return object { starttime,endtime,type } --> type: hour : 1-3days , day : 3-90days , month : 90-&days
 * @ result:ISO string
 * */
const getDateInterval = (starttime, endtime) => {
  let groupby;
  const type = timeString2dateType(starttime, endtime);

  if (type > 0) {
    if (!starttime) {
      // starttime
    } else if (type === 8 || starttime.length === 4 || !endtime) {
      starttime = `${getYear(starttime)}-01-01`;
      endtime = moment(`${getYear(starttime) + 1}-01-01`).unix() * 1000 + oneDay - 1;
      groupby = 'month';
    } else if (type < 4) {
      starttime = moment(starttime).unix() * 1000;
      endtime = moment(endtime).unix() * 1000 + oneDay - 1;
      groupby = 'hour';
    } else if (type < 8) {
      starttime = moment(starttime).unix() * 1000;
      endtime = endtime.length === 7 ? getMonthLast(endtime) : (moment(endtime).unix() * 1000 + oneDay - 1);
      groupby = 'day';
    }
  }

  return {
    starttime: getISOString(starttime),
    endtime: getISOString(endtime),
    groupby,
  };

  function getYear(time) {
    return new Date(time).getFullYear();
  }
};

const getISOString = time => moment(time).format();

const localeDate2String = timestring => timestring.replace(/\d+|\//g, d => formatNumber(d));

/*
 * @ time interval to date type
 * @ params type: 1 today 2 yesterday 3近三天 4近七天 5近一个月 6日 7月 8年
 * @ return number|type
 * */
const timeString2dateType = (starttime, endtime) => {
  let start,
    end;
  if (!starttime && !endtime) return 1;

  if (!starttime || !endtime) {
    start = starttime ? new Date(starttime) : new Date();
    end = endtime ? new Date(endtime) : new Date();
  } else {
    start = new Date(starttime);
    end = new Date(endtime);
  }

  const startString = moment(start).format('YYYY-MM-DD');
  const endString = moment(end).format('YYYY-MM-DD');

  const now = new Date();
  const yesterday = +now - (oneDay - 1);

  const startstamp = start.getTime();

  const endstamp = starttime.length === 10 ?
    end.getTime() :
    starttime.length === 7 ?
    end.getTime() + oneDay * 30 :
    starttime.length === 4 ? end.getTime() + oneDay * 30 * 12 : moment(end).unix() * 1000;
  const diff = endstamp - startstamp;
  if (diff < 0) return 0;

  if (diff <= oneDay * 31) {
    // 今天 | 昨天
    if (diff == 0 && (formatTime(startString, 1) == formatTime(now, 1))) {
      return 1;
    } else if (diff == 0 && (formatTime(startString, 1) == formatTime(yesterday, 1))) {
      return 2;
    }
    // 近三天
    else if (diff < oneDay * 3) {
      return 3;
    }
    // 近七天
    else if (diff < oneDay * 7 && diff > oneDay * 5) {
      return 4;
    }
    // 近一月
    else if (diff < oneDay * 31 && diff > oneDay * 28) {
      return 5;
    }
    // 日

    return 6;
  }
  // 月
  if (diff > oneDay * 31 && diff <= (oneDay * (30 * 3 + 2))) {
    return 7;
  }
  // 年

  return 8;
};

const getLocaleDateString = (type) => {
  let {
    starttime,
    endtime,
  } = todayInterval('string');

  if (type === 2) {
    starttime = moment(moment(starttime).unix() * 1000 - oneDay + 1).format('YYYY-MM-DD');
    endtime = starttime;
  }

  if (type === 4) {
    starttime = moment(moment(starttime).unix() * 1000 - oneDay * 6 + 1).format('YYYY-MM-DD');
  }

  if (type === 5) {
    starttime = moment(moment(starttime).unix() * 1000 - oneDay * 30 + 1).format('YYYY-MM-DD');
  }
  return {
    starttime,
    endtime,
  };
};

const initDataNoRepeat = (a, b) => {
  for (const source in a) {
    if (source === 'starttime' || source === 'endtime') {
      a[source] = b[source];
    }
    if ((a[source]).toString() && b[source]) {
      a[source] = b[source];
    }
  }
  return a;
};
/*
 * params (Object,Object)
 */
const paramsMixin = (filters, params) => {
  // console.log(params)

  let result = {},
    criteria = [],
    points = [];
  const {
    starttime,
    endtime,
    limit,
    start,
  } = filters;

  const date = getDateInterval(starttime, endtime);

  for (const temp in filters) {
    if (temp === 'area' || temp === 'divisions' || temp === 'regions' || temp === 'review' || temp === 'level') {
      // console.log(temp)
      if (filters[temp] != -1 && params[temp] && params[temp].list.length > 0) {
        const data = params[temp].list.filter((t, index) => {
          if (temp === 'regions') {
            return index == filters[temp];
          }
          return t.id == filters[temp];
        });
        if (data.length > 0 && (
            temp === 'area' || temp === 'divisions' || temp === 'regions' || temp === 'review'
          )) {
          // console.log(temp)
          result[
            temp === 'area' ? 'class' :
            temp === 'divisions' ? 'division' :
            temp === 'review' ? 'disposed' :
            temp === 'regions' && 'region'
          ] = data[0][
            temp === 'area' ? 'class' :
            temp === 'divisions' ? 'id' :
            temp === 'review' ? 'value' : 'name'
          ];
        }

        if (data.length > 0 && temp === 'level') {
          points.push({
            name: 'general',
            range: data[0].range,
          });
          result = {
            ...result,
            points,
          };
        }
      }
    }
  }

  // console.log(result)
  if (!isEmptyObject(result)) {
    criteria.push(result);
  }

  let factor = {
    ...date,
    criteria,
  };

  if (limit) {
    factor = {
      ...factor,
      limit: Number(limit),
      start: Number(start || 0),
    };
  }

  return factor;
};

const diggingOutResult = data => JSON.parse(
  JSON.stringify(data),
);

const isEmptyObject = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const cutDataToGetPartCount = (len, groupby) => {
  if (groupby === 'month') {
    return {
      copies: 12,
      dividend: 1,
    };
  } else if (groupby === 'hour') {
    return {
      copies: 12,
      dividend: Math.floor(len / 12),
    };
  }
  if (len < 13) {
    return {
      copies: len,
      dividend: 1,
    };
  } else if (len <= 31) {
    return {
      copies: Math.ceil(len / 2),
      dividend: 2,
    };
  }
  const dividend = len.toString().charAt(0);
  return {
    copies: Math.ceil(len / dividend),
    dividend: Number(dividend),
  };
};

const formatRenderStatData = (data, {
  starttime,
  endtime,
}) => {
  if (data.length < 0 || data.length < 13) return data;
  const {
    groupby,
  } = getDateInterval(starttime, endtime);
  const {
    copies,
    dividend,
  } = cutDataToGetPartCount(data.length, groupby);
  const result = [];

  for (let i = 0; i < copies; i++) {
    const start = 0 + i * dividend;
    const end = dividend + i * dividend;
    const temp = data.slice(start, end);
    const adds = temp[0];

    temp.map((val, index) => {
      if (index > 0 && val) {
        for (const ele in adds) {
          if (ele === 'dispose') {
            for (const disEle in adds.dispose) {
              adds.dispose[disEle] += val.dispose[disEle];
            }
          } else if (ele === 'points') {
            adds.points.map((point, indexP) => {
              val.points.map((pointV, indexV) => {
                if (point.name === pointV.name) {
                  for (const pointEle in point) {
                    if (pointEle === 'scores') {
                      if (point.scores.length > 0) {
                        point.scores.map((score, indexS) => {
                          if (pointV.scores.length > 0) {
                            pointV.scores.map((scoreT, indexT) => {
                              const unique = point.scores.filter(un => un.score === scoreT.score);
                              if (unique.length > 0) {
                                if (score.score === scoreT.score) {
                                  if (adds.points[indexP].scores[indexS]) {
                                    adds.points[indexP].scores[indexS].count += scoreT.count;
                                  }
                                }
                              } else {
                                adds.points[indexP].scores.push(scoreT);
                              }
                            });
                          }
                        });
                      } else if (point.name === pointV.name) {
                        adds.points[indexP].scores = pointV.scores;
                      }
                    } else if (pointEle === 'sum_score') {
                      adds.points[indexP].sum_score += pointV.sum_score;
                    }
                  }
                }
              });
            });
          } else if (ele === 'bad_count' || ele === 'count' || ele === 'good_count') {
            adds[ele] += val[ele];
          }
        }
      }
    });
    result.push(adds);
  }
  return result;
};

const countToFixed = (count) => {
  if (count < 10000) {
    return count;
  }
  return `${(count / 10000).toFixed(2)}万`;
};

const mathToRate = (num1, num2, fixed = 1) => {
  if (num1 == 0 || num2 == 0) return 0;
  return ((num1 / num2) * 100).toFixed(fixed);
};

const ie = () => {
  const ua = window.navigator.userAgent;
  if (ua.indexOf('MSIE') >= 0 || ua.indexOf('Edge') >= 0 || (ua.indexOf('Trident') > -1 && ua.indexOf('rv:11.0') > -1)) {
    return true;
  }
  return false;
};

const downloadFile = (name, data) => {
  const isIE = testBrowserIsIE();
  const urlObject = window.URL || window.webkitURL || window;
  const blob = new Blob(
    [data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
    },
  );

  if (isIE) {
    isIEExport(blob, name);
  } else {
    notIEExport(blob, name);
  }
};

const isIEExport = (blob, name) => {
  if (typeof window.navigator !== 'undefined' && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    Message.warning('导出功能仅支持IE10+');
  }
};

const notIEExport = (blob, name) => {
  const saveLink = document.createElement('a');
  saveLink.href = URL.createObjectURL(blob);
  saveLink.download = name;

  const ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  saveLink.dispatchEvent(ev);
};

const getNameByRouteName = (name) => {
  switch (name) {
    case 'questionnairedetail':
      name = '问卷详情';
      break;
    case 'questionnairestat':
      name = '问卷统计';
      break;
    case 'commentstat':
      name = '评论统计';
      break;
    case 'commentdetail':
      name = '评论详情';
      break;
    default:
      name = name;
  }

  return `${name}.xlsx`;
};

const testBrowserIsIE = () => {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  }
  return false;
};

const setStorage = (key, value) => {
  if (localStorage && key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getStorage = (key) => {
  if (localStorage && key) {
    const local = localStorage.getItem(key);
    return local ? JSON.parse(localStorage.getItem(key)) : local;
  } return false;
};

const fuzzyMatching = (value, kw) => {
  let status = false;
  const wordReg = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
  const letterReg = /[a-z]|[A-Z]/;
  const words = kw.match(wordReg);
  const letters = kw.match(letterReg);
  if (!value) {
    status = false;
  } else if (words && words.length > 0) {
    status = words.filter(w => value.indexOf(w) !== -1).length > 0;
  } else if (letters && letters.length > 0) {
    status = convertpinyin(value || '', '')[0] === letters[0];
  }

  return status;
};

const chooseLevel = (name) => {
  let word = '';
  switch (name) {
    case 'commentstat':
      word = '评论统计';
      break;
    case 'questionnairestat':
      word = '问卷统计';
      break;
    case 'commentdetail':
      word = '评论详情';
      break;
    case 'questionnairedetail':
      word = '问卷详情';
      break;
    case 'authority':
      word = '权限管理';
      break;
    case 'replytemplate':
      word = '回复模板';
      break;
    default:
      word = '评论统计';
  }
  return word;
};

const authMap = {
  'spirit-commentstat': 'commentstat',
  'spirit-commentdetail': 'commentdetail',
  'spirit-questionnairedetail': 'questionnairedetail',
  'spirit-questionnairestat': 'questionnairestat',
  'spirit-hospitaldetail': 'hospitaldetail',
  'spirit-replytemplate': 'replytemplate',
  'spirit-authority': 'authority',
};

const searchAuthMapByLocalKey = key => Object.keys(authMap).find(k => authMap[k] === key);


export default {
  string2timestamp,
  formatTime,
  todayInterval,
  getDateInterval,
  timeString2dateType,
  getLocaleDateString,
  initDataNoRepeat,
  isToDay,
  paramsMixin,
  diggingOutResult,
  formatRenderStatData,
  countToFixed,
  mathToRate,
  downloadFile,
  getNameByRouteName,
  setStorage,
  getStorage,
  fuzzyMatching,
  chooseLevel,
  authMap,
  searchAuthMapByLocalKey,
};

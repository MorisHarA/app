/* global _ */

import gql from 'graphql-tag';
import axios from 'axios';
import * as Mock from './mock';
import { client } from './axios';

// console.log(client);

const debug = process.env.NODE_ENV === 'development' && false;

const delay = (task, ms = 100) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(task);
  }, ms);
});

/*
 * 获取医院详情
 * @param {number}
 * @return {promise}
 * */
export const fetchHospitalDetail = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}`);

/*
 * 获取科室列表
 * @param {number}
 * @return {promise}
 * */
export const fetchDivitionList = ({
  hospitalId,
  start = 0,
  limit = 1000000,
}) => axios.get(`/wise/rest/v1/hospital/${hospitalId}/divisions`, {
  params: {
    start,
    limit,
  },
});

/*
 * 获取科室总数
 * @param {number}
 * @return {promise}
 * */
export const fetchDivitionCount = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}/divisions/count`);

/*
 * 获取病区列表
 * @param {number}
 * @return {promise}
 * */
export const fetchRegionList = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}/regions`);

/*
 * 获取医院评论总数
 * @param {object}
 * @return {promise}
 * */
export const fetchCommentsCount = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}/comments/count`);

/*
 * 获取医院评论列表
 * @param {object}
 * @return {promise}
 * */
export const fetchCommentList = ({
  hospitalId,
  ...params
}) => axios({
  method: 'post',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/comments_query`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: params,
});

/*
 * 获取医院评论回复模板列表
 * @param {object}
 * @return {promise}
 * */
export const fetchCommentTemplateList = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}/comment/reply_templates`, {
  params: {
    sort: '-createtime',
  },
});

/*
 * 获取咨询室详情
 * @param {number}
 * @return {promise}
 * */
export const fetchconsulting_roomInfo = hospitalId => axios.get(`/wise/rest/v1/consulting_room/${hospitalId}`);

/*
 * 获取病床详情
 * @param {number}
 * @return {promise}
 * */
export const fetchsickbedInfo = hospitalId => axios.get(`/wise/rest/v1/sickbed/${hospitalId}`);

/*
 * 获取公共设施详情
 * @param {number}
 * @return {promise}
 * */
export const fetchfacilityInfo = hospitalId => axios.get(`/wise/rest/v1/facility/${hospitalId}`);

/*
 * 获取窗口信息
 * @param {number}
 * @return {promise}
 * */
export const fetchwicketInfo = hospitalId => axios.get(`/wise/rest/v1/wicket/${hospitalId}`);

/*
 * 获取评论统计信息
 * @param {number}
 * @return {promise}
 * */
export const fetchCommentStatistics = ({
  hospitalId,
  ...params
}) => axios({
  method: 'post',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/statistics/spirit_comment`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: params,
});

/*
 * 提交评论回复
 * @param {number}
 * @return {promise}
 * */
export const submitCommentReply = ({
  id,
  release,
}) => axios({
  method: 'put',
  url: `/wise/rest/v1/comment/${id}`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: release,
});


/*
 * 登录验证
 * @params {string} 用户名
 * @params {string} 密码
 * @return {promise}
 * */
export const login = data => axios.post('/wise/rest/v1/token', data);


/*
 * 修改用户密码
 * @params {string} 新密码
 * @params {string} 旧密码
 * @return {promise}
 * */
export const modifyPassword = (data, user) => axios.post(`/wise/rest/v1/user/${user}/password_modification`, data);


/*
 * 获取用户的信息
 * @params {string} 用户id
 * @return {promise}
 * */
export const fetchUserInfo = id => axios.get(`/wise/rest/v1/user/${id}`);


/*
 * 获取问卷统计
 * @params {object} 医院id，params
 * @return {promise}
 * */
export const fetchChartData = ({
  hospitalId,
  ...rest
}) => {
  if (debug) {
    return delay(Mock.chartData);
  }
  return axios.post(`/wise/dmarket/hospital/${hospitalId}/spirit/statistics/spirit_answersheet`, rest);
};

/*
 * 导出问卷统计
 * @param {number}
 * @return {promise}
 * */
export const exportquestionnairestat = ({
  hospitalId,
  data,
}) => axios({
  method: 'post',
  responseType: 'blob',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/statistics/spirit_answersheet/xlsx`,
  data,
});


/*
 * 获取问卷详情
 * @param {number}
 * @return {promise}
 * */
export const fetchQuestionnaireDetail = ({
  hospitalId,
  ...rest
}) => {
  if (debug) {
    return delay(Mock.questionnairedetail);
  }
  return axios.post(`/wise/dmarket/hospital/${hospitalId}/spirit/statistics/questionnaire_detail`, rest);
};

/*
 * 导出问卷详情
 * @param {number}
 * @return {promise}
 * */
export const exportquestionnairedetail = ({
  hospitalId,
  data,
}) => axios({
  method: 'post',
  responseType: 'arraybuffer',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/statistics/questionnaire_detail/xlsx`,
  data,
});


/*
 * 获取答卷详情
 * @param {number}
 * @return {promise}
 * */
export const fetchAnswerDetail = ({
  questionnaireId,
  ...rest
}) => {
  if (debug) {
    if (_.isEmpty(rest)) {
      return delay(Mock.answerdetailAll);
    }
  }
  return axios.post(`/wise/dmarket/questionnaire/${questionnaireId}/answersheets_details`, rest);
};

/*
 * 导出答卷详情
 * @param {number}
 * @return {promise}
 * */
export const exportAnswerDetail = data => axios({
  method: 'post',
  responseType: 'arraybuffer',
  url: '/wise/dmarket/questionnaire/answersheets_details/xlsx',
  data,
});

/*
 * 导出评论统计xlsx
 * @params {object}
 * @return {promise}
 * */
export const exportcommentstat = ({
  hospitalId,
  data,
}) => axios({
  method: 'post',
  responseType: 'arraybuffer',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/statistics/spirit_comment/xlsx`,
  data,
});

/*
 * 导出评论详情xlsx
 * @params {object}
 * @return {promise}
 * */
export const exportcommentdetail = ({
  hospitalId,
  data,
}) => axios({
  method: 'post',
  responseType: 'arraybuffer',
  url: `/wise/dmarket/hospital/${hospitalId}/spirit/comments_query/xlsx`,
  data,
});

/*
 * 打点操作
 * @params {object}
 * @return {promise}
 * */
export const operateStat = data => axios({
  method: 'post',
  url: '/wise/rest/v1/audit/entries',
  data,
});

/*
 * 获取回复模板列表
 * @params {object}
 * @return {promise}
 * */
export const fetchReplyTemplateList = hospitalId => axios.get(`/wise/rest/v1/hospital/${hospitalId}/comment/reply_templates?sort=-createtime`);

/*
 * 添加模板
 * @params {object}
 * @return {promise}
 * */
export const createReplyTemplate = ({ hospitalId, data }) => axios({
  method: 'post',
  url: `/wise/rest/v1/hospital/${hospitalId}/comment/reply_templates`,
  data,
});

/*
 * 修改模板
 * @params {object}
 * @return {promise}
 * */
export const patchReplyTemplate = ({ id, data }) => axios({
  method: 'put',
  url: `/wise/rest/v1/text_template/${id}`,
  data,
});

/*
 * 删除模板
 * @params {object}
 * @return {promise}
 * */
export const deleteReplyTemplate = id => axios({
  method: 'delete',
  url: `/wise/rest/v1/text_template/${id}`,
});

/*
 * 更改某个管理员的某个权限
 * @params {object}
 * @return {promise}
 * */
export const mutateAuthority = (userId, auth, enable) => client.mutate({
  mutation: gql`
    mutation ($auth: String, $userId: Int, $enable: Boolean) {
      updateHosEmployeeAuth (
        auth: $auth,
        userId: $userId
        enable: $enable
      ) {
        id
      }
    }
  `,
  variables: {
    userId,
    auth,
    enable,
  },
  fetchPolicy: 'network-only',
});

export const fetchAuthorityList = (name, id, range) => client.query({
  query: gql`
      query ($id: Int, $name: String, $range: Range) {
        hospital(id: $id) {
          id
          auth(name: $name) {
            employees (range: $range) {
              user {
                id
                mobile
                fullName
              }
            }
          }
        }
      }
    `,
  variables: {
    id,
    name,
    range,
  },
  fetchPolicy: 'network-only',
});


export const fetchManagerAuth = (names, id) =>
   client.query({
     query: gql`
      query ($names: [String], $id: Int) {
        hospital (id: $id) {
          employee {
            hasAuthorities (names: $names)
          }
        }
      }
    `,
     variables: {
       names,
       id,
     },
   });


export const fetchWaitManageUsers = ({ id, classify }) =>
  client.query({
    query: gql`
      query fetchWaitManageUsers($id: Int, $range: Range, $names: [String]) {
        hospital(id: $id) {
          id
          staff(range: $range) {
            user {
              id
              fullName
              mobile
            }
            hasAuthorities(names: $names)
          }
        }
      }
    `,
    variables: {
      range: {
        limit: 99999999,
        start: 0,
      },
      id: Number(id),
      names: [`${classify}`],
    },
    fetchPolicy: 'network-only',
  });

export const postAuthMember = ({ id, auth }) =>
  client.mutate({
    mutation: gql`
      mutation (
        $auth: String,
        $userId: Int,
        $enable: Boolean
      ) {
        updateHosEmployeeAuth(
          auth: $auth,
          userId: $userId,
          enable: $enable
        ) {
          id
        }
      }
    `,
    variables: {
      enable: true,
      userId: id,
      auth,
    },
  });

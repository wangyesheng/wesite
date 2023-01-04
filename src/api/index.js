import request from "@/utils/request";

export function getDictsRes(typeId) {
  return request({
    url: "/api/dict/getAll",
    method: "get",
    params: {
      typeId
    }
  });
}

export function getSchoolsRes(params) {
  return request({
    url: "/api/university/PageList",
    method: "get",
    params
  });
}

export function getSchoolDetailsByIdRes(id) {
  return request({
    url: `/api/university/show/${id}`,
    method: "get"
  });
}

export function getEnterprisesRes(params) {
  return request({
    url: `/api/enterprise/PageList`,
    method: "get",
    params
  });
}

export function getEnterpriseDetailsByIdRes(id) {
  return request({
    url: `/api/enterprise/show/${id}`,
    method: "get"
  });
}

export function getArticlesRes(params) {
  return request({
    url: `/api/article`,
    method: "get",
    params
  });
}

export function askQuestionRes(data) {
  return request({
    url: `/api/backend/question/create`,
    method: "post",
    data
  });
}

export function getQuestionsRes(params) {
  return request({
    url: `/api/question/pageList`,
    method: "get",
    params
  });
}

export function checkLoginRes(data) {
  return request({
    url: `api/member/login`,
    method: "post",
    data
  });
}

export function registerRes(data) {
  return request({
    url: `api/member/register`,
    method: "post",
    data
  });
}

export function getVerificationCodeRes(phone) {
  return request({
    url: `api/member/getVerificationCode`,
    method: "get",
    params: {
      phone
    }
  });
}

export function getUserInfoRes() {
  return request({
    url: `api/backend/core/member/show`,
    method: "get"
  });
}

export function createSchoolRes(data) {
  return request({
    url: `api/backend/core/university/create`,
    method: "post",
    data
  });
}

export function clickCountInUniversityRes(id) {
  return request({
    url: `api/university/addClickCount`,
    method: "get",
    params: {
      id
    }
  });
}

export function createEnterpriseRes(data) {
  return request({
    url: `api/backend/core/enterprise/create`,
    method: "post",
    data
  });
}

export function clickCountInEnterpriseRes(id) {
  return request({
    url: `api/enterprise/addClickCount`,
    method: "get",
    params: {
      id
    }
  });
}

export function applyJobFairRes(data) {
  return request({
    url: `api/backend/core/universityRecruitment/create`,
    method: "post",
    data
  });
}

export function getJobFairsRes(params) {
  return request({
    url: `api/universityRecruitment/PageList`,
    method: "get",
    params
  });
}

export function applyCooperativeProjectRes(data) {
  return request({
    url: `api/backend/core/cooperativeproject/create`,
    method: "post",
    data
  });
}

export function getCooperativeProjectRes(params) {
  return request({
    url: `api/cooperativeproject/PageList`,
    method: "get",
    params
  });
}

export function updateUserInfoRes(data) {
  return request({
    url: `api/backend/core/member/update`,
    method: "post",
    data
  });
}

export function changePasswordRes(data) {
  return request({
    url: `api/backend/core/member/changePassword`,
    method: "post",
    data
  });
}

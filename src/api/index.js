import http from './public'
const baseUrl = '/api'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/login`, ['/' + params.userName + '/' + params.userPwd])
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/loginOut`, ['/' + params.token])
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/userInfo`, ['/' + params.token])
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(`${baseUrl}/users/register`, params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost(`${baseUrl}/users/upload`, params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost(`${baseUrl}/users/updateheadimage`, params)
}
// 首页接口热门商品
export const hotProduct = (params) => {
  return http.fetchGet(`${baseUrl}/product/bioProductSku/getHotProduct`, [params])
}
// 首页接口热门品牌
export const hotBrand = (params) => {
  return http.fetchGet(`${baseUrl}/brand/bioBrand/getHotBrand`, [params])
}

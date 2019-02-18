import http from './public'
const baseUrl = '/api'
// 获取所有商品
export const getAllProduct = (params) => {
  return http.fetchGet(`${baseUrl}/product/bioProductSku/getAllProduct`, [])
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/cartList`, ['/' + params.token])
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/addCart`, ['/' + params.productId + '/' + params.token])
}
// 批量加入购物车
export const addCartBatch = (params) => {
  var t1 = JSON.stringify(params.productMsg)
  t1 = t1.substring(1)
  t1 = t1.substring(0, t1.lastIndexOf(']'))
  console.log(t1)
  return http.fetchPost(`${baseUrl}/user/bioUser/addCartBatch`, ['/' + params.token + '/' + t1])
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/delCart`, ['/' + params.token + '/' + params.productId])
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/cartEdit`, ['/' + params.token + '/' + params.productId + '/' + params.productNum + '/' + params.checked])
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/editCheckAll`, ['/' + params.token])
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/addressList`, ['/' + params.token])
}

// 根据addressId获取地址
export const addressById = (params) => {
  return http.fetchPost(`${baseUrl}/address/bioAddress/getAddressByUserId`, ['/' + params.addressId])
}

// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressUpdate`, params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressAdd`, params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost(`${baseUrl}/users/addressDel`, params)
}

// 生成未支付订单
export const generalOrder = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/generalOrder`, ['/' + params.token + '/' + params.addressId])
}

// 支付
export const payMent = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/payMent`, ['/' + params.token + '/' + params.orderNo])
}
// 订单
export const orderList = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/orderList`, ['/' + params.token])
}
// 商品详情
export const productDet = (params) => {
  return http.fetchPost(`${baseUrl}/product/bioProductSku/productDet`, ['/' + params.productId])
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost(`${baseUrl}/user/bioUser/delOrder`, params)
}

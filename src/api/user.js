
import request from '@/utils/request'
import qs from 'qs'

export default {
  getUserRoles,
  saveUserRoles,  
  login,
  register,
  logout,
  getUserInfo,
  editUserInfo,
  editPassword,
  getDepartment
}
// 登录
function login({ account, password, rememberMe }) { // 记住密码
  return request({
    url: '/sign/login',
    method: 'post',
    data: {
      account: account,
      password: password,
      rememberMe: rememberMe
    }
  })
}

function register({ account, password, phone, name, jobId}) { //注册
  return request({
    url: '/sign/register',
    method: 'post',
    data: {
      username: account,
      password: password,
      phone:phone,
      name:name,
      jobId:jobId,
    }
  })
}


// 退出
function logout() {
  return request.post('/sign/logout')
}
// 获取用户权限信息
function getUserRoles(userId) {
  return request({
    url: '/sign/getUserRoles',
    method: 'post',
    data: { userId }
  })
}

// 保存用户权限信息
function saveUserRoles(userId, roleIds) {
  return request({
    url: '/sign/saveUserRoles',
    method: 'post',
    data: { userId, roleIds }
  })
}
// 获取个人用户信息
function getUserInfo() {
  return request.get('/sign/info')
}

// 编辑用户信息(body)
function editUserInfo(userId, data) {
  return request.post(`/sign/editUserInfo/${userId}`, data)
}
// 修改密码
function editPassword(userId, password) {
  return request({
    url: '/sign/editPassword',
    method: 'post',
    data: { userId, password }
  })
}
// 修改密码
function getDepartment(parentId) {
  return request({
    url: '/sign/getDepartment',
    method: 'post',
    data: { parentId }
  })
}

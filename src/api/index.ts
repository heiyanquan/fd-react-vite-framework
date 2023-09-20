import actionRequest from '@/utils/request'

export function getCompanyList(data) {
  return actionRequest({
    url: '/lget/company/info/companyPage',
    method: 'post',
    data
  })
}

// 股东信息
export function getShareholdersDetail(data) {
  return actionRequest({
    url: `/lget/company/sholder/page`,
    method: 'post',
    data
  })
}

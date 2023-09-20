/*
 * @Author: suzb@hsmap.com
 * @Date: 2022-04-07 18:24:43
 * @LastEditTime: 2022-04-07 18:48:04
 * Copyright (c) 2022 by nick/火石创造, All Rights Reserved.
 */

/**
 * @description:
 * @param {}
 * @return {
 *  repeat_request_cancel: 请求取消,
 *  loading: 加载中
 *  reduct_data_format: 数据格式化
 *  error_message_show: 错误信息显示
 *  code_message_show: 错误码信息显示
 *  [propName: string]: any
 * }
 */
export type TCustomOptions = {
  repeat_request_cancel: boolean
  loading: boolean
  reduct_data_format: boolean
  error_message_show: boolean
  code_message_show: boolean
  [propName: string]: unknown
}

// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** List person GET /api/erp-business-center */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.List>('/api/erp-business-center', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

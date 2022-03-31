// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Read one person GET /api/erp-business-center/${param0}||${param1} */
export async function read(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.readParams,
  options?: { [key: string]: any },
) {
  const { PK: param0, SK: param1, ...queryParams } = params;
  return request<API.Item>(`/api/erp-business-center/${param0}||${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

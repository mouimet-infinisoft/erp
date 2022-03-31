// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Update PUT /api/erp-contact/${param0}||${param1} */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParams,
  body: API.Item,
  options?: { [key: string]: any },
) {
  const { PK: param0, SK: param1, ...queryParams } = params;
  return request<API.Success>(`/api/erp-contact/${param0}||${param1}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

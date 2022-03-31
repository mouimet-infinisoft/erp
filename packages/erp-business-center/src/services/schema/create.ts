// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create a person POST /api/erp-business-center */
export async function create(body: API.Item, options?: { [key: string]: any }) {
  return request<API.Response>('/api/erp-business-center', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create POST /api/erp-contact */
export async function create(body: API.Item, options?: { [key: string]: any }) {
  return request<API.Success>('/api/erp-contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create a person POST /api/erp-contact */
export async function create(body: API.Item, options?: { [key: string]: any }) {
  return request<API.Response>('/api/erp-contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

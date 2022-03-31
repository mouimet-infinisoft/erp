// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** List category. Ex: [Parent, Child, Lawyer] GET /api/erp-business-center/category */
export async function category(options?: { [key: string]: any }) {
  return request<API.Response>('/api/erp-business-center/category', {
    method: 'GET',
    ...(options || {}),
  });
}

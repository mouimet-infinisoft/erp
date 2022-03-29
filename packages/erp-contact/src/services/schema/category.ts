// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** List category. Ex: [Parent, Child, Lawyer] GET /api/erp-contact/category */
export async function category(options?: { [key: string]: any }) {
  return request<API.Response>('/api/erp-contact/category', {
    method: 'GET',
    ...(options || {}),
  });
}

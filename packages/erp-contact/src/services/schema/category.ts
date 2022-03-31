// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** List category. Ex: [Person, Supply, Lawyer] GET /api/erp-contact/category */
export async function category(options?: { [key: string]: any }) {
  return request<API.Success>('/api/erp-contact/category', {
    method: 'GET',
    ...(options || {}),
  });
}

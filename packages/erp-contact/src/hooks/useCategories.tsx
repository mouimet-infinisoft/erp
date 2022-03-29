/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { request, useRequest } from 'umi';
import config from '../../config/icConfig';

/**
 * Generated hook for micro app data access pattern on global secondary index
 * 
 */
export const useCategories = (term: string = 'Person') => {
  const { data } = useRequest<{ success: true, data: { categories: Record<string, number>, count: number } }>(() => request(`/api/${config.appName}/category/${term}`))

  /**
   * 
   * @returns {categories} as object {key, label, value} list
   */
  const getCategories = () => {
    return Object.keys(data?.categories ?? []).map((r, i) => ({ key: i, label: r, value: r })) ?? []
  }

  /**
   * category count requested
   */
  const categories = (data?.categories ?? []) as Record<string, number>

  /**
   * Total category count requested
   */
  const count = data?.count ?? 0

  return { getCategories, categories, count }
};
/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useAppContext } from '@/pages';
import { create } from "@/services/schema/create";
import { list } from '@/services/schema/list';
import { update } from "@/services/schema/update";
import { useRequest } from 'umi';

/**
 * UI CRUD Event handlers including user feedback, logging, error control
 * 
 */
export const useOperations = () => {
  const { logger } = useAppContext();
  const { loading, data, error, run: runRequest } = useRequest<API.List>(list)

  const handleCreate = async (fields: API.Item) => {
    const { hide } = logger.custom({ message: 'Creating...' }) as any;

    try {
      await create({ ...fields });
      hide();
      return true;
    } catch (error) {
      hide();
      logger.error({ message: 'Unable to create!', context: error });
      return false;
    }
  };

  const handleUpdate = async (fields: API.Item, currentRow: API.Item) => {
    const { hide } = logger.custom({ message: 'Updating...' }) as any;

    try {
      await update({ PK: currentRow.PK, SK: currentRow.SK }, {
        ...currentRow,
        ...fields,
      });
      hide();
      return true;
    } catch (error) {
      hide();
      logger.error({ message: 'Unable to update!', context: error });
      return false;
    }
  };

  const handleList = async (
    params: API.listParams,
    options?: { [key: string]: any },
  ) => {
    const { current, pageSize, keyword, ...rest } = params
    const transformedParams: any = {
      ...rest,
      page: current,
      limit: pageSize
    }

    if (params.keyword) {
      transformedParams['search'] = params.keyword
    }

    return runRequest(transformedParams, options);
  }

  const handleSearch = async (term: string) => {
    const { hide } = logger.custom({ message: 'Searching...' }) as any;

    try {
      const result = await runRequest({ search: term })
      hide();
      return result;
    } catch (error) {
      hide();
      logger.error({ message: 'Unable to complete search!', context: error });
    }
  };

  const handleFilter = async (term: string) => {
    const { hide } = logger.custom({ message: 'Filtering...' }) as any;

    try {
      const searchFilter = term === 'All' || term === '' ? {} : { GSIPK: term };
      await runRequest(searchFilter)
      hide();
      return true;
    } catch (error) {
      hide();
      logger.error({ message: 'Unable to complete filtering!', context: error });
      return false;
    }
  };


  return { handleCreate, handleUpdate, handleList, data, runRequest, loading, error, handleSearch, handleFilter };
};
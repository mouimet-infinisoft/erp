/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useOperations } from '@/hooks/useOperations';
import { Icon } from '@iconify/react';
import { Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import './override.css';

const { Option } = Select

const SimpleSearch = () => {
  const [state, setState] = React.useState<API.Item>();

  const fetchOptions = React.useCallback(async () => {
    const result = (await handleList({}))?.map((contact) => ({ value: contact.SK, label: contact.name, key: contact.PK, ...contact })) ?? []
    setOptions(result)
  }, [])

  useEffect(() => {
    fetchOptions()

  }, [fetchOptions]);

  type RelationSearchState = { term?: string, last?: string, timestamp: number, status: "idle" | "debouncing", timerId: number }
  const { handleList, handleSearch } = useOperations()
  const [options, setOptions] = React.useState<API.Item[]>();


  const debounceRef = React.useRef<RelationSearchState>({
    timestamp: new Date().getTime(),
    status: 'idle',
    timerId: 0
  });

  const handleDebounce = React.useCallback(async () => {
    if (debounceRef.current.status === 'debouncing' && (new Date().getTime() - debounceRef.current.timestamp) > 2000) {
      stopDebounce()
    }

    if (debounceRef.current.term && debounceRef.current.term !== debounceRef.current.last) {
      const result = await handleSearch(debounceRef.current.term)
      setOptions(result)
      debounceRef.current = { ...debounceRef.current, timestamp: new Date().getTime() }
    }

  }, [])

  const startDebounce = () => {
    if (debounceRef.current.status !== 'debouncing') {
      debounceRef.current = {
        timestamp: new Date().getTime(),
        status: 'debouncing',
        timerId: setInterval(handleDebounce, 400) as any
      }
    }
  }

  const stopDebounce = () => {
    if (debounceRef.current.status === 'debouncing') {
      clearInterval(debounceRef.current.timerId)
      debounceRef.current = {
        timestamp: new Date().getTime(),
        status: 'idle',
        timerId: 0
      }
    }
  }

  React.useEffect(() => stopDebounce, [stopDebounce])

  return (
          <Select
            maxTagTextLength={100}
            style={{ width: '100%' }}
            showSearch
            allowClear
            mode='tags'
            filterOption={false}
            notFoundContent={'No result'}
            onSearch={term => {
              debounceRef.current.term = term
              startDebounce()
            }}
            onChange={val => {
              setState(prev => ({ ...prev, relatedWith: val }))
              stopDebounce()
              fetchOptions()
            }}
          >
            {options?.map(({ SK, GSIPK, name, email = '', telephones = [], address = '' }) => <Option key={SK} value={SK}>

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Icon icon="bi:person-badge" height="16" style={{ marginRight: '0.35rem' }} />
                <div>
                  <Typography.Title style={{ display: 'inline' }} level={5}>{name},</Typography.Title><Typography.Text style={{ display: 'inline' }}>{` ${GSIPK}`}</Typography.Text>
                  <Typography>{email}</Typography>
                  <Typography>{address}</Typography>
                  <Typography>{telephones?.[0] ?? ''}</Typography>
                </div>
              </div>

            </Option>) ?? []}

          </Select>
  );
};

export default SimpleSearch;
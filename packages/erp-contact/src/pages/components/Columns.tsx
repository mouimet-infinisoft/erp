/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { ProColumns } from "@ant-design/pro-table";
import { Sorters } from "@infini-soft/utils";
import { trigger } from "@infini-soft/utils/lib/Events";
import Tag from "antd/lib/tag";

export const columns: ProColumns<API.Item>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: Sorters.bubble('name'),
        render: (dom, entity) => {
            return (
                <a
                    onClick={() => {
                        trigger('ui.open.read', entity)
                    }}
                >
                    {dom}
                </a>
            );
        },
    },
    {
        title: 'Category',
        dataIndex: 'GSIPK',
        sorter: Sorters.bubble('GSIPK'),
        filters: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        sorter: Sorters.bubble('address'),
        render: (_, record) => record.address,
    },
    {
        title: 'Telephones',
        dataIndex: 'telephones',
        sorter: Sorters.bubble('telephones'),
        valueType: 'select',
        render: (_, record) => {
            if (Array.isArray(record.telephones)) {
                return record.telephones.map((t, i) => <Tag key={i}>{t ?? ''}</Tag>);
            }
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: Sorters.bubble('email'),
        valueType: 'text',
        render: (_, record) => record.email,
    },
    {
        title: 'Website',
        dataIndex: 'website',
        sorter: Sorters.bubble('website'),
        valueType: 'text',
        hideInTable: true
    },
    {
        title: 'Relation',
        dataIndex: 'relatedWith',
        sorter: Sorters.bubble('relatedWith'),
        valueType: 'text',
        hideInTable: true
    },
    {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        hideInForm: true,
        hideInDescriptions: true,
        render: (_, record) => [
            <a
                key="action-update"
                onClick={() => {
                    trigger('ui.open.update', record)
                }}
            >
                Edit
            </a>,
        ],
    },
]
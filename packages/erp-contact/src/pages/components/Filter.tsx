/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useCategories } from "@/hooks/useCategories";
import { trigger } from "@infini-soft/utils/lib/Events";
import { Badge, Radio } from "antd";
import { RadioButtonProps } from "antd/lib/radio/radioButton";
import React from "react";
import styles from './index.less';

const Filter = () => {
    const { categories } = useCategories()
    const [filterActiveKey, setFilterActiveKey] = React.useState('none');

    const renderBadge = (count: number, active = false) => {
        return (
            <Badge
                count={count}
                style={{
                    marginTop: - 2,
                    marginLeft: 4,
                    color: active ? '#1890FF' : '#999',
                    backgroundColor: active ? '#E6F7FF' : '#eee',
                }}
            />
        );
    }

    const onChange = (event: any) => {
        setFilterActiveKey(event.target.value)
        trigger('ui.list.filter', event.target.value)
    }

    const NoFilter = (props: RadioButtonProps) => <Radio.Button {...props} value={'All'} key={'All'} className={styles.filterButton}>All</Radio.Button>

    return <Radio.Group value={filterActiveKey} onChange={onChange} >
        <NoFilter className={styles.filterButton} />
        {Object.keys(categories).sort((a, b) => categories[b] - categories[a]).slice(0, 3)
            .map(k =>
                <Radio.Button value={k} key={k} className={styles.filterButton}><span>{k}{renderBadge(categories[k], filterActiveKey === k)} </span></Radio.Button>

            )
        }
    </Radio.Group>

}

export default Filter
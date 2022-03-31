/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

import { CheckCard, CheckCardGroupProps } from "@ant-design/pro-card"
import { Avatar } from "antd"
import React from "react"

const defaultAvatar = <Avatar
    src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
    size={'large'}
/>

type CategoryProps = {
    title: string
    avatar?: React.ReactNode
    description?: string
    value: string
}

const Category = ({ title, avatar = defaultAvatar, description, value }: CategoryProps) => {
    return <CheckCard
        title={title}
        avatar={avatar}
        description={description}
        value={value}
        key={value}
    />
}

type CategoryListProps = {
    list: CategoryProps[]
    groupProps?: CheckCardGroupProps
}

const CategoryList = ({ list, groupProps }: CategoryListProps) => {
    return <CheckCard.Group

    // style={{display: 'flex',  justifyContent: 'center', flexWrap: 'wrap', width: 700  }}
    {...groupProps}
  >
        {list.map(i => <Category {...i} key={i.value}/>)}
    </CheckCard.Group>
}

export default CategoryList
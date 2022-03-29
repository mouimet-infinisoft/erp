/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { trigger } from "@infini-soft/utils/lib/Events";
import { Input } from "antd";
import styles from './index.less';

const Search = () => {
    const handleSearch = (term:string) => trigger('ui.list.search', term)
    
    return  <Input.Search placeholder='What are you searching ?' allowClear onSearch={handleSearch} className={styles.search} />
}

export default Search
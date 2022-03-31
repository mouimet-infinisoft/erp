/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import ProDescriptions from "@ant-design/pro-descriptions";
import { off, on } from "@infinicloud/utils/lib/Events";
import Drawer from "antd/lib/drawer";
import React, { useEffect } from "react";
import { columns } from "./Columns";

const Read = () => {
    const [state, setState] = React.useState<API.Item>();
    const [visible, setVisible] = React.useState(false);

    const handleClose = () => setVisible(false)
    const eventHandler = (payload:any) => {setState(payload?.detail); setVisible(true)}

    useEffect(()=>{
        on('ui.open.read', eventHandler)
        return () => off('ui.open.read', eventHandler)
    },[])

    return <Drawer
        width={600}
        destroyOnClose
        visible={visible}
        onClose={handleClose}
        closable={false}
    >
        {state?.name && (
            <ProDescriptions<API.Item>
                column={2}
                title={state?.name}
                request={async () => ({
                    data: state || {},
                })}
                params={{
                    id: state?.name,
                }}
                columns={columns}
            />
        )}
    </Drawer>
}

export default Read
/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useOperations } from "@/hooks/useOperations";
import { ModalForm } from "@ant-design/pro-form";
import { PersonForm } from "@infinicloud/kitchensink/lib/Components/Forms";
import { off, on, trigger } from "@infinicloud/utils/lib/Events";
import Form from "antd/lib/form";
import React, { useEffect } from "react";

const Update = () => {
    const [state, setState] = React.useState<API.Item>();
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm<API.Item>();
    const { handleUpdate } = useOperations();

    const handleClose = () => setVisible(false)
    const eventHandler = (payload: any) => { setState(payload?.detail); setVisible(true) }

    useEffect(() => {
        on('ui.open.update', eventHandler)
        return () => off('ui.open.update', eventHandler)
    }, [])

    return <ModalForm<API.Item>
        form={form}
        visible={visible}
        onVisibleChange={val=>setVisible(val)}
        modalProps={{ destroyOnClose: true }}
        initialValues={state}
        onFinish={async (value) => {
            const success = await handleUpdate(value, state!);

            if (success) {
                handleClose();
                trigger('ui.list.reload', {})
            }
        }}
    >
        <PersonForm edit />
    </ModalForm>
}

export default Update
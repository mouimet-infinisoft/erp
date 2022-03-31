/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useCategories } from "@/hooks/useCategories";
import { useOperations } from "@/hooks/useOperations";
import { StepsForm } from "@ant-design/pro-form";
import { PersonForm } from "@infinicloud/kitchensink/lib/Components/Forms";
import { off, on, trigger } from "@infinicloud/utils/lib/Events";
import { Button, Modal } from "antd";
import React, { useEffect } from "react";
import CategoryList from "./Category";

const Create = () => {
    const [state, setState] = React.useState<API.Item>();
    const [visible, setVisible] = React.useState(false);
    const { handleCreate } = useOperations();
    const handleClose = () => setVisible(false)
    const eventHandler = (payload: any) => { setState(payload?.detail); setVisible(true) }
    const [activeCategoryKey, setCategoryKey] = React.useState<any>();
    const { getCategories } = useCategories()

    useEffect(() => {
        on('ui.open.create', eventHandler)
        return () => off('ui.open.create', eventHandler)
    }, [])

    return <>
        <Button
            type="primary"
            key="primary"
            onClick={() => setVisible(true)}
        >
            Create
        </Button>
        <Modal
            title="Create"
            visible={visible}
            destroyOnClose
            footer={false}
            onCancel={handleClose}
        >
            <StepsForm<API.Item>
                onFinish={async (value) => {
                    const success = await handleCreate(value);

                    if (success) {
                        handleClose();
                        trigger('ui.list.reload', {})
                    }
                }}
            >
                <StepsForm.StepForm<{ name: string }>
                    name="Category"
                    title="Category"
                    stepProps={{
                        description: "What kind of contact?",
                    }}
                    onFinish={async () => {

                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <CategoryList groupProps={{ onChange: (val: any) => setCategoryKey(val) }} list={getCategories()?.map(c => ({
                            title: c.label,
                            value: c.label
                        }))} />
                    </div>
                </StepsForm.StepForm>


                <StepsForm.StepForm<{ name: string }>
                    name="Contact"
                    title="Contact"
                    stepProps={{
                        description: "how can we reach out?",
                    }}
                    onFinish={async () => {
                        return true;
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {activeCategoryKey === 'Parents' && <PersonForm edit={false} />}
                        {activeCategoryKey === 'Enfants' && <><h2>Enfant</h2></>}
                        {activeCategoryKey === 'Referents' && <><h2>Referents</h2></>}
                    </div>
                </StepsForm.StepForm>
            </StepsForm>
        </Modal>
    </>
}

export default Create
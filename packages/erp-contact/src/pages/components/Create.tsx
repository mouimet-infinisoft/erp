/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useCategories } from '@/hooks/useCategories';
import { useOperations } from '@/hooks/useOperations';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ProFormSelect, StepsForm } from '@ant-design/pro-form';
import { PersonForm } from '@infini-soft/kitchensink/lib/Components/Forms';
import { off, on, trigger } from '@infini-soft/utils/lib/Events';
import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import CategoryList from './Category';
import { columns } from './Columns';
import styles from './index.less';

const Create = () => {
  const [state, setState] = React.useState<API.Item>();
  const [visible, setVisible] = React.useState(false);
  const { handleCreate } = useOperations();
  const handleClose = () => setVisible(false);
  const eventHandler = (payload: any) => {
    setState(payload?.detail);
    setVisible(true);
  };
  const [activeCategoryKey, setCategoryKey] = React.useState<any>();
  const { getCategories } = useCategories();

  useEffect(() => {
    on('ui.open.create', eventHandler);
    return () => off('ui.open.create', eventHandler);
  }, []);

  return (
    <>
      <Button type="primary" key="primary" onClick={() => setVisible(true)}>
        Create
      </Button>
      <Modal
        title="Create"
        visible={visible}
        destroyOnClose
        footer={false}
        width={730}
        onCancel={handleClose}
      >
        <StepsForm<API.Item>
          onFinish={async (value) => {
            const success = await handleCreate(value);

            if (success) {
              handleClose();
              trigger('ui.list.reload', {});
            }
          }}
        >
          <StepsForm.StepForm<{ name: string }>
            name="Category"
            title="Category"
            className={styles.step}
          >
            <CategoryList
              groupProps={{ onChange: (val: any) => setCategoryKey(val) }}
              list={getCategories()?.map((c) => ({
                title: c.label,
                value: c.label,
              }))}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm<{ name: string }>
            name="Contact"
            title="Contact"
            className={styles.step}
            onFinish={async () => {
              return true;
            }}
          >
            <PersonForm edit={false} />
          </StepsForm.StepForm>
          <StepsForm.StepForm<{ name: string }>
            name="More information"
            title="More information"
            className={styles.step}
            onFinish={async () => {
              return true;
            }}
          ></StepsForm.StepForm>
          <StepsForm.StepForm<{ name: string }>
            name="Summary"
            title="Summary"
            className={styles.step}
            onFinish={async () => {
              return true;
            }}
          >
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
          </StepsForm.StepForm>
        </StepsForm>
      </Modal>
    </>
  );
};

export default Create;

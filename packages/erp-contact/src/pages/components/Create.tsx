/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useCategories } from '@/hooks/useCategories';
import { useOperations } from '@/hooks/useOperations';
import ProDescriptions from '@ant-design/pro-descriptions';
import { StepsForm } from '@ant-design/pro-form';
import { Icon } from '@iconify/react';
import { ContactForm } from '@infini-soft/kitchensink/lib/Components/Forms';
import { off, on, trigger } from '@infini-soft/utils/lib/Events';
import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import CategoryList from './Category';
import { columns } from './Columns';
import styles from './index.less';
import './override.css';
import SimpleSearch from './SimpleSearch';


const Create = () => {
  const [state, setState] = React.useState<API.Item>();
  const [status, setStatus] = React.useState<string>('idle');
  const [visible, setVisible] = React.useState(false);
  const { handleCreate } = useOperations();
  const handleClose = () => setVisible(false);
  const eventHandler = (payload: any) => {
    setState(payload?.detail);
    setVisible(true);
  };
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
      <StepsForm<API.Item>
        stepsFormRender={(form, submitter) => {
          return <Modal
            title="Create"
            visible={visible}
            destroyOnClose
            footer={submitter}
            onCancel={handleClose}
          >{form}</Modal>
        }

        }
        submitter={{
          render: (props, dom) => {
            return [
              <div className={styles.submitter}>
                <Button className={styles.button} onClick={() => props?.onPre?.()} hidden={props.step === 0}>
                  Back
                </Button>
                <Button type='primary' className={styles.button} loading={status === 'loading'} onClick={() => props?.onSubmit?.()}>
                  {props.step === 2 ? "Submit" : "Next"}
                </Button>
              </div>
            ]
          }
        }}
        onFinish={async () => {
          setStatus('Saving')

          if (state?.GSIPK &&
            state?.name) {

            const success = await handleCreate(state);

            if (success) {
              handleClose();
              trigger('ui.list.reload', {});
              setStatus('idle')
              Promise.resolve(true)
            }
          }

          Promise.reject()
        }}
      >
        <StepsForm.StepForm<API.Item>
          name="Category"
          title="Category"
          className={styles.step}
          onFinish={() => Promise.resolve(getCategories().some(c => c.value === state?.GSIPK))}
        >
          <CategoryList
            groupProps={{ onChange: (val: any) => setState(prev => ({ ...prev, GSIPK: val })) }}
            list={getCategories()?.map((c) => ({
              title: c.label,
              value: c.label,
              avatar: <Icon icon="bi:person-badge" height="32" />
            }))}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm<API.Item>
          name="Contact"
          title="Contact"
          className={styles.step}
          onFinish={values => {
            setState(prev => ({ ...prev, ...values }))
            return Promise.resolve(true);
          }}
        >
          <ContactForm
            nameProps={{ rules: [{ required: true, message: 'Required!' }] } as any}
            edit={false} />

          <SimpleSearch />
        </StepsForm.StepForm>

        <StepsForm.StepForm<API.Item>
          name="Summary"
          title="Summary"

        >
          <ProDescriptions<API.Item>
            column={2}
            title={'Are these informations correct?'}
            dataSource={state}
            columns={columns}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default Create;
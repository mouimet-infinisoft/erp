/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 * 
 * Micro app entry point
 * Credentials passed in props
 * Context Provider is created with localization, configuration, theming, logging
 */
import { connectMaster } from '@/.umi/plugin-qiankun/connectMaster';
import { Logger, Plugins } from "@infini-soft/logger";
import { ConfigProvider } from 'antd';
import enUs from 'antd/lib/locale/en_US';
import React, { useEffect } from "react";
import request from 'umi-request';
import icConfig from "../../config/icConfig";
import App from './components/App';
const { antdMessagePlugin, consoleLogger } = Plugins

type Tokens = {
  access: string
  id: string
}

type AppProps = {
  token: Tokens
}

const initialContext = {
  logger: new Logger({ console: consoleLogger, hide: antdMessagePlugin }, icConfig.logger)
}

const Context = React.createContext(initialContext)

export const useAppContext = () => {
  return React.useContext(Context)
}

const Index = <T extends AppProps>(props: T) => {
  const [context] = React.useState(initialContext);

  useEffect(() => {

    request.use(
      async (ctx, next) => {
        const { req } = ctx;
        const { options } = req;

        ctx.req.options = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${props?.token?.id}`
          },
        };

        await next();
      },
      { global: true },
    );
  }, [props.token])

  return (
    <ConfigProvider locale={enUs}>
      <Context.Provider value={context}>
        <App />
      </Context.Provider>
    </ConfigProvider>
  );
};

export default connectMaster(Index);
/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 * 
 * Should avoid to change this configuration file
 * 
 */
import { join } from 'path';
import { defineConfig } from 'umi';
import config from './icConfig';

const ENV = (process?.env?.ENV as keyof typeof config.environments) || 'dev'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index' },
    ],
    fastRefresh: {},
    qiankun: {
        slave: {}
    },
    openAPI: [
        {
            requestLibPath: "import { request } from 'umi'",
            schemaPath: join(__dirname, '..', 'models', 'schemas', 'schemas.json'),
            projectName: "schema",
            mock: false
        }
    ],
    mock: ENV === 'mock' ? {}: false,
    proxy: {
        [`/api/${config.appName}`]: {
            target: config.environments[ENV],
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    },
});

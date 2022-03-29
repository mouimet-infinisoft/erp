/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

import { faker } from '@faker-js/faker';
import { Logger, Plugins } from '@infini-soft/logger';
// @ts-ignore
import type { Request, Response } from '@types/express';
import icConfig from '../config/icConfig';
import data from './data';

const { consoleLogger } = Plugins
let inMemoryData = data
const logger = new Logger({ console: consoleLogger }, { ...icConfig.logger })

export default {
    /**
    * GSI 
    */
    [`GET /api/${icConfig.appName}/category/:term`]: (req: Request, res: Response) => {
        try {
            const { params, body, headers, query } = req
            const term = params['term']
            logger.info({ message: `MOCK GET GSI REQUEST `, context: { params, body, headers, query } })

            let result: Record<string, number> = {}
            let count = 0;
            inMemoryData.forEach(r => {
                if (r.SK.startsWith(term)) {
                    result[r.GSIPK] = (result[r.GSIPK] ?? 0) + 1
                    count++;
                }
            })

            res
                .setHeader('Access-Control-Allow-Origin', '*')
                .json({
                    success: {},
                    data: {
                        categories: result,
                        count
                    },
                    count: inMemoryData.length
                })
            logger.success({ message: `MOCK Get Request Success`, context: result })
        } catch (error) {
            logger.error({ message: `MOCK GET Failed`, context: error })
        }

    },
    [`GET /api/${icConfig.appName}`]: (req: Request, res: Response) => {
        try {
            const { params, body, headers, query } = req
            logger.info({ message: `MOCK GET REQUEST `, context: { query, params, body, headers } })

            let result = inMemoryData;
            if (query?.['search']) {
                result = inMemoryData.filter(r => JSON.stringify(r).includes(String(query['search'])))
            }

            if (query?.['GSIPK']) {
                result = result.filter(r => r.GSIPK.includes(query['GSIPK'] as string))
            }

            res
                .setHeader('Access-Control-Allow-Origin', '*')
                .json({
                    success: {},
                    data: result,
                    count: {}
                })
            logger.success({ message: `MOCK Get Request Success` })
        } catch (error) {
            logger.error({ message: `MOCK GET Failed`, context: error })
        }

    },
    
    [`GET /api/${icConfig.appName}/:id`]: (req: Request, res: Response) => {
        try {
            logger.info({ message: `MOCK GET ID REQUEST `, context: req })
            const PK = req.params['PK'];
            const SK = req.params['SK'];
            const record = inMemoryData.find(r => r.PK === PK && r.SK === SK)
            res.setHeader('Access-Control-Allow-Origin', '*');

            if (record) {
                res.json({
                    success: {},
                    data: record
                })
                    .status(200)
                logger.success({ message: `MOCK GET ID REQUEST Success` })
            } else {
                res.json({
                    success: false
                })
                    .status(404)
                logger.warn({ message: `MOCK GET ID REQUEST NOT FOUND` })
            }
        } catch (error) {
            logger.error({ message: `MOCK GET ID Failed`, context: error })
            res.json({
                success: false
            })
                .status(500)
        }

    },

    [`POST /api/${icConfig.appName}`]: (req: Request, res: Response) => {
        try {
            logger.info({ message: `MOCK POST REQUEST `, context: req })
            res.setHeader('Access-Control-Allow-Origin', '*');
            const newRecord = { ...req.body, PK: 'Tenant1', SK: `Person` + faker.unique(faker.datatype.uuid) }
            inMemoryData.unshift(newRecord)
            res.json({
                success: {},
                data: newRecord
            })
                .status(200)
            logger.success({ message: `MOCK POST REQUEST Success`, context: newRecord })
        } catch (error) {
            logger.error({ message: `MOCK POST REQUEST Failed`, context: error })
            res.json({
                success: false
            })
                .status(500)
        }
    },

    
    [`PUT /api/${icConfig.appName}/:id`]: (req: Request, res: Response) => {
        try {
            const { params, body, headers } = req
            logger.info({ message: `MOCK PUT REQUEST `, context: { params, body, headers } })

            const id = req.params['id'];
            const PK = id.split('||')[0];
            const SK = id.split('||')[1];
            logger.info({ message: `MOCK PUT PARSED `, context: { id, PK, SK } })
            inMemoryData = inMemoryData.map(r => r.PK === PK && r.SK === SK ? ({ ...r, ...req.body }) : r)

            res.setHeader('Access-Control-Allow-Origin', '*');
            if (inMemoryData) {
                res.json({
                    success: {},
                    data: {}
                })
                    .status(204)
                logger.success({ message: `MOCK PUT REQUEST Success` })
            } else {
                res.json({
                    success: false
                })
                    .status(404)
                logger.warn({ message: `MOCK PUT REQUEST NOT FOUND` })
            }
        } catch (error) {
            logger.error({ message: `MOCK PUT REQUEST Failed`, context: error })
            res.json({
                success: false
            })
                .status(500)
        }
    },

}
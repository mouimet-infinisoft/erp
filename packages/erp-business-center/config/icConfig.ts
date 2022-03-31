/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 * 
 * Configuration file
 * 
 */

const appName = process.env.APP_NAME ?? 'ReplaceMe'

export default {
    /**Logger configuraiton */
    logger: {
        debug: false,
        defaultSource: appName,
        providerName: `@infinicloud`
    },
    mock: {
        /** Quantity of mocked items */
        amountItems: 100,
        /** Categories to initialize in GSI */
        GSIPKs: ["Parents", "Referents", "Enfants", "Organization"]
    },
    /** API Url fo mock, test and dev */
    environments: {
        dev: "https://6100bc10bca46600171cf987.mockapi.io/",
        test: "https://5uv18kaqpi.execute-api.us-east-1.amazonaws.com/mart",
        mock: "http://www.infini-soft.com/"
    },
    /** Configuraiton to generate routes, mocks, code gen */
    appName,
    /** Title in App.tsx page header */
    title: `Welcome to ${appName}`
};

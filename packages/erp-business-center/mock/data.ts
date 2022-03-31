/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { faker } from '@faker-js/faker';
import config from '../config/icConfig';

const PK = `Tenant${faker.unique(faker.datatype.uuid)}`

const getItem = (): API.Item => {
  return {
    PK,
    SK: `Person` + faker.unique(faker.datatype.uuid),
    GSIPK: config.mock.GSIPKs[Math.round(Math.random()*10)%(config.mock.GSIPKs.length)],
   
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    birthdate: faker.date.past().toISOString(),
    telephones: [faker.phone.phoneNumber("514-###-####")]
  }
}

const randomData: API.Item[] = []
for(let i=0; i < config.mock.amountItems; i++){
  randomData.push(getItem())
}

export default randomData
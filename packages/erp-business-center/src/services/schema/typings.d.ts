declare namespace API {
  type Response = {
    success?: boolean;
    data?: Record<string, any>;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
    keyword?: string;
  };

  type Item = {
    /** Partition Key. Ex: TENANT1334243, TENANT42543 */
    PK: string;
    /** Sort Key - Ex: PERSON12121, CASE542124 */
    SK: string;
    /** Global Secondary Index - Ex: PARENT, CASE, DOCUMENT */
    GSIPK: string;
    /** Item is enabled or disabled */
    enabled?: boolean;
    /** Item creator userid */
    USERID?: string;
    /** Item creator name */
    NAME?: string;
    /** Item creator email */
    EMAIL?: string;
    /** Item creator picture url */
    PICTURE?: string;
    /** Creation date in ISO 8601 format */
    createdAt?: string;
    /** Lasy updated date in ISO 8601 format */
    updatedAt?: string;
  } & Person;

  type Person = {
    name?: string;
    email?: string;
    address?: string;
    birthdate?: string;
    telephones?: string[];
  };

  type List = {
    data?: Item[];
    /** Item count */
    total?: number;
    success?: boolean;
  };

  type ErrorResponse = {
    /** Error code */
    errorCode: string;
    /** Error message */
    errorMessage?: string;
    /** Request success or not */
    success?: boolean;
  };

  type listParams = {
    /** Current page */
    current?: number;
    /** Items per page */
    pageSize?: number;
    /** Items per page */
    keyword?: string;
  };

  type readParams = {
    /** Partition key */
    PK: string;
    /** Sort Key */
    SK: string;
  };

  type updateParams = {
    /** Partition key */
    PK: string;
    /** Sort Key */
    SK: string;
  };
}

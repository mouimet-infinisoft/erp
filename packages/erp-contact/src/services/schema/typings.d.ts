declare namespace API {
  type Success = {
    success?: boolean;
    data?: Record<string, any>;
  };

  type Error = {
    /** Error code */
    errorCode?: string;
    /** Error message */
    errorMessage?: string;
    /** false */
    success?: boolean;
  };

  type Item = {
    /** Partition Key */
    PK?: string;
    /** Sort Key */
    SK?: string;
    /** Category - Global Secondary Index */
    GSIPK?: string;
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
    /** Relation in the graph */
    relatedWith?: string[];
  } & Contact;

  type List = {
    data?: Item[];
    /** Item count */
    total?: number;
    success?: boolean;
  };

  type Contact = {
    name?: string;
    email?: string;
    address?: string;
    website?: string;
    telephones?: string[];
  };

  type listParams = {
    /** Current page */
    current?: number;
    /** Items per page */
    pageSize?: number;
    /** Search term */
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

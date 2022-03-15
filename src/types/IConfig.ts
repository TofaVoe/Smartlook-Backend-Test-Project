interface IConfig {
    port: number | string; // String due reading from .env
    security: {
      salt: number | string;
    }
    jwt: {
      secret: string;
      expires: string;
    },
    responseMsg: {
      badpayload: string;
      statusCreated: string;
      statusUpdated: string;
      statusDeleted: string;
      databaseError: string;
      duplicity: string;
      failedToLogin: string;
      unauthorized: string;
    },
    hackernews: {
      url: {
        maxitemid: string;
        askstories: string;
        showstories: string;
        jobstories: string;
        item: string;
      }
    },
    database: { // This can be defined in ENV (from docker-compose file) - I just prefer to have it in project config file
      user: string;
      host: string;
      database: string;
      password: string;
      port: number;
  }
}

export const config: IConfig = {
  port: process.env.PORT || 3000,
  security: {
    salt: '$2a$04$7AiVQRTAEPWFwldS7CB6VuQcMSenrPlpoEEGdMyQDE8BxcxcJXPgG'
  },
  jwt: {
    secret: "C3P0",
    expires: "1 Day"
  },
  responseMsg: {
    badpayload: "Bad payload",
    statusCreated: "Created",
    statusUpdated: "Updated",
    statusDeleted: "Deleted",
    duplicity: "Duplicity",
    databaseError: "Database error",
    failedToLogin: "Failed to login",
    unauthorized: "Unauthorized"
  },
  hackernews: {
    url: {
      showstories: 'https://hacker-news.firebaseio.com/v0/showstories.json',
      maxitemid: 'https://hacker-news.firebaseio.com/v0/maxitem.json',
      askstories: 'https://hacker-news.firebaseio.com/v0/askstories.json',
      jobstories: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
      item: 'https://hacker-news.firebaseio.com/v0/item/' // ID[.json] ( All entities are items, comments are just specific type )
    }
  },
  database: {
    user: "hacker_news_stories",
    host: "postgres",
    database: "hacker_news_stories",
    password: "hacker_news_stories",
    port: 5432
  }
}


const config = {
    databaseUsername: process.env.DB_USERNAME || 'autht',
    databasePassword: process.env.DB_PASSWORD || 'secret',
    databaseHost: process.env.DB_HOST || 'localhost',
    databasePort: process.env.DB_PORT || 3306,
    databaseSchema: process.env.DB_SCHEMA || 'autht',
    
    jwtSecret: process.env.JWT_SECRET || '8eb0d940-5994-477e-beac-a189ed42f964',
    jwtExpSecs: process.env.JWT_EXP_SECS || 3600   
};

export default config;
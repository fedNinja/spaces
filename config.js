exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      (process.env.NODE_ENV === 'production' ?
                           'mongodb://<dbuser>:<dbpassword>@ds137139.mlab.com:37139/spaces' :
                           'mongodb://localhost/spaces');
exports.PORT = process.env.PORT || 8080;



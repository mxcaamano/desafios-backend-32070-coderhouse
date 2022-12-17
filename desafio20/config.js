const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs.default({port: 8080, mode: 'fork'}).alias({p: 'port', m:'mode'});

module.exports = {
    DBURL: process.env.DBURL || 'mongodb+srv://admin:admin@cluster0.dbaqnvv.mongodb.net/ecommerce?retryWrites=true&w=majority',
    SECRET: process.env.SECRET || '0303456',
    PORT: args.argv.port,
    MODE: args.argv.mode
}
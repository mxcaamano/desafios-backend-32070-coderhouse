const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs.default({port: 8080}).alias({p: 'port'});

module.exports = {
    DBURL: process.env.DBURL || 'mongodb+srv://admin:admin@cluster0.dbaqnvv.mongodb.net/desafio11?retryWrites=true&w=majority',
    SECRET: process.env.SECRET || '0303456',
    PORT: args.argv.port
}
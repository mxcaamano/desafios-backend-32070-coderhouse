const options = {
    client: 'sqlite3',
    connection: {
        filename: '../ecommerce/mydb.sqlite',
    },
    useNullAsDefault: true
}

module.exports = { options }
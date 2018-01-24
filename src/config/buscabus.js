module.exports = {
    api: process.env.BUSCABUS_API,
    user: process.env.BUSCABUS_USER,
    password: process.env.BUSCABUS_PASSWORD,
    errorMsg: process.env.BUSCABUS_ERRORMSG || 'Sistema temporariamente indisponível.'
};

import _ from "lodash";
let config = {
    avatar: [
    ],
    mysql: {
        host: 'localhost',
        dialect: 'mysql',
        databaseName: "Kblog"
    }
}
const init = () => {
    if (process.env.NODE_ENV == 'development') {
        const localConfig = {
            port: 3200,
            mosca: {
                tcpProt: 1884,
                webProt: 8084,
                maxAge: 10240
            },
            mysql: _.extend(config.mysql, {
                user: 'root',
                password: 'kirk958617'
            })
        }
        config = _.extend(config, localConfig)
    }
    if (process.env.NODE_ENV == 'testing') {
        const localConfig = {
            port: 3200,
            mosca: {
                tcpProt: 1884,
                webProt: 8084,
                maxAge: 10240
            },
            mysql: _.extend(config.mysql, {
                user: 'root',
                password: 'Root_123'
            })
        }
        config = _.extend(config, localConfig)
    }
    if (process.env.NODE_ENV == 'production') {
        const localConfig = {
            port: 3200,
            mosca: {
                tcpProt: 1884,
                webProt: 8084,
                maxAge: 10240
            },
            mysql: _.extend(config.mysql, {
                user: 'remote',
                password: '123456'
            })
        }
        config = _.extend(config, localConfig)
    }
    return config;
}
export default init();

// module.exports = {
//     db: {
//         user: 'postgres',
//         password: 'mset123',
//         database: 'parking',
//         options: {
//             host: 'localhost',
//             port:8989,
//             dialect: 'postgres',
//             operatorsAliases: false,
//             pool: {
//                 max: 5,
//                 min: 0,
//                 acquire: 30000,
//                 idle: 10000
//             },
//         }
//     },
//     port: 3002,
//     env: 'dev'
// }

module.exports = {
    db: {
        user: 'postgres',
        password: '12345678',
        database: 'parking',
        options: {
            host: 'localhost',
            port:8989,
            dialect: 'postgres',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        }
    },
    port: 3002,
    env: 'dev'
}

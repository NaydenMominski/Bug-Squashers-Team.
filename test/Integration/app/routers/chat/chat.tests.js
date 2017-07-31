const request = require('supertest');

describe('/chat tests', () => {
    const connectionString = 'mongodb://localhost/items-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
         .then(() => require('../../../../../app/db').connect(connectionString))
    .then((database) => {
        const data = require('../../../../../app/data').initData(database);
        return require('../../../../../app').initApp(data, database);
    })
    .then((_app) => {
        app = _app;
    });
    });

    describe('GET chat/user-session', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/chat/user-session')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});

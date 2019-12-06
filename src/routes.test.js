const request = require('supertest');
const app = require('./api/server').app;
const expect = require('expect.js');


it("should have string in response body with return status of 200", (done)=>{
    request(app)
    .get('/')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be.a('string');
         expect(res.body.res).to.be('Hey there, welcome to resume builder!');
    })
    .end(done);

});


it("should return 'server is up' in response body", (done)=>{
    request(app)
    .get('/test')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be('server is up!');
        expect(res.body.res).to.be.a('string');
    })
    .end(done);

});

it("should return the rows of data of specific user", (done)=>{
    request(app)
    .get('/data/fetch')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be.a(JSON);
    })
    .end(done);
});

it("should submit form and return the rows submited", (done)=>{
    request(app)
    .post('/data/form_submit')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be.a(Object);
    })
    .end(done);
});

it("should push user data into db and return success", (done)=>{
    request(app)
    .post('/auth/sign_up')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be.a('string');
    })
    .end(done);
});

it("should validate user data and return token if successful", (done)=>{
    request(app)
    .post('/auth/sigin')
    .expect(200)
    .expect((res)=>{
        expect(res.body.res).to.be.a('string');
    })
    .end(done);
}); 
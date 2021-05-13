const supertest = require("supertest");
//const should = require('should');
const assert = require("assert");
const error_code = require("../common/error_code");

let request = supertest("http://localhost:3000");
let userCookie = null;
let user = {
    gid: 104110803718816892021,
    fname: "James Liu",
    gname: "James",
    xname: "Liu",
    email: "liuhang2000@gmail.com",
    head:
        "https://lh5.googleusercontent.com/-WmSZDdMVzsg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhRt5YTKrH8CXq2eFAEeFcnis2JA/s96-c/photo.jpg",
};

// URI: /api/user/login
describe("User Login", function () {
    describe("POST /api/user/login", function () {
        // eslint-disable-next-line max-len
        it("Login success", function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
    });
});

// URI: /api/user/profile
describe("User Profile", function () {
    describe("POST /api/user/profile", function () {
        it("The current User was login.", function (done) {
            request
                .post("/api/user/profile")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

// URI: /api/user/profile
describe("User Profile", function () {
    describe("POST /api/user/profile", function () {
        it("The current User was not login.", function (done) {
            request
                .post("/api/user/profile")
                .set("Accept", "application/json")
                .expect(200)
                .end(function (err, res) {
                    // assert.equal(res.body.code, error_code.error_access.code);
                    // if (err) throw err;
                    done();
                });
        });
    });
});

// URI: /api/bike/add
describe("Add bike", function () {
    describe("POST /api/bike/add", function () {
        it("Add a bike after a user logged in.", function (done) {
            request
                .post("/api/bike/add")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                    title: "A test bike",
                    description: "Test for a bike, blabla...",
                    photos: [1, 2, 3, 4, 5],
                    location: {
                        lat: 49.13,
                        long: -123.06,
                    },
                    deposit: 200.66,
                    price: 2.19,
                })
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: /api/bike/find
describe("Find bike", function () {
    describe("POST /api/bike/find", function () {
        it("Find bikes after a user logged in.", function (done) {
            request
                .post("/api/bike/find")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                    location: {
                        lat: 49.13,
                        long: -123.06,
                    },
                    distance: 1000,
                })
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bike/list
describe("List all my bikes", function () {
    describe("POST /api/bike/list", function () {
        it("List all my bikes after a user logged in.", function (done) {
            request
                .post("/api/bike/list")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({}
                )
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bike/remove
describe("Remove my bike advertisement", function () {
    describe("POST /api/bike/remove", function () {
        it("Remove my bike advertisement after a user logged in.", function (done) {
            request
                .post("/api/bike/remove")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                        bid: 7
                    }
                )
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bike/bikeAndOwner
describe("Find bike advertisement and owner", function () {
    describe("POST /api/bike/detail", function () {
        it("Find bike advertisement and the owner after a user logged in.", function (done) {
            request
                .post("/api/bike/detail")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                        bid: 11
                    }
                )
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bookmark/add
describe("Add bookmark", function () {
    describe("POST /api/bookmark/add", function () {
        it("Add bookmark after a user logged in.", function (done) {
            request
                .post("/api/bookmark/add")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                        bid: 11
                    }
                )
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bookmark/remove
describe("Remove bookmark", function () {
    describe("POST /api/bookmark/remove", function () {
        it("Remove bookmark after a user logged in.", function (done) {
            request
                .post("/api/bookmark/remove")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({
                        bid: 11
                    }
                )
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});

//URI: api/bookmark/find
describe("Find bookmarks", function () {
    describe("POST /api/bookmark/find", function () {
        it("Find bookmarks after a user logged in.", function (done) {
            request
                .post("/api/bookmark/find")
                .set("Cookie", userCookie)
                .set("Accept", "application/json")
                .expect(200)
                .send({})
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function (done) {
            request
                .post("/api/user/login")
                .send(user)
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (!err) {
                        userCookie = res.header["set-cookie"];
                        done();
                    }
                });
        });
    });
});
const request = require('supertest');

/**
 * Sends a POST request
 * @param arg url,api,body,header
 * @returns {Promise<*>} response
 */
async function postRequest(...arg){
    return request.agent(arg[0])//URL
        .post(arg[1])//API
        .send(arg[2])//BODY
        .set(arg[3])//HEADER
        .then(function (res){
            return res;//RESPONSE
        })
        .catch(function (err){
            console.error(err.message);
            return Promise.reject(err);
        });
}

/**
 * Sends a GET request
 * @param arg url,api,header
 * @returns {Promise<*>} response
 */
async function getRequest(...arg){
    return request.agent(arg[0])//URL
        .get(arg[1])//API
        .set(arg[2])//HEADERS
        .then(function (res){
            return res;//RESPONSE
        })
        .catch(function (err){
            console.error(err.message);
            return Promise.reject(err);
        });
}

/**
 * Sends a DELETE request
 * @param arg url,api
 * @returns {Promise<*>} response
 */
async function deleteRequest(...arg) {
    return request.agent(arg[0])                  //URL
        .del(arg[1])                              //API
        .then(function (res) {
            return res;                           //RETURNS RESPONSE
        })
        .catch(function (err) {
            console.error(err.response);
            return Promise.reject(err);
        });
}

/**
 * Sends a PUT request
 * @param arg url,api,body,header
 * @returns {Promise<*>} response
 */
async function putRequest(...arg) {
    return request.agent(arg[0])                  //URL
        .put(arg[1])                              //API
        .send(arg[2])                             //BODY
        .set(arg[3])                              //HEADER
        .then(function (res) {
            return res;                           //RETURNS RESPONSE
        })
        .catch(function (err) {
            console.error(err.message);
            return Promise.reject(err);
        });
}

/**
 * Sends a PATCH request
 * @param arg url,api,body,header
 * @returns {Promise<*>} response
 */
async function patchRequest(...arg) {
    return request.agent(arg[0])                  //URL
        .patch(arg[1])                              //API
        .send(arg[2])                             //BODY
        .set(arg[3])                              //HEADER
        .then(function (res) {
            return res;                           //RETURNS RESPONSE
        })
        .catch(function (err) {
            console.error(err.message);
            return Promise.reject(err);
        });
}

/**
 * Function for generating random phone number
 * @param length
 * @returns {string}
 */
function generatePhoneNumber() {
    let result = '';
    let numbers = '0123456789';
    let numbersLength = numbers.length;
    for (let i = 0; i < 10; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return "+49"+result;
}
/**
 * Function for generating random email
 * @param {*} length 
 * @returns random email
 */
function generateEmail(length){
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';
    for(let i = 0; i < length; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
 return (string + '@mailinator.com'); 
}

/**
 * Function for generating random string
 * @param {*} length 
 * @returns random email
 */
 function generateRandomString(length){
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ';
    var string = '';
    for(let i = 0; i < length; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
return (string);
}

/**
 * Function for generating random int
 * @param min
 * @param max
 * @returns {number}
 */
function randomNumber(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function timeout(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

module.exports = {
    postRequest,
    getRequest,
    deleteRequest,
    putRequest,
    patchRequest,
    timeout,
    randomNumber,
    generateEmail,
    generateRandomString,
    generatePhoneNumber
};
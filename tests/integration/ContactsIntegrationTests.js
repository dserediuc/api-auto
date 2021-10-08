const test = require('chai').expect;
const api = require('../../support/helpers.js');
const env = require('../../config/env.js')[process.env.ENV];
const apiData = require('../../apis/contacts/ContactsAPI.json');
const testData = require('../../apis/contacts/ContactsTestData.js');

describe('Contacts Integration tests',()=>{
 
    it('Should perform an integration flow POST-GET-PUT to Create Contact', async () => {
        //performin a post request to create a contact
        let body = apiData.postContact;
        body.email = api.generateEmail(12);
        body.name = api.generateRandomString(8);
        body.identifier = api.generateRandomString(12);
        body.phone_number = api.generatePhoneNumber;
       
        let res = await api.postRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts,body,apiData.commonHeaders);

        test(await res.statusCode).to.equal(200);
        
        const id = res.body.payload.contact.id.toString();
        //Performing a GET to show contact using the last one
        let res2 = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts+`/${id}`,apiData.commonHeaders);
        test(await res2.statusCode).to.equal(200);
        var newEmail = api.generateEmail;
        body.email = newEmail;

        //Performing a PUT request to update contact
        let res3 = await api.putRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts+`/${id}`,body,apiData.commonHeaders);
        test(await res3.statusCode).to.equal(200);
    
        //Performing again a GET request
        let res4 = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts+`/${id}`,apiData.commonHeaders);
        test(await res4.statusCode).to.equal(200);
    });
});
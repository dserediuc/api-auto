const test = require('chai').expect;
const api = require('../../support/helpers.js');
const env = require('../../config/env.js')[process.env.ENV];
const apiData = require('../../apis/contacts/ContactsAPI.json');
const testData = require('../../apis/contacts/ContactsTestData.js');

describe('Contacts API tests',()=>{
    it('Should perform a POST to Create Contact', async () => {
        let body = apiData.postContact;
        body.email = api.generateEmail(12);
        body.name = api.generateRandomString(8);
        body.identifier = api.generateRandomString(12);
        body.phone_number = api.generatePhoneNumber;
       
        let res = await api.postRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts,body,apiData.commonHeaders);

        test(await res.statusCode).to.equal(200);
    });

    it('Should perform a POST to Create Contact using existing contacts details', async () => {
        
        let res = await api.postRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts,apiData.postContact,apiData.commonHeaders);
        test(await res.statusCode).to.equal(422);
        test(res.body.message).to.equal(testData.contactsTestData.EXISTING_RESOURCE);
    });

    it('Should perform a GET to List Contacts', async () => {
        let res = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts,apiData.commonHeaders);

        test(await res.statusCode).to.equal(200);
        test(res.body.meta.count).to.be.greaterThan(0);
        res.body.payload.forEach(payload => {
            test(payload).to.have.property('additional_attributes');
            test(payload).to.have.property('availability_status');
            test(payload).to.have.property('email');
            test(payload).to.have.property('id');
            test(payload).to.have.property('name');
            test(payload).to.have.property('phone_number');
            test(payload).to.have.property('identifier');
            test(payload).to.have.property('thumbnail');
            test(payload).to.have.property('custom_attributes');
            test(payload).to.have.property('contact_inboxes');
                payload.contact_inboxes.forEach(contact_inboxes =>{
                    test(contact_inboxes).to.have.property('source_id');
                    test(contact_inboxes.source_id).to.be.a('string');
                    test(contact_inboxes.source_id).not.to.be.empty;
                    test(contact_inboxes).to.have.property('inbox');
                        test(contact_inboxes.inbox).to.have.property('id');
                        test(contact_inboxes.inbox).to.have.property('channel_id');
                        test(contact_inboxes.inbox).to.have.property('name');
                        test(contact_inboxes.inbox).to.have.property('channel_type');
                        test(contact_inboxes.inbox).to.have.property('greeting_enabled');
                        test(contact_inboxes.inbox).to.have.property('greeting_message');
                        test(contact_inboxes.inbox).to.have.property('working_hours_enabled');
                        test(contact_inboxes.inbox).to.have.property('enable_email_collect');
                        test(contact_inboxes.inbox).to.have.property('csat_survey_enabled');
                        test(contact_inboxes.inbox).to.have.property('working_hours');
                            contact_inboxes.inbox.working_hours.forEach(working_hours=>{
                                test(working_hours).to.have.property('day_of_week');
                                test(working_hours).to.have.property('closed_all_day');
                                test(working_hours).to.have.property('open_hour');
                                test(working_hours).to.have.property('open_minutes');
                                test(working_hours).to.have.property('close_hour');
                                test(working_hours).to.have.property('close_minutes');

                            });
                        test(contact_inboxes.inbox).to.have.property('timezone');
                        test(contact_inboxes.inbox).to.have.property('avatar_url');
                        test(contact_inboxes.inbox).to.have.property('page_id');
                        test(contact_inboxes.inbox).to.have.property('widget_color');
                        test(contact_inboxes.inbox).to.have.property('website_url');
                        test(contact_inboxes.inbox).to.have.property('welcome_title');
                        test(contact_inboxes.inbox).to.have.property('welcome_tagline');
                        test(contact_inboxes.inbox).to.have.property('enable_auto_assignment');
                        test(contact_inboxes.inbox).to.have.property('web_widget_script');
                        test(contact_inboxes.inbox).to.have.property('website_token');
                        test(contact_inboxes.inbox).to.have.property('forward_to_email');
                        test(contact_inboxes.inbox).to.have.property('phone_number');
                        test(contact_inboxes.inbox).to.have.property('phone_number');
                        test(contact_inboxes.inbox).to.have.property('selected_feature_flags');
                        test(contact_inboxes.inbox).to.have.property('reply_time');
                        test(contact_inboxes.inbox).to.have.property('hmac_token');
                        test(contact_inboxes.inbox).to.have.property('pre_chat_form_enabled');
                        test(contact_inboxes.inbox).to.have.property('pre_chat_form_options');
                });
            });
        });

    it('Should perform a GET to List Contacts using a wrong id', async () => {
        const res = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.wrongContactId}`+apiData.apis.contacts,apiData.commonHeaders);
        test(await res.statusCode).to.equal(404);
        test(res.body.error).to.equal(testData.contactsTestData.NOT_FOUND)
        });
    
    it('Should perform a GET to Show Contacts', async () => {
        const res = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts+`/${testData.contactsTestData.contactId}`,apiData.commonHeaders);
        test(await res.statusCode).to.equal(200);
        });

    it('Should perform a GET to Show Contacts with a wrong accountId ', async () => {
            const res = await api.getRequest(env,apiData.apis.accounts+`/${testData.contactsTestData.accountId}`+apiData.apis.contacts+`/${testData.contactsTestData.wrongContactId}`,apiData.commonHeaders);
            test(await res.statusCode).to.equal(404);
            test(res.body.error).to.equal(testData.contactsTestData.NOT_FOUND)
            });

});
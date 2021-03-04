const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const client = require('@sendgrid/client');
const request = require('request');
const sendGridApi = functions.config().sendgrid.apikey;
const sendGridListId = '35367';
// const sendGridTemplateId = 'd-d43e795e078c4cd69edf69e471ded712';
const sendGridTemplateId = 'd-1fec1ae2347340a69e54b01812cfb348';
const sendGridVIPTemplateId = 'd-dc3d4d7d0d3d467286e21c7da1bc6db7';
const sendGridPressInquiryId = 'd-48530c35547f4f9eb3d38e48fff426e5';
const sendGridInvestorInquiryId = 'd-57ab6dc1b9a84b20aa2cd3a02b23d405';
const moment = require('moment');
const md5 = require('md5');
const axios = require('axios');
const fs = require('fs');

sgMail.setApiKey(sendGridApi);
client.setApiKey(sendGridApi);


let alertTrueStaff = function(email,firstName,lastName) {
  console.log('alerting True staff of new beta signup');
  const trueStaffEmailData = {
    to: 'hey@trytrue.com',
    // cc: 'pulsegrenade@gmail.com',
    from: {
      email: 'hey@trytrue.com',
      name: 'Beta Signup'
    },
    subject: 'New Beta Signup',
    text: 'New Beta Signup: ' + firstName + ', ' + lastName + ', ' + email,
    html: 'New Beta Signup: ' + firstName + ', ' + lastName + ', ' + email
  };
  sgMail.send(trueStaffEmailData);
}

let addVipStatus = function(email,firstName,lastName) {
  const vipData = [
      {
        'email': email,
        'is_vip': 'true'
      }
    ];
  let vipRequest = {};
  vipRequest.body = vipData;
  vipRequest.method = 'POST';
  vipRequest.url = '/v3/contactdb/recipients';
  client.request(vipRequest)
  .then(([response, body]) => {
      console.log(email + ' is now a VIP.');
      const trueVIPEmailData = {
        to: 'hey@trytrue.com',
        // cc: 'pulsegrenade@gmail.com',
        from: {
          email: 'hey@trytrue.com',
          name: 'Beta Signup VIP'
        },
        subject: 'A User is now a VIP',
        text: 'New VIP: ' + firstName + ', ' + lastName + ', ' + email,
        html: 'New VIP: ' + firstName + ', ' + lastName + ', ' + email
      };
      sgMail.send(trueVIPEmailData);
      // send the VIP email
      // removed as of March 2020
      // const msg = {
      //   to: email,
      //   from: 'hey@trytrue.com',
      //   templateId: sendGridVIPTemplateId,
      //   dynamic_template_data: {},
      // };

      // sgMail.send(msg);
  });
}

exports.post = functions.https.onRequest((req, res) => {
  let postId = req.query.id;
  // figure out a way to render different meta tags
  axios.get('https://public-api.wordpress.com/wp/v2/sites/pulsegrenade.wordpress.com/posts/' + postId + '?_embed')
  .then(response => {
    console.log(response.data);
    // let blogDetailData = JSON.stringify(response.data);
    // let blogDetailJSON = JSON.parse(blogDetailData);
    let blogDetailJSON = response.data;
    let htmlFile = fs.readFileSync(__dirname + '/src/page.html','utf8');
    htmlFile = htmlFile.replace('<title></title>','<title>' + blogDetailJSON.title.rendered.replace('&nbsp;',' ') + '</title>');
    htmlFile = htmlFile.replace('<meta property="og:title" content="">','<meta property="og:title" content="' + blogDetailJSON.title.rendered.replace('&nbsp;',' ') + '">');
    htmlFile = htmlFile.replace('<meta property="og:description" content="">','<meta property="og:description" content="' + blogDetailJSON.excerpt.rendered.replace(/<\/?[^>]+>/gi, '').substring(0, 140) + '...' + '">');
    htmlFile = htmlFile.replace('<meta name="description" content="">','<meta name="description" content="' + blogDetailJSON.excerpt.rendered.replace(/<\/?[^>]+>/gi, '').substring(0, 140) + '...' + '">');
    htmlFile = htmlFile.replace('<meta property="og:image" content="">','<meta property="og:image" content="' + blogDetailJSON.jetpack_featured_media_url + '">');
    res.set('Cache-Control', 'public, max-age=1800');
    res.status(200).send(htmlFile);
  })
  .catch(error => {
    console.log(error);
  });
})

exports.getWordPressPostById = functions.https.onRequest((req, httpResponse) => {
  let jsonResponse = {};
  let postId = req.query.id;
  // let wordpressUrl = 'https://public-api.wordpress.com/wp/v2/sites/' + req.query.id + '/posts/' + req.query.id;
  
  axios.get('https://public-api.wordpress.com/wp/v2/sites/trytrue.wordpress.com/posts/' + postId + '?_embed')
  .then(response => {
    console.log(response.data);
    jsonResponse = { 
      message: 'Got WordPress Post!',
      data: response.data
    }
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  })
  .catch(error => {
    console.log(error);
    jsonResponse = { 
      message: 'Error.',
      data: error
    }
    httpResponse.set('Cache-Control', 'public, max-age=1800');
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  });
});

exports.getWordPressPosts = functions.https.onRequest((req, httpResponse) => {
  let jsonResponse = {};
  // let wordpressUrl = 'https://public-api.wordpress.com/wp/v2/sites/' + req.query.siteid + '/posts/';
  
  axios.get('https://public-api.wordpress.com/wp/v2/sites/trytrue.wordpress.com/posts?_embed')
  .then(response => {
    console.log(response.data);
    jsonResponse = { 
      message: 'Got WordPress posts!',
      data: response.data
    }
    httpResponse.set('Cache-Control', 'public, max-age=1800');
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  })
  .catch(error => {
    console.log(error);
    jsonResponse = { 
      message: 'Error.',
      data: error
    }
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  });
});

exports.investorInfo = functions.https.onRequest((req, httpResponse) => {
  let emailData = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    firm: req.body.firm,
  }

  let contactData = [
    {
      'email': emailData.email,
      'first_name': emailData.first_name,
      'last_name': emailData.last_name,
      'investor_inquiry': 'true'
    }
  ];
  let request = {};
  request.body = contactData;
  request.method = 'POST';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(emailData.email + ' added to sendgrid contacts.');
    console.log('making an investor request');

    const msg = {
      to: emailData.email,
      category: 'Investor contact confirmation',
      from: {
        email: 'investors@trytrue.com',
        name: 'Investor Inquiry'
      },
      templateId: sendGridInvestorInquiryId,
      dynamic_template_data: {}
      // subject: 'Thanks for contacting True',
      // text: 'Hi, we received your message. A member of our team will reach out soon.',
      // html: 'Hi,<br>We received your message.<br>A member of our team will reach out soon.',
    };
    sgMail.send(msg);
    return emailData

  }).then((emailData) => {
    const trueEmailData = {
      to: 'investors@trytrue.com',
      cc: 'arch@quiet.ly',
      from: {
        email: 'investors@trytrue.com',
        name: 'Investor Inquiry'
      },
      subject: 'A User has Requested Investor Information',
      text: 'Hi, we received a new investor inquiry from ' + emailData.email + '. First Name: ' + emailData.first_name + ', Last Name: ' + emailData.first_name + ', Firm: ' + emailData.firm + '.',
      html: 'Hi, <br>We received a new press inquiry from ' + emailData.email + '.<br>First Name: ' + emailData.first_name + ',<br>Last Name: ' + emailData.last_name + ',<br>Firm: ' + emailData.firm + '.'
    };
    sgMail.send(trueEmailData);

    let jsonResponse = { 
      message: 'Requested Investor info!',
      data: emailData
    }
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  })

})

exports.pressKit = functions.https.onRequest((req, httpResponse) => {
  let emailData = {
    'email': req.body.email,
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'media_outlet': req.body.media_outlet,
    'comments': req.body.comments
  }

  let contactData = [
    {
      'email': emailData.email,
      'first_name': emailData.first_name,
      'last_name': emailData.last_name,
      'press_inquiry': 'true'
    }
  ];
  let request = {};
  request.body = contactData;
  request.method = 'POST';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(emailData.email + ' added to sendgrid contacts.');
    console.log('making a press kit request');

    const msg = {
      to: emailData.email,
      category: 'Press contact confirmation',
      from: {
        email: 'press@trytrue.com',
        name: 'Press Inquiry'
      },
      templateId: sendGridPressInquiryId,
      dynamic_template_data: {}
      // subject: 'Thanks for contacting True',
      // text: 'Hi, we received your message. A member of our team will reach out soon.',
      // html: 'Hi,<br>We received your message.<br>A member of our team will reach out soon.',
    };
    sgMail.send(msg);
    return emailData

  }).then((emailData) => {
    const trueEmailData = {
      to: 'press@trytrue.com',
      cc: 'arch@quiet.ly',
      from: {
        email: 'press@trytrue.com',
        name: 'Press Inquiry'
      },
      subject: 'A User has Requested a Press Kit',
      text: 'Hi, we received a new press inquiry from ' + emailData.email + '. First Name: ' + emailData.first_name + ', Last Name: ' + emailData.first_name + ', Media Outlet: ' + emailData.media_outlet + ', Comments: ' + emailData.comments + '.',
      html: 'Hi, <br>We received a new press inquiry from ' + emailData.email + '.<br>First Name: ' + emailData.first_name + ',<br>Last Name: ' + emailData.last_name + ',<br>Media Outlet: ' + emailData.media_outlet + ',<br>Comments: ' + emailData.comments + '.'
    };
    sgMail.send(trueEmailData);

    let jsonResponse = { 
      message: 'Requested Press kit!',
      data: emailData
    }
    httpResponse.set('Access-Control-Allow-Origin', '*');
    httpResponse.json(jsonResponse);
  })
})

exports.waitlist = functions.https.onRequest((req, httpResponse) => {
    const userEmail = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    let referrerCode = req.body.referrer_code || '';
    let inviteCode = md5(userEmail);
    let recipientId;

    const data = [
        {
          'email': userEmail,
          'invite_code': inviteCode,
          'first_name': firstName,
          'last_name': lastName,
          'referrer_code': referrerCode
        }
      ];
    let request = {};
    request.body = data;
    request.method = 'POST';
    request.url = '/v3/contactdb/recipients';
    client.request(request)
    .then(([response, body]) => {
        console.log(userEmail + ' added to sendgrid contacts.');
        console.log('with the first_name of '+ firstName);
        console.log('with the last_name of '+ lastName);
        console.log('with the referrer_code '+ referrerCode);
        console.log('and the invite code '+ inviteCode);

        recipientId = response.body.persisted_recipients[0];
        let listRequest = {};
        listRequest.method = 'POST';
        listRequest.url = '/v3/contactdb/lists/'+sendGridListId+'/recipients/'+recipientId;
        client.request(listRequest)
        .then(([response, body]) => {
          console.log(userEmail + ' added to list.');
          // check if anyone in the list has a referrerID that matches inviteCode.

          getFieldsRequest = {};
          getFieldsRequest.method = 'GET';
          getFieldsRequest.url = '/v3/contactdb/lists/'+sendGridListId+'/recipients';
          let vipCount = 0;
          let isAlreadyVip = false;
          let vipEmail;
          let vipFirstName;
          let vipLastName;
          client.request(getFieldsRequest)
          .then(([response, body]) => {
            body.recipients.forEach(function(recip) {
                recip.custom_fields.forEach(function(fields) {
                    if (fields.name === 'referrer_code') {
                      if (fields.value === referrerCode) {
                          vipCount++;
                      }
                    }
                    if (fields.name === 'invite_code') {
                        if (fields.value === referrerCode) {
                          console.log('invite_code is from '+ recip.email)
                          // TODO: check if user is already a VIP
                          recip.custom_fields.forEach(function(vipFields) {
                            if (vipFields.name === 'is_vip' && vipFields.value === 'true') {
                              isAlreadyVip = true;
                            }
                          })
                          vipEmail = recip.email;
                          vipFirstName = recip.first_name;
                          vipLastName = recip.last_name;
                        }
                    }
                })
            })
            console.log('VIP count is '+vipCount);
            if (vipCount > 2 && !isAlreadyVip) {
              // should only do this if they aren't already a vip
              addVipStatus(vipEmail,vipFirstName,vipLastName);
            } 
          })

          const msg = {
            to: userEmail,
            category: 'Insiders thread - Website sign up confirmation (1)',
            from: 'hey@trytrue.com',
            templateId: sendGridTemplateId,
            dynamic_template_data: {
              email: userEmail,
              first_name: firstName,
              last_name: lastName,
              invite_code: inviteCode
            },
            sendAt: moment().add(1,'hours').unix()
          };

          sgMail.send(msg);
          alertTrueStaff(userEmail,firstName,lastName)
          let jsonResponse = { 
            message: 'Added to waitlist!',
            inviteCode: '?inviteCode='+inviteCode
          }
          httpResponse.set('Access-Control-Allow-Origin', '*');
          httpResponse.json(jsonResponse);
          //response.send('Added to waitlist!');
        })
    })
});


exports.newWaitlist = functions.https.onRequest((req, httpResponse) => {
    const userEmail = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    let payload = {
        "list_ids": [
          listId
        ],
        "contacts": [
          {
            "email": userEmail,
            "first_name": firstName,
            "last_name": lastName,
            "custom_fields": {}
          }
        ]
    }

    let options = {
        headers: {
            'Authorization': 'Bearer ' + sendGridApi,
            'Content-Type': 'application/json'
        }
    };

    const contactListUrl = 'https://api.sendgrid.com/v3/marketing/contacts';

    axios.put(contactListUrl, payload, options)
        .then((response) => {
            console.log('SUCCESS');
            console.log(response.data);
            let jsonResponse = { 
                message: 'Added to waitlist!',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: userEmail
                }
            }
            httpResponse.set('Access-Control-Allow-Origin', '*');
            httpResponse.json(jsonResponse);
        }, (error) => {
            console.log('FAIL');
            console.log(error.response.data.errors);
            httpResponse.set('Access-Control-Allow-Origin', '*');
            httpResponse.json(error.response.data.errors);
        });
});
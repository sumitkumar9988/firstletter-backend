const catchAsync = require('./../utils/catchAsync');
const sgMail = require('@sendgrid/mail');
const axios=require('axios');
const request = require("request");

sgMail.setApiKey('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');
const sendEmail = async () => {
  // 1) Create a transporter
  const msg = {
    to: 'sumitranga50@gmail.com', // Change to your recipient
    from: 'sumit@firstletter.tech', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };;
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');;
    })
    .catch((error) => {
      console.error(error);;
    });;
};

exports.testEmailWorking = catchAsync(async (req, res, next) => {
  try {
   
    await sendEmail();


  var options = {
    method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers: {
      'content-type': 'application/json',
      authorization:
        'Bearer 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',
    },
    body: {
      list_ids: ['956575b3-93e1-4b79-b0f4-bafeb6af003f'],
      contacts: [
        {
          email: 'sumi9998@gmail.com',
          first_name: 'sumit',
          last_name: 'kumar',
        },
        {
          email: 'sumi99@gmail.com',
          first_name: 'sumit',
          last_name: 'kumar',
        },
      ],
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    // console.log(body);
  });





    res.status(200).json({
      status: 'success',

    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({ status: 'error', error });
  }
});

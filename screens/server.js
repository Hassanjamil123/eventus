const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Your database setup and user schema would go here.

// POST /reset-password: Initiates the password reset process
app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  // Implement validation to check if the email exists in the database.
  // If the email is valid, generate a reset token and store it in the user's record.

  // For simplicity, we'll generate a random reset token using Node.js crypto library.
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Save the resetToken in the user's record in the database.

  // Send the password reset email.
  const resetLink = `https://shop-8fe7c-default-rtdb.firebaseio.com/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    // Configure the email service (e.g., Gmail, SendGrid) here.
    // Example for Gmail:
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `
      <p>Click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to send reset email.' });
    } else {
      console.log('Reset email sent: ' + info.response);
      res.json({ message: 'Reset email sent successfully.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
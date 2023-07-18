import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Auth doesn't like process.env
const user = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: password,
  },
});

// Function to send the email
const sendEmailToUser = async (email) => {
  try {
    // Define the email options
    const mailOptions = {
      from: user,
      to: email, // Uses the user's email from the database
      subject: "Welcome to the Plantastic Fam",
      text: "Thanks for creating an account at Plantastic.",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

export default sendEmailToUser;

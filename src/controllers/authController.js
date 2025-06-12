const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS
  }
});

const users = []; // Simulating DB

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email.endsWith('@sust.edu')) {
    return res.status(400).json({ error: 'Only SUST emails allowed' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  users.push({ email, password: hashed, verified: false });

  const link = `${process.env.BASE_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    to: email,
    from: 'verify@sustcse.com',
    subject: 'Verify your SUST email',
    html: `<p>Click <a href="${link}">here</a> to verify your email</p>`
  });

  res.status(200).json({ message: 'Verification email sent' });
};

exports.verifyEmail = (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.email === decoded.email);
    if (user) {
      user.verified = true;
      return res.status(200).send('Email verified! You can now log in.');
    }
    return res.status(400).send('Invalid token');
  } catch (err) {
    return res.status(400).send('Verification failed');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send('User not found');
  if (!user.verified) return res.status(403).send('Email not verified');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Wrong password');
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
}; 
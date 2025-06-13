"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.verifyEmail = verifyEmail;
exports.login = login;

var _client = require("@prisma/client");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();

var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
});

function register(req) {
  var _ref, email, password, existingUser, hashedPassword, token, link;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          _ref = _context.sent;
          email = _ref.email;
          password = _ref.password;
          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              email: email
            }
          }));

        case 8:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", new Response(JSON.stringify({
            error: 'User already exists'
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 13:
          hashedPassword = _context.sent;
          token = _jsonwebtoken["default"].sign({
            email: email
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          }); // Save to DB

          _context.next = 17;
          return regeneratorRuntime.awrap(prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
              verified: false
            }
          }));

        case 17:
          link = "".concat(process.env.BASE_URL, "/verify-email?token=").concat(token);
          _context.next = 20;
          return regeneratorRuntime.awrap(transporter.sendMail({
            to: email,
            from: 'verify@sustcse.com',
            subject: 'Verify your SUST email',
            html: "<p>Click <a href=\"".concat(link, "\">here</a> to verify your email</p>")
          }));

        case 20:
          return _context.abrupt("return", new Response(JSON.stringify({
            message: 'Verification email sent'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.error('Registration error:', _context.t0);
          return _context.abrupt("return", new Response(JSON.stringify({
            error: 'Registration failed'
          }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

function verifyEmail(req) {
  var _ref2, searchParams, token, decoded, user;

  return regeneratorRuntime.async(function verifyEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _ref2 = new URL(req.url), searchParams = _ref2.searchParams;
          token = searchParams.get('token');

          if (token) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", new Response(JSON.stringify({
            error: 'Token is required'
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 5:
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          _context2.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              email: decoded.email
            }
          }));

        case 8:
          user = _context2.sent;

          if (user) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", new Response(JSON.stringify({
            error: 'User not found'
          }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(prisma.user.update({
            where: {
              email: decoded.email
            },
            data: {
              verified: true
            }
          }));

        case 13:
          return _context2.abrupt("return", new Response(JSON.stringify({
            message: 'Email verified successfully'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error('Verification error:', _context2.t0);
          return _context2.abrupt("return", new Response(JSON.stringify({
            error: 'Verification failed'
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function login(req) {
  var _ref3, email, password, user, match, token;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          _ref3 = _context3.sent;
          email = _ref3.email;
          password = _ref3.password;
          _context3.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              email: email
            }
          }));

        case 8:
          user = _context3.sent;

          if (user) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", new Response(JSON.stringify({
            error: 'User not found'
          }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 11:
          if (user.verified) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", new Response(JSON.stringify({
            error: 'Email not verified'
          }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 15:
          match = _context3.sent;

          if (match) {
            _context3.next = 18;
            break;
          }

          return _context3.abrupt("return", new Response(JSON.stringify({
            error: 'Wrong password'
          }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 18:
          token = _jsonwebtoken["default"].sign({
            email: email
          }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          });
          return _context3.abrupt("return", new Response(JSON.stringify({
            token: token
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error('Login error:', _context3.t0);
          return _context3.abrupt("return", new Response(JSON.stringify({
            error: 'Login failed'
          }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
}
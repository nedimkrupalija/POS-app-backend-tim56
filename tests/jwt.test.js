const jwt = require('jsonwebtoken');
const generateJwtToken = require('../controllers/jwtController');
const verifyJWT = require('../middleware/authMiddleware');

const JWT_SECRET = require('../constants.js').JWT_SECRET

describe('JWT Authentication and Authorization Middleware', () => {

    it('should generate a valid JWT token', () => {
        const user = { role: 'admin', username: 'testuser' };
        const token = generateJwtToken(user);
        const decoded = jwt.verify(token, JWT_SECRET);
        expect(decoded.role).toBe('admin');
        expect(decoded.username).toBe('testuser');
    });

    it('should authorize valid JWT token', () => {
        const user = { role: 'admin', username: 'testuser' };
        const token = jwt.sign(user, JWT_SECRET);
        const req = { headers: { authorization: token } }; 

            const res = {
                status: jest.fn(() => res), 
                json: jest.fn() 
            };

            const next = jest.fn(); 
            verifyJWT(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.userData.role).toBe('admin');
        expect(req.userData.username).toBe('testuser');
    });

    it('should return 401 for invalid JWT token', () => {

        const token = 'invalid_token';
        const req = { headers: { authorization: token } }; 
        const res = { status: jest.fn(() => res), json: jest.fn() }; 
        const next = jest.fn(); 

            verifyJWT(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth failed' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should authorize valid JWT token for role "user"', () => {
        const user = { role: 'user', username: 'testuser' };
        const token = jwt.sign(user, JWT_SECRET);
        const req = { headers: { authorization: token } }; 

        const res = {
            status: jest.fn(() => res), 
            json: jest.fn() 
        };

        const next = jest.fn(); 
        verifyJWT(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.userData.role).toBe('user');
        expect(req.userData.username).toBe('testuser');
    });

    it('should return 401 for missing JWT token', () => {
        const req = { headers: {} };
        const res = { status: jest.fn(() => res), json: jest.fn() }; 
        const next = jest.fn(); 

        verifyJWT(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth failed' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 for expired JWT token', () => {
        const user = { role: 'admin', username: 'testuser' };
        const expiredToken = jwt.sign(user, JWT_SECRET, { expiresIn: '-1s' });
        const req = { headers: { authorization: expiredToken } };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn() 
        };

        const next = jest.fn();

        verifyJWT(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth failed' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 for JWT token with modified payload', () => {
        const user = { role: 'admin', username: 'testuser' };
        const token = jwt.sign(user, JWT_SECRET);
        const modifiedToken = token.replace(/(.*)\.(.*)\.(.*)/, `$1.$2.${Buffer.from('modified').toString('base64')}`);

        const req = { headers: { authorization: modifiedToken } }; 

        const res = {
            status: jest.fn(() => res), 
            json: jest.fn() 
        };

        const next = jest.fn(); 
        verifyJWT(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth failed' });
        expect(next).not.toHaveBeenCalled();
    });

});
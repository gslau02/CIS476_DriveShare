class SessionManager {
    constructor() {
      this.sessions = {};
    }
  
    static getInstance() {
      if (!SessionManager.instance) {
        SessionManager.instance = new SessionManager();
      }
      return SessionManager.instance;
    }
  
    createSession(userId) {
      const sessionToken = generateSessionToken();
      const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      this.sessions[sessionToken] = { userId, expireDate };
      return sessionToken;
    }
  
    getSession(sessionToken) {
      return this.sessions[sessionToken];
    }
  
    deleteSession(sessionToken) {
      delete this.sessions[sessionToken];
    }
}
  
function generateSessionToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 64;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        token += chars[randomIndex];
    }

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    token += timestamp.toString();

    return token;
}
  
module.exports = SessionManager;
  
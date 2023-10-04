class Auth {
    constructor() {
        this.authenticated = false;
        this.isAdmin = false;
    }
    login(cb) {
        this.isAdmin = true;
        this.authenticated = true;
        cb();
    }
    loginUser(cb) {
        this.isAdmin = false
        this.authenticated = true;
        cb();
    }
    logout(cb) {
        this.isAdmin = false;
        this.authenticated = false;
        window.location.reload();
        cb();
    }
    isAuthenticated() {
        return this.authenticated;
    }
    isAdmin() {
        return this.isAdmin;
    }
}

export default new Auth();
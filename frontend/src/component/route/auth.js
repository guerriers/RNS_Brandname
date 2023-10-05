class Auth {
    constructor() {
        this.authenticated = false;
        this.admin = false; 
    }

    login(cb) {
        this.admin = true; 
        this.authenticated = true;
        cb();
    }

    loginUser(cb) {
        this.admin = false;
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.admin = false;
        this.authenticated = false;
        window.location.reload();
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    isAdminUser() {
        return this.admin;
    }
}

export default new Auth();
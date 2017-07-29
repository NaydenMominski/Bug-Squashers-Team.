class ControllersFactory {
    constructor(controllers, data) {
        this.controllers = controllers;
        this.data = data;
    }

    getAuthController() {
        return new this.controllers.AuthController(this.data);
    }

    getChatController() {
        return new this.controllers.ChatController(this.data);
    }

    getSellsController() {
        return new this.controllers.SellsController(this.data);
    }

    getRentsController() {
        return new this.controllers.RentsController(this.data);
    }

    getUserController() {
        return new this.controllers.UserController(this.data);
    }

    getHomeController() {
        return new this.controllers.HomeController(this.data);
    }
}

module.exports = { ControllersFactory };

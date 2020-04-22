

class Player {
    constructor(user, team) {
        this.user = user;
        this.team = team;
    }

    toString() {
        return this.user;
    }
    
}

module.exports = Player;
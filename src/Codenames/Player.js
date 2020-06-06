

class Player {
    constructor(user, team) {
        this.user = user;
        this.team = team;
    }

    toString() {
        return `<@${this.user.id}`;
    }
    
}

module.exports = Player;


class Cooldowns {
    constructor(maximum) {
        this.max = maximum;
        this.obj = {};
        this.muted = {};
    }

    register(user, expiresIn) {
        if (!this.obj[user.id]) this.obj[user.id] = 1;
        else this.obj[user.id]++;
        if (this.obj[user.id] >= this.max) return true;
        setTimeout(() => {
            delete this.obj[user.id];
            delete this.muted[user.id];
        }, expiresIn);
        return false;
    }

    mute(userId) {
        this.muted[userId] = true;
    }

    isMuted(userId) {
        return this.muted[userId];
    }

}

module.exports = Cooldowns;
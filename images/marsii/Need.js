class need {
    constructor(listenfor1, listenfor2, thing, nextstate, endstate) {
        this.listenfor1;
        this.listenfor2;
        this.thing;
        this.nextstate;
        this.endstate;

    }

    update(listenfor1) {
        this.thing = this.nextstate;

    }

    update(listenfor2) {
        this.thing = this.endstate;

    }
}

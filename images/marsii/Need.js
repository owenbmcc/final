class need {
    constructor(listenfor1, listenfor2, thing, nextstate, endstate) {
        this.listenfor1;
        this.listenfor2;
        this.thing;
        this.nextstate;
        this.endstate;

    }

    firstupdate(listenfor1) {
        this.thing = this.nextstate;

    }

    secondupdate(listenfor2) {
        this.thing = this.endstate;

    }
}

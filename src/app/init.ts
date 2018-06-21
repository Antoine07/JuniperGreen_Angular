export const Max = 100;

export class User {
    private _pseudo: string;
    private _score: number;
    private _choices: Array<any> = [];
    private _status: number = 0;

    private _uid: number;

    public constructor(user: UserJSON) {
        this._pseudo = user.pseudo;
        this._score = user.score;
        this._choices = user.choices;
        this._status = user.status;
    }

    set choice(choice: number) { this._choices.push(choice); }
    set pseudo(pseudo: string) { this._pseudo = pseudo; }
    set score(score: number) { this._score = score; }
    set status(status: number) { this._status = status; }

    get pseudo() { return this._pseudo; }
    get score() { return this._score; }
    get choice() { return this._choices[this._choices.length - 1]; }
    get status() { return this._status; }

    choices(): Array<number> { return this._choices; }

    // uid firebase
    get uid() { return this._uid; }
    set uid(uid: number) { this._uid = uid; }
}

export class UserJSON {
    pseudo: string;
    score: number;
    choices: Array<number>;
    status: number;
}

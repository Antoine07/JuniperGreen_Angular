export const Max = 100;

export class User {
    private _name: string;
    private _score: number;
    private _choices: Array<any> = [];
    private _status: number = 0;
    private _created: string;
    private _avatar: string;

    private _key: number | string;

    public constructor(user: UserJSON) {
        this._name = user.name;
        this._score = user.score;
        this._choices = user.choices;
        this._avatar = user.avatar;
        this._created = user.created;
        this._status = user.status;
        this._key = user.key;
    }

    set choice(choice: number) { this._choices.push(choice); }
    set name(name: string) { this._name = name; }
    set score(score: number) { this._score = score; }
    set status(status: number) { this._status = status; }
    set created(created: string) { this._created = created; }
    set avatar(created: string) { this._created = created; }

    get name() { return this._name; }
    get score() { return this._score; }
    get choice() { return this._choices[this._choices.length - 1]; }
    get status() { return this._status; }
    get created() { return this._created; }
    get avatar() { return this._avatar; }

    choices(): Array<number> { return this._choices; }

    // key firebase
    get key() { return this._key; }
    set key(key: string) { this._key = key; }
}

export class UserJSON {
    name: string;
    score: number;
    choices: Array<number>;
    status: number;
    created: string;
    avatar: string;
    key: number;
}

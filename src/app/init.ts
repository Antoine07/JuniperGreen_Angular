export const Max = 100;

export enum Status { Win, Loose }

export class User {
    private _name: string;
    private _score: number;
    private _choice: number;
    private _status: Status | string;

    private _choices: Array<number> = [];

    public constructor(name: string, score: number = 0, status: Status | string = Status.Loose) {
        this._name = name;
        this._status = status;
        this._score = score;
    }

    set choice(choice: number) { this._choices.push(choice); }
    set name(name: string) { this._name = name; }
    set status(status: Status | string) { this._status = status; }
    set score(score: number) { this._score = score; }

    get name() { return this._name; }
    get status() { return this._status; }
    get score() { return this._score; }

    get choice() { return this._choices[this._choices.length - 1]; }

    choices(): Array<number> { return this._choices; }

}
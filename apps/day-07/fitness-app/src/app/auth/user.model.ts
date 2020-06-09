export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  get token() {
    const currentTime = Date.now();
    const expirationTime = this._tokenExpirationDate.getTime();

    const token = currentTime > expirationTime ? null : this._token;
    return token;
  }
}

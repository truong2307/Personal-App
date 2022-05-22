export class validatePassword {
  public static get PATTERN_PASSWORD():string { return "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#&()\-/$=<>?])[a-zA-Z0-9!@#&()\-/$=<>?]+$"; }
}

export class validatePassword {
  public static get PATTERN_PASSWORD():string { return "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&`])[A-Za-z\d$@$!%*?&].{4,}"; }
}

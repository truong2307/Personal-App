export { }
declare global {
    export interface String {
      stringFormat(this: string, ...args: any[]): string;
    }
}

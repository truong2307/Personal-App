export { }
String.prototype.stringFormat = function (this: string, ...args: any[]){
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
});
}

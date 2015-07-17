interface AnyObject {
  [index: string]: any;
}

export = (base : AnyObject, extension : AnyObject) : AnyObject => {
  let merged : AnyObject = {};
  let appender = (key : string) => { merged[key] = this[key] };
  [base, extension].forEach((context) => {
    Object.getOwnPropertyNames(context).forEach(appender, context);
  });
  return merged;
};

export default class ObjectUtil {
  static cleanObjectValue(values) {
    const objResult = {};

    Object.keys(values).forEach(objKey => {
      if (values[objKey]) {
        objResult[objKey] = values[objKey];
      }
    });

    return objResult;
  }
}

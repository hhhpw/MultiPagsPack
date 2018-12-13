export const toQueryString = (obj)  => {
	var ret = [];
	for (var key in obj) {
		key = encodeURIComponent(key);
		var values = obj[key];
		if (values && values.constructor == Array) { //数组
			var queryValues = [];
			for (var i = 0, len = values.length, value; i < len; i++) {
				value = values[i];
				queryValues.push(toQueryPair(key, value));
			}
			ret = ret.concat(queryValues);
		} else { //字符串
			ret.push(toQueryPair(key, values));
		}
    }
}
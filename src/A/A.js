// const a = [1,2,3].map(d => d + 1);
// console.log(a);
import $ from "jquery";
// import
import "../../mock";


// import '../lib/api'
let a = 10;
console.log("fff", a);

let v = Symbol("v");
console.log(v.toString());
// $.ajax({
//     method: 'GET',
//     url: '/mock/test',
//     success: function(res) {
//         console.log('res', res);
//     }
// });


// $.ajax({
//     method: 'GET',
//     url: '/mock/A',
//     success: function(res) {
//         console.log('res', res);
//     }
// })

// const params = { 'name': 'leo' };
// $.ajax({
//     method: 'POST',
//     url: '/mock/B',
//     data: JSON.stringify(params),
//     contentType:"application/json",
//     dataType:"json",
//     success: function(res) {
//         console.log('res', res);
//     }
// })

// $.ajax({
//     method: 'GET',
//     url: '/mock/C',
//     success: function(res) {
//         console.log('res', res);
//     }
// })

$.ajax({
	method: "GET",
	url: "/mock/D",
	success: function (res) {
		console.log("res", res); // url
		$("body").append("<img src=" + res + " />");
	}
});

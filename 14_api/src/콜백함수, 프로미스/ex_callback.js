// function increase(number, callback) {
//     setTimeout(() => {
//         const result = number + 10;
//         if(callback) {
//             callback(result);
//         }
//     }, 1000);
// }

// increase(0, result => {
//     console.log(result);
// })

// 1초에 걸려서 10, 20, 30, 40과 같은 형태로 여러 번 순차적으로 치러하고싶으면 콜백함수로  구현 할 수 있다.

function increase(number, callback) {
    setTimeout(() => {
        const result = number + 10;
        if(callback) {
            callback(result);
        }
    }, 1000);
}

console.log("작업 시작");
increase(0, result => {
	console.log(result);
	increase(result, result => {
		console.log(result);
		increase(result, result => {
			console.log(result);
			console.log("작업 완료");
		});
	});
});

console.log("이건 비동기식")


//작업시작
//이동 비동기식
//10
//20
//30
//작업종료
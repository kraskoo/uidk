const maxIndexOneLength = 99;
const maxIndexTwoLength = 8;
let indexOne = 10;
let indexTwo = 1;

if (!Number.prototype.toHex) {
	Number.prototype.toHex = function() {
		return this.toString(16);
	}
}

function incrementIndexOne() {
	indexOne = (indexOne + 1) % maxIndexOneLength;
}

function incrementIndexTwo() {
	indexTwo = (indexTwo + 1) % maxIndexTwoLength;
}

function getId() {
	let time = Date.now();
	time = '' + indexTwo + (parseInt(time) - indexOne) + indexOne;
	incrementIndexOne();
	incrementIndexTwo();
	return parseInt(time).toHex();
}

module.exports = getId;
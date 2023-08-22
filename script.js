const wrapper = document.querySelector(".wrapper"),
	qrInput = wrapper.querySelector(".form input"),
	generateBtn = wrapper.querySelector(".form button"),
	downloadBtn = wrapper.querySelector(".download-btn"),
	downloadLink = wrapper.querySelector(".download-link"),
	qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
	let qrValue = qrInput.value;
	if (!qrValue) return;
    generateBtn.innerText = "Generating QR...";
	qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
	qrImg.addEventListener("load", () => {
		wrapper.classList.add("active");
		downloadBtn.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
	});
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active");
		downloadBtn.classList.remove("active");
    }
})

downloadBtn.addEventListener("click", () => {
	let imgSrc = qrImg.getAttribute("src");
	downloadLink.download = "QR Code";
	downloadLink.href = imgSrc;
	downloadLink.click();
})
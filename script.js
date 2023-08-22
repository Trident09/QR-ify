const wrapper = document.querySelector(".wrapper"),
	qrInput = wrapper.querySelector(".form input"),
	generateBtn = wrapper.querySelector(".form button"),
	downloadBtn = wrapper.querySelector(".download-btn"),
	downloadLink = wrapper.querySelector(".download-link"),
	qrImg = wrapper.querySelector(".qr-code img");

function generateQRCode() {
    let qrValue = qrInput.value;
	if (!qrValue) return;
    generateBtn.innerText = "Generating QR...";
	qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
	qrImg.addEventListener("load", () => {
		wrapper.classList.add("active");
		downloadBtn.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
	});
}

generateBtn.addEventListener("click", generateQRCode);

generateBtn.addEventListener("submit", generateQRCode);

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active");
		downloadBtn.classList.remove("active");
    }
})

downloadLink.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrInput.value}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const downloadTempLink = document.createElement("a");
        downloadTempLink.href = blobUrl;
        downloadTempLink.download = "QR_Code.png";
        downloadTempLink.click();
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading QR code:", error);
    }
});
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

downloadLink.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default link behavior

    try {
        // Fetch the QR code image using the provided URL
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrInput.value}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary link element for downloading
        const downloadTempLink = document.createElement("a");
        downloadTempLink.href = blobUrl;
        downloadTempLink.download = "QR_Code.png";

        // Programmatically click the temporary link to initiate download
        downloadTempLink.click();

        // Clean up by revoking the Blob URL
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading QR code:", error);
    }
});
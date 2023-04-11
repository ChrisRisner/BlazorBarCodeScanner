async function InitBarcodeScan(dotnetHelper) {
    console.log("init barcode scanner");


    const barcodeDetector = new BarcodeDetector();
    const list = document.getElementById("barcode-list");
    let itemsFound = [];
    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    });

    //const video = document.createElement("video");
    const video = document.getElementById("vidBarCodeScanner");
    video.srcObject = mediaStream;
    video.autoplay = true;

    //list.before(video);

    //Test to make sure we can call a .NET method.
    //dotnetHelper.invokeMethodAsync("OnDetected", "123456680u0");

    function render() {
        barcodeDetector
        .detect(video)
        .then((barcodes) => {
            barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
                itemsFound.push(barcode.rawValue);
                const li = document.createElement("li");
                li.innerHTML = barcode.rawValue;
                list.appendChild(li);

                // Pass to a .NET method.
                dotnetHelper.invokeMethodAsync("OnDetected", barcode.rawValue); 
            }
            });
        })
        .catch(console.error);
    }

    (function renderLoop() {
        requestAnimationFrame(renderLoop);
        render();
    })();

}
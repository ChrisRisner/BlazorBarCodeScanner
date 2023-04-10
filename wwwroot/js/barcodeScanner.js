function InitBarcodeScanner(dotnetHelper) {

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#barcodeScannerElement') 
        },
        decoder: {
            // This is the type of barcode we are scanning. 
            // For barcodes other than books/ ISBNs, change this value.
            readers: ["upc_e_reader", ]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // When a barcode is detected...
    Quagga.onDetected(function (result) { 

        console.log("Barcode detected");
        // Obtain ISBN.
        var code = result.codeResult.code; 
        

        // Pass to a .NET method.
        dotnetHelper.invokeMethodAsync("OnDetected", code); 

        Quagga.stop();
    });

}
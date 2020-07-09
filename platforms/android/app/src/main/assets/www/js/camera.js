/**
 * File Name: camera.js
 *
 * Revision History:
 *       Yunice Kim, 2020-04-15 : Created
 */
function capturePhoto() {
    var options = {
        quality: 50,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true
    };

    function onSuccess(imageData) {
        var image = $("#imgRegister");
        image.prop("src", "data:image/jpeg;base64," + imageData);

        localStorage.setItem("toyImage", imageData);
    }

    function onFail(error) {
        alert("Failed because : " + error.message);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}

// File name : facade.js
// Program : PROG2430 Final Project
// Purpose : to declare functions related to business logic
// Revision History :
//     Abdel Olayyan & Yunice Kim, Apr 14, 2020 : Created


function changeRenterEmail() {
    var email = $("#changeRenter").val();
    alert("renter email changed");
    initializeChangeRenter();
    localStorage.setItem("renterEmail", email);
}

function initializeChangeRenter(){
    $("#changeRenter").val("");
}

function registerToy(){
    if(doValidate_FormRegister()){
        console.info("RegisterForm is valid");
        //console.info("registerRenter");
        var name= $("#name").val();
        var condition= $("#cmbCondition").val();
        var description= $("#description").val();
        var email = localStorage.getItem("renterEmail");
        var picture= localStorage.getItem("toyImage");
        var options = [ name, description, picture, condition, email ];

        function callback(){
            alert("Registered successfully");
        }

        Toys.Insert(options, callback);
        initializeRegisterForm();

        $(location).prop("href", "#pageList");
    }
    else{
        console.error("RegisterForm is invalid");
    }
}

function registerRenter(){
    if(doValidate_FormJoin()){
        console.info("JoinForm is valid");

        var email= $("#emailForJoin").val();
        var name= $("#nameForJoin").val();
        var address= $("#addressForJoin").val();
        var city= $("#cityForJoin").val();
        var province = $("#cmbProvinceForJoin").val();
        var postalCode = $("#postalCodeForJoin").val();
        var phone = $("#phoneForJoin").val();

        var options = [ email, name, address, city, province, postalCode, phone ];

        function callback(){
            alert("Record added successfully");
        }

        Family.Insert(options, callback);
        initializeJoinForm();
    }
    else{
        console.error("AddForm is invalid");
    }
}

function deleteSharing(){
        var sharingId= $("#sharingId").val();
        var options = [ sharingId ];

        function callback(){
            alert("deleted successfully");
        }
        Toys.Delete(options, callback);
}

function addRent(){
    if(doValidate_FormDetail()){
        console.info("JoinForm is valid");

        var renterEmail= localStorage.getItem("renterEmail");
        var toyId= localStorage.getItem("toyId");
        var registerEmail = "";

        var options = [ toyId ];

        function callback(tx, results){
            var row = results.rows.item(0);
            registerEmail = row['registerEmail'];

            if(renterEmail === registerEmail){
                alert("Owner can't rent own toy");
                $("#rentDate").val(0);
                $("#returnDate").val(0);
            }
            else{
                var rentDate = $("#rentDate").val();
                var returnDate = $("#returnDate").val();
                var isRent = 1;
                options = [ renterEmail, toyId, rentDate, returnDate, isRent ];

                function callback(){
                    alert("Rented successfully");
                }
                Sharing.Insert(options, callback);
            }
            $(location).prop("href", "#pageList");
        }

        Toys.SelectOwner(options, callback);
    }
    else{
        console.error("AddForm is invalid");
    }
}

function goPageList() {
    $(location).prop("href", "#pageList");
}

function goPageRentList() {
    $(location).prop("href", "#pageRent");
}

function getAvailableToys() {
    var options = [];
    function callback(tx, results){

        var htmlCode = "";
        var toyName ="";
        var registerEmail = "";
        for(var i=0; i< results.rows.length; i++){
            var row = results.rows.item(i);

            toyName = row['toyName'];
            registerEmail = row['registerEmail'];

            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + row['toyId'] + " href='#'>" +
                "<img src = \"data:image/jpeg;base64," + row['picture']+"\" alt='toyPic'>" +
                "<h1>Name: " + row['toyName'] + "</h1>" +
                "<p>Description: " + row['description'] + "</p>" +
                "<p>Condition: " + row['conditionLevel'] + "</p>" +
                "</a></li>";
        }
        var lv = $("#lvAvailableToys");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lvAvailableToys a").on("click", clickHandler);
        function clickHandler() {
            var toyId= $(this).attr("data-row-id");
            localStorage.setItem("toyId", toyId);
            $(location).prop("href", "#pageToyDetail");
        }
    }

    Toys.SelectAvailableAll(options, callback);
    $("#picturesInList").empty();
}

function returnToy() {
    var sharingId = localStorage.getItem("sharingId");
    var options = [ sharingId ];

    function callback(tx, results){
        alert("returned successfully");
        $(location).prop("href", "#pageRent");
    }
    Sharing.Update(options, callback);
}

function  getRentedToys() {

    // Get  The  rented  toys  from  sharing  table
    //  AO , YK
    var renterEmail = localStorage.getItem("renterEmail");
    var options = [ renterEmail ];
    function callback(tx, results){

        var htmlCode = "";
        var toyName ="";
        var registerEmail = "";
        for(var i=0; i< results.rows.length; i++){
            var row = results.rows.item(i);

            toyName = row['toyName'];
            registerEmail = row['registerEmail'];

            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + row['sharingId'] + " href='#'>" +
                "<img src = \"data:image/jpeg;base64," + row['picture']+"\" alt='toyPic'>" +
                "<h1>Name: " + row['toyName'] + "</h1>" +
                "<p>Return Date: " + row['returnDate'] + "</p>" +
                "</a></li>";
        }

        var lv = $("#lvRentingAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lvRentingAll a").on("click", clickHandler);
        function clickHandler() {
            var sharingId= $(this).attr("data-row-id");
            localStorage.setItem("sharingId", sharingId);
            $(location).prop("href", "#pageRentDetail");
        }
    }

    Sharing.SelectRentingAll(options, callback);
    $("#pictureInRentDetail").empty();
}

function  getHistory() {

    // Get  The  rented  toys  from  sharing  table
    //  AO , YK
    var renterEmail = localStorage.getItem("renterEmail");
    var options = [ renterEmail ];
    function callback(tx, results){

        var htmlCode = "";
        var toyName ="";
        var registerEmail = "";
        for(var i=0; i< results.rows.length; i++){
            var row = results.rows.item(i);

            toyName = row['toyName'];
            registerEmail = row['registerEmail'];

            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + row['sharingId'] + " href='#'>" +
                "<img src = \"data:image/jpeg;base64," + row['picture']+"\" alt='toyPic'>" +
                "<h1>Name: " + row['toyName'] + "</h1>" +
                "<p>Description: " + row['description'] + "</p>" +
                "<p>Rent Date: " + row['rentDate'] + "</p>" +
                "<p>Return Date: " + row['returnDate'] + "</p>" +
                "<p>Actual Return Date: " + row['actualReturnDate'] + "</p>" +
                "<p>Condition: " + row['conditionLevel'] + "</p>" +
                "<p>Register Email: " + row['registerEmail'] + "</p>" +
                "</a></li>";
        }

        var lv = $("#lvHistoryAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
    }

    Sharing.SelectReturnedAll(options, callback);
}

function showOneToyToReturn() {

    let sharingId = localStorage.getItem("sharingId"); // get current  id  from  local  storage
    if (sharingId <= 0) return;

    Sharing.Select([sharingId], function (tx, results) {
        if (results && results.rows && results.rows.length > 0) {
            const shareData = results.rows[0];
            Toys.Select([shareData['toyId']], function (tx2, results2) {   //?????
                if (results2 && results2.rows && results2.rows.length > 0) {
                    let toy = results2.rows[0];
                    //console.info(toy);
                    $("#nameInRentDetail").val(toy['toyName']);
                    $("#descriptionInRentDetail").val(toy['description']);
                    $("#cmbConditionInRentDetail").val(toy['conditionLevel']).change();
                    // $("#cmbConditionInList").val(row['conditionLevel']).change();
                    $("#rentDateInRentDetail").val(shareData['rentDate']);
                    $("#returnDateInRentDetail").val(shareData['returnDate']);

                    var picturePath = "<img src=\"data:image/jpeg;base64," + toy['picture']+ "\" width='100px' alt='toyPhoto'/>";

                    $("#pictureInRentDetail").prepend(picturePath);
                }
            });
        }
    })
}

function initializeJoinForm() {
    $("#emailForJoin").val("");
    $("#cmbProvinceForJoin").val(1).change();
    $("#nameForJoin").val("");
    $("#addressForJoin").val("");
    $("#cityForJoin").val("");
    $("#postalCodeForJoin").val("");
    $("#phoneForJoin").val("");
}

function initializeRegisterForm() {
    $("#name").val("");
    $("#descriptionInLIst").val("");
    $("#cmbConditionInList").val("Good").change();
    $("#rentDate").val("");
    $("#returnDate").val("");
    $('#imgRegister').attr('src', '');
}

function setCurrentDate() {
    //$("#rentDate").val
    //console.info("setCurrentDate")
    // $("#rentDate").datepicker().datepicker("setDate", new Date());

    //var now = new Date();
    // $("#rentDate").val(now);
    //console.info(now.getFullYear());
    //$("#rentDate").val("2020-11-11");
}

function showOneToy() {
    var toyId = localStorage.getItem("toyId");
    var options = [toyId];

    function callback(tx, results){
        var row = results.rows.item(0);

        $("#nameInList").val(row['toyName']);
        $("#descriptionInLIst").val(row['description']);
        $("#cmbConditionInList").val(row['conditionLevel']).change();
        var picturePath = "<img src=\"data:image/jpeg;base64," + row['picture']+ "\" width='100px' alt='toyPhoto'/>";
        $("#picturesInList").prepend(picturePath);
    }

    Toys.Select(options, callback);
}

function fillBasicData() {

    var options = [];

    function callback() {
        alert("inserted successfully");
    }

    Family.InsertAll(options, callback);
    Toys.InsertAll(options, callback);
    Sharing.InsertAll(options, callback);
}


function clearDatabase() {
    var result = confirm("Really want to clear database? ");
    try{
        if(result){
            DB.dropTables();
            alert("Database cleared");
        }
    } catch(e){
        alert(e);
    }
}

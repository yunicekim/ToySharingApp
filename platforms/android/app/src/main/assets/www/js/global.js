// File name : global.js
// Program : PROG2430 Final Project
// Purpose : to declare functions related to component
// Revision History :
//     Abdel Olayyan & Yunice Kim, Apr 14, 2020 : Created
//
function btnSave_click(){
    registerToy();
}

function btnChangeRenter_click(){
    changeRenterEmail();
}

function btnJoin_click(){
    registerRenter();
}

function btnClearDatabase_click() {
    clearDatabase();
}

function pageList_show() {
    getAvailableToys();
}

function btnCapturePhoto_click() {
    capturePhoto();
}

function pageRegister_show() {
    setCurrentDate();
}

function pageToyDetail_show() {
    showOneToy();
    //setCurrentDate();
}

function btnCancelInList_click() {
    goPageList();
}

function btnRentInList_click() {
    addRent();
}

function pageRent_show() {
    getRentedToys();
}

function  pageRentDetail_show() {
    showOneToyToReturn();
}

function  pageHistory_show() {
    getHistory();
}

function  btnCancelInRentDetail_click() {
    goPageRentList();
}

function  btnReturn_click() {
    returnToy();
}

function  btnDelete_click() {
    deleteSharing();
}

function  btnFill_Click() {
    fillBasicData();
}

function initDB() {
    console.info("Creating Database...");
    try{
        DB.createDatabase();
        if(db){
            console.info("Before creating tables");
            DB.createTables();
            console.info("Creating Tables...");
        }
        else{
            console.error("Error: can't create tables: Database is not available");
        }
    }
    catch(e){
        console.error("Error: (Fatal) Error is initDB() - Cannot proceed");
    }
}

function init() {
    console.info("Dom is ready");

    $("#btnCancelInList").on("click", btnCancelInList_click);
    $("#btnRentInList").on("click", btnRentInList_click);

    $("#btnCapturePhoto").on("click", btnCapturePhoto_click);

    $("#btnSave").on("click", btnSave_click);
    $("#btnJoin").on("click", btnJoin_click);
    $("#btnChangeRenter").on("click", btnChangeRenter_click);
    $("#btnClearDatabase").on("click", btnClearDatabase_click);
    $("#pageList").on("pageshow", pageList_show);
    $("#pageRegister").on("pageshow", pageRegister_show);
    $("#pageToyDetail").on("pageshow", pageToyDetail_show);
    $("#pageRentDetail").on("pageshow", pageRentDetail_show);
    $("#pageRent").on("pageshow", pageRent_show);
    $("#pageHistory").on("pageshow", pageHistory_show);
    $("#btnCancelInRentDetail").on("click", btnCancelInRentDetail_click);
    $("#btnReturn").on("click", btnReturn_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnFill").on("click", btnFill_Click);

}

$(window).load(function() {
        getAvailableToys();
});

$(document).ready(function() {
    init();
    initDB();
});

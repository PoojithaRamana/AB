$(document).ready(function () {

    function Contact(args) {
        this.id = args ? args.id : null;
        this.name = args ? args.name : null;
        this.email = args ? args.email : null;
        this.MobileNumber = args ? args.MobileNumber : null;
        this.LandLineNumber = args ? args.LandLineNumber : null;
        this.Website = args ? args.Website : null;
        this.Address = args ? args.Address : null;
    }
    var selectedId;
    var selectedContact = new Contact();

    var validContact = function (newContact) {
        $(".editor").hide();
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newContact.email);
        var mobilePattern = /^\(?([6-9]{1})\)?[-.]?([0-9]{9})$/.test(newContact.MobileNumber);
        var websitePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(newContact.Website);
        var valid = true;
        if (newContact.name.length == 0) {
            $(".name").text("Name is required");
            valid = false;
        }
        else {
            $(".name").text("*");
        }

        if (newContact.email.length == 0) {
            $(".email").text("Email is required");
            valid = false;
        }
        else if (!emailPattern) {
            $(".email").text("Email is wrong.");
            valid = false;
        }
        else {
            $(".email").text("*");
        }

        if (newContact.MobileNumber.length == 0) {
            $(".number").text("Mobile number is required");
            valid = false;
        }
        else if (!mobilePattern) {
            $(".number").text("Enter a valid phone number");
            valid = false;
        }
        else {
            $(".number").text("*");
        }

        if (newContact.Website.length == 0) {
            $(".web").text("Website is required");
            valid = false;
        }
        else if (!websitePattern) {
            $(".web").text("Enter a valid website");
            valid = false;
        }
        else {
            $(".web").text("*");
        }

        if (!valid) {
            return false;
        }
        else {
            return true;
        }
    }

    $('#add-contact').on("click", function () {
        $('#add-contact').addClass("active");
        $('#home').removeClass("active");
        window.location.hash = 'Contact/Create';
        $(".right-body").show();
        $(".edit-button").hide();
        $("#" + selectedId).css({
            "background-color": "#fff"
        });
        $(".view-details-of-contact").hide();
        $(".require").text('*');
        $("#require-field").text("");
    });
   
    $(".add").click(function ()
    {
        var contact = new Contact({ name: $("#name-value").val(), email: $("#email-value").val(), MobileNumber: $("#number-value").val(), LandLineNumber: $("#land-num").val(), Website: $("#web").val(), Address: $("#addrr").val() });
        if (validContact(contact)) {
            $.ajax({
                type: "POST",
                url: "/api/APIAddressBook",
                data: JSON.stringify(contact),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $(".contacts").append("<div class =border-styles id=" + response.Id + "><h1>" + contact.name + "</h1><p>" + contact.email + "</p><p>" + contact.MobileNumber + "</p></div>");
                    $("#contact-form")[0].reset();
                    $(".right-body").hide();
                },
                failure: function (response) {
                    alert("The contact doesnot added due to some errors...");
                },
            });
        }
        else {
            $("#require-field").text("Please enter all the required fields");
        }
    });  

    $('#contacts').on("click", ".border-styles", function () {    // to display the details of contact
        $("#" + selectedId).css({
            "background-color": "#fff"
        });
        var id = $(this).attr('id');      
        selectedId = id;
        $("#" + id).css({
            "background-color": "#cee7f2"
        });
        $(".right-body").hide();
        $(".editor").show();
        $('#add-contact').removeClass("active");
        $('#home').addClass("active");
        $.ajax({
            type: "GET",  
            url: `/api/APIAddressBook/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $(".view-details-of-contact").show(); 
                selectedContact = data;
                window.location.hash = "Contact/"+selectedContact.Id;
                $("#dis-name").text(selectedContact.Name);
                $("#dis-email").text("Email: " + selectedContact.Email);
                $("#dis-num").text("Mobile Number :" + selectedContact.MobileNumber);
                $("#dis-number").text("Land-Line Number :" + selectedContact.LandLineNumber);
                $("#dis-website").text("WebSite :" + selectedContact.Website);
                $("#dis-address").text("Address :"+selectedContact.Address);
            },
            failure: function (response) {             
                alert("Your selected contact doesnot exist...");
            },
        });
    });

    $(".edit-icon").click( function () {
        $(".right-body").show();
        $(".edit-button").show();
        $(".view-details-of-contact").hide();
        $(".add").hide();
        $("#name-value").val(selectedContact.Name);
        $("#email-value").val(selectedContact.Email);
        $("#number-value").val(selectedContact.MobileNumber);
        $("#land-num").val(selectedContact.LandLineNumber);
        $("#web").val(selectedContact.Website);
        $("#addrr").val(selectedContact.Address);
    });

    $(".edit-button").click(function () {
        var contact = new Contact({ name: $("#name-value").val(), email: $("#email-value").val(), MobileNumber: $("#number-value").val(), LandLineNumber: $("#land-num").val(), Website: $("#web").val(), Address: $("#addrr").val() });
        contact.id = selectedId;
        if (validContact(contact)) {
            $.ajax({
                type: "Put",
                url: "/api/APIAddressBook",
                data: JSON.stringify(contact),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    window.location.hash = "Contact/edit";
                    $("#" + selectedId).html("<div id=" + selectedId + "><h1>" + contact.name + "</h1><p>" + contact.email + "</p><p>" + contact.MobileNumber + "</p></div>");
                    $("#contact-form")[0].reset();
                    $(".right-body").hide();
                    $("#" + selectedId).css({
                        "background-color": "#fff"
                    });
                },
                failure: function (response) {
                    alert("Cannot edit selected contact...");
                },
            });
        }
    });

    $(".delete-icon").click(function ()
    {
        $(".view-details-of-contact").hide();
        $(".right-body").hide();
        $.ajax({   
            type: "Delete",
            url: `/api/APIAddressBook/${selectedId}`,
            contentType: "application/json; charset=utf-8",           
            success: function () {
              $("#" + selectedId).remove();  
            },
            failure: function () {
                alert("Cannot delete selected contact..");
            },          
        });
    });

    init();
    function init() {
        $(".view-details-of-contact").hide();
        $(".right-body").hide();
        $('#home').addClass("active");
        $.ajax({
            type: "GET",
            url: "/api/APIAddressBook",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                window.location.hash = "Home/Contacts";
                $(".contacts").html('');
                data.forEach(function(contact)
                {
                    $(".contacts").append("<div id=" + contact.Id + "><h1>" + contact.Name + "</h1><p>" + contact.Email + "</p><p>" + contact.MobileNumber + "</p></div>");
                    $("#" + contact.Id).addClass("border-styles");
                });                
            },
            failure: function (response) {
                alert(response.responseText);
            },
        });
    };
});
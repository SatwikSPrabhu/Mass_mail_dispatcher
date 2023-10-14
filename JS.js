(function () {
   
    window.supportDrag = function() {
       let div = document.createElement('div');
       return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();
    
    let input =  document.getElementById('js-file-input');
    
    if(!supportDrag){
       document.querySelectorAll('.has-drag')[0].classList.remove('has-drag');
    }
    
    input.addEventListener("change", function(e){      
       document.getElementById('js-file-name').innerHTML = this.files[0].name;     
       document.querySelectorAll('.file-input')[0].classList.remove('file-input--active');
    }, false);
    
    if(supportDrag){   
       input.addEventListener("dragenter", function(e) {
          document.querySelectorAll('.file-input')[0].classList.add('file-input--active');
       });
 
       input.addEventListener("dragleave", function(e) {
          document.querySelectorAll('.file-input')[0].classList.remove('file-input--active');
       });
    }
    
 })();

 function populateEmailList() {
   const emailList1 = document.getElementById("valid-email-list");
   const emailList2 = document.getElementById("invalid-email-list");
   emailList1.innerHTML = "";
   emailList2.innerHTML = "";
}

function openPopup1() {
   document.getElementById("overlay").style.display = "flex";
}

function openPopup2() {
   document.getElementById("overlay2").style.display = "flex";
}

function closePopup1() {
   document.getElementById("overlay").style.display = "none";
}  

function closePopup2() {
   document.getElementById("overlay2").style.display = "none";
}

document.getElementById("popup-button").addEventListener("click", openPopup1);

document.getElementById("popup-button2").addEventListener("click", openPopup2);

let upload = document.getElementById('js-file-input');
upload.addEventListener('change', () => {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.trim();
        });

        window.valNo = 0;
        let invalNo = 0;
        window.valMail = [];

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

        Arr.forEach(e => {
            const email = e.trim();
            if (emailPattern.test(email)) {
                let creEle = document.createElement("tr");
                creEle.innerHTML = `<td>${email}</td>`;
                document.querySelector("table#val").appendChild(creEle);
                window.valMail.push(email);
                window.valNo++;
            } else {
                let creEle = document.createElement("tr");
                creEle.innerHTML = `<td>${email}</td>`;
                document.querySelector("table#inval").appendChild(creEle);
                invalNo++;
            }
        });

        document.querySelector('#valCount').innerHTML = "Valid emails: " + window.valNo;
        document.querySelector('#invalCount').innerHTML = "Invalid emails: " + (invalNo-1);

        document.querySelector('#valCount').insertAdjacentHTML('afterend', '<br>');
        document.querySelector('#invalCount').insertAdjacentHTML('afterend', '<br>');
    };
});

(function () {
    emailjs.init("enter_your_user_id");
})();

function sendEmail() {
    var senderEmail = document.getElementById("email").value;
    var message = document.getElementById("msg").value;
    var subject = document.getElementById("subject").value;

    for (var j = 0; j < window.valMail.length; j++) {
        var templateParams = {
            to_name: window.valMail[j],
            from_name: senderEmail,
            message_html: message,
            subject_html: subject
        };

        emailjs.send('enter_your_service_id', 'enter_your_service_id', templateParams)
            .then(function (response) {
                console.log("SUCCESS", response);
            }, function (error) {
                console.log("FAILED", error);
            });
    }

    alert("Email dispatched successfully");
}
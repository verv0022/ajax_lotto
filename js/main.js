







document.addEventListener("DOMContentLoaded", init);

let pages = [];

function init() {



    pages = document.querySelectorAll(".page");
    console.log(pages);

    document.querySelector("#btnSend").addEventListener("click", function () {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
        getCake();
    });

    document.querySelector("#btnBack").addEventListener("click", function () {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");

        document.querySelector("#digits").value = document.querySelector("#digits").defaultValue;


        document.querySelector("#max").value = document.querySelector("#max").defaultValue;
        document.getElementById("digits").focus();

        loseCake();
    });
}




function getCake() {

    let numberofDigits = document.getElementById("digits").value;
    let range = document.getElementById("max").value;

    let formData = new FormData();
    formData.append("digits", numberofDigits);
    formData.append("max", range);

    let url = "http://davidst.edumedia.ca/mad9014/nums.php";

    if (numberofDigits <= 0 || numberofDigits > 10) {
        
        alert("Please enter a valid number");
        
        pages[0].classList.add("active");
        pages[1].classList.remove("active");

        document.querySelector("#digits").value = document.querySelector("#digits").defaultValue;
        document.getElementById("digits").focus();
        
        return;

    }
    else if (range <= 0 || range > 99) {
        
        alert("Please enter a valid number");
        
        pages[0].classList.add("active");
        pages[1].classList.remove("active");
        
        document.querySelector("#max").value = document.querySelector("#max").defaultValue;
        document.getElementById("max").focus();
        
        return;    
    }
   

    let customOptions = {
        mode: "cors",
        method: "POST",
        body: formData
    };

    let req = new Request(url, customOptions);

    fetch(req)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("no cake :(");
            }

        })
        .then(function (data) {
            console.log(data);

            let ul = document.querySelector(".num_list");

            for (let i = 0; i < data.numbers.length; i++) {
                let li = document.createElement("li");
                li.textContent = data.numbers[i];
                ul.appendChild(li);
            }
        })


        .catch(function (error) {
            console.log("RUH ROH: ", error.message);
        });
}


function loseCake() {

    let ul = document.querySelector(".num_list");
    ul.innerHTML = "";


    if (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }

}

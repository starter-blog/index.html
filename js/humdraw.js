window.onload=function() {
    const members = JSON.parse('[{"name": "강병지", "base": 1, "gender": 1, "id": 21}, {"name": "강은규", "base": 0, "gender": 1, "id": 20}, {"name": "강지효", "base": 1, "gender": 0, "id": 18}, {"name": "김시온", "base": 1, "gender": 0, "id": 22}, {"name": "김연경", "base": 0, "gender": 0, "id": 21}, {"name": "박지우", "base": 0, "gender": 0, "id": 23}, {"name": "박지원", "base": 0, "gender": 1, "id": 20}, {"name": "배유빈", "base": 0, "gender": 0, "id": 23}, {"name": "손재완", "base": 1, "gender": 1, "id": 21}, {"name": "이광률", "base": 1, "gender": 1, "id": 21}, {"name": "이동훈", "base": 1, "gender": 1, "id": 20}, {"name": "이상언", "base": 0, "gender": 1, "id": 17}, {"name": "이윤우", "base": 0, "gender": 1, "id": 23}, {"name": "이지수", "base": 1, "gender": 0, "id": 23}, {"name": "이찬슬", "base": 0, "gender": 0, "id": 22}, {"name": "정신영", "base": 0, "gender": 1, "id": 20}, {"name": "최유희", "base": 1, "gender": 0, "id": 21}, {"name": "최정명", "base": 1, "gender": 1, "id": 16}, {"name": "최준용", "base": 1, "gender": 1, "id": 19}, {"name": "최혁재", "base": 1, "gender": 1, "id": 23}]');
    const idarr = [];
    var idset;
    var idavg = 0;
    members.forEach(mem => {
        idarr.push(mem.id);
        idavg += mem.id;
    });
    
    if(idarr.length) {
        idset=new Set(idarr.sort());
        idavg /= idarr.length;
    }

    var idlist = document.getElementById("idlist");
    idset.forEach(id => {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = id;
        checkbox.id = id;

        var label = document.createElement("label");
        label.innerText = id;
        label.insertBefore(checkbox, label.firstChild);

        idlist.appendChild(label);
    });

    document.getElementById("all").addEventListener("click", function() {
        idset.forEach(id => {
            var checkbox = document.getElementById(id);
            checkbox.checked = true;
        })
    });

    document.getElementById("high").addEventListener("click", function() {
        idset.forEach(id => {
            var checkbox = document.getElementById(id);
            checkbox.checked = id <= idavg;
        })
    });
    
    document.getElementById("low").addEventListener("click", function() {
        idset.forEach(id => {
            var checkbox = document.getElementById(id);
            checkbox.checked = id > idavg;
        })
    });
    
    document.getElementById("even").addEventListener("click", function() {
        idset.forEach(id => {
            var checkbox = document.getElementById(id);
            checkbox.checked = !(id % 2);
        })
    });
    
    document.getElementById("odd").addEventListener("click", function() {
        idset.forEach(id => {
            var checkbox = document.getElementById(id);
            checkbox.checked = id % 2;
        })
    });

    document.getElementById("submit").addEventListener("click", function() {
        var candidate = [];

        var baseCon = getChecked("base");
        var genderCon = getChecked("gender");
        
        members.forEach(mem => {
            if((baseCon == "all" || mem["base"] == baseCon) && (genderCon == "all" || mem["gender"] == genderCon) && document.getElementById(mem["id"]).checked) {
                candidate.push(mem["name"]);
            }
        })

        let targetNum = document.getElementById("count").value;

        if(candidate.length < targetNum) {
            alert("후보가 추첨 인원보다 적습니다! 후보 " + candidate.length + "명");
        }

        else {
            var result = document.getElementById("result");
            var temp = "";

            for(let i = 0; i < targetNum; i++) {
                var max = candidate.length;
                var ran = Math.floor(Math.random() * max);
                if(i) temp += ", ";
                temp += candidate[ran];
                candidate.splice(ran, 1);
            }
            result.innerHTML = "<h3>" + temp + "</h3>";
        }
    });
}


function getChecked(opt) {
    var result = "all"
    let con = document.getElementsByName(opt);
    con.forEach(element => {
        if(element.checked) result = element.value;
    })
    return result;
}

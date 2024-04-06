var members;
var memcnt;
var idarr = [];
var idset;
var idavg;

window.onload = function() {
    document.getElementById("member").onchange = function() {
        let input = document.getElementById("member");
        let reader = new FileReader();
        
        reader.onload = function () {
            let data = reader.result;
            if(data == null) return
            let workBook = XLSX.read(data, { type: 'binary' });
            
            workBook.SheetNames.forEach(function (sheetName) {
                let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                members = JSON.parse(JSON.stringify(rows));
                memcnt = members.length;
                idarr = [];
                idavg = 0;
            
                members.forEach(mem => {
                    idarr.push(mem.id);
                    idavg += mem.id;
                });
                
                if(idarr.length) {
                    idset=new Set(idarr.sort());
                    idavg /= idarr.length;
                }
            })
        };
        reader.readAsBinaryString(input.files[0]);
    }

    document.getElementById("submit").onclick = function() {
        var counts = document.getElementById("count").value;
        var result = document.getElementById("result");
        result.innerHTML = "";
        
        var weights = [];
        var checks = document.getElementsByName("opt");

        for(let i = 0; i < checks.length; i++) {
            weights.push((3-i)*checks[i].checked);
        }
        
        var teams = [];
        var tweights = [];
        var tmembers = members.slice();
        var teammax = Math.ceil(members.length / counts)
        var teammin = Math.floor(members.length / counts)

        console.log('teammax:' + teammax)
        var canover = members.length % counts;

        for(let i = 0; i < counts; i++) {
            teams.push([]);
            tweights.push([]);
            for(let j = 0; j < weights.length; j++) {
                tweights[i].push(0);
            }
        }

        for(let i = 0; i < members.length; i++) {
            var max = tmembers.length;
            var ran = Math.floor(Math.random() * max);
            
            var myprofile = tmembers[ran];
            var myweights = [(-1) ** myprofile["base"], (-1) ** (myprofile["gender"] == 'MALE'), (-1) ** (myprofile["id"] > idavg)];

            var wmax = -Infinity;
            var tteam = 0;
            
            for(let j = 0; j < counts; j++) {
                if ((teams[j].length >= teammax) || (teams[j].length >= teammin && canover < 1)) {
                    continue;
                }

                let tmax = 0;

                for(let k = 0; k < weights.length; k++) {
                    tmax += (-myweights[k]) * tweights[j][k] * weights[k];
                }

                if(wmax <= tmax) {
                    wmax = tmax
                    tteam = j;
                }
            }

            for(let k = 0; k < weights.length; k++) {
                tweights[tteam][k] += myweights[k];
            }

            teams[tteam].push(myprofile["name"]);
            if(teams[tteam].length == teammax) canover--;
            console.log(canover);
            tmembers.splice(ran, 1);
        }
        
        teams.forEach(team => {
            var temp = "";

            for(let i = 0; i < team.length; i++) {
                if(i) temp += ", ";
                temp += team[i];
            }

            result.innerHTML += "<div class='team'>" + temp + "</div>";
        });
    }
}
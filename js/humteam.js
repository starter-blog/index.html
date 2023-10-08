window.onload=function() {
    const members = JSON.parse('[{"name": "강병지", "base": 1, "gender": 1, "id": 20}, {"name": "강은규", "base": 0, "gender": 1, "id": 20}, {"name": "강지효", "base": 1, "gender": 0, "id": 18}, {"name": "김시온", "base": 1, "gender": 0, "id": 22}, {"name": "김연경", "base": 0, "gender": 0, "id": 21}, {"name": "박지우", "base": 0, "gender": 0, "id": 23}, {"name": "박지원", "base": 0, "gender": 1, "id": 23}, {"name": "배유빈", "base": 0, "gender": 0, "id": 23}, {"name": "손재완", "base": 1, "gender": 1, "id": 21}, {"name": "이광률", "base": 1, "gender": 1, "id": 21}, {"name": "이동훈", "base": 1, "gender": 1, "id": 18}, {"name": "이상언", "base": 0, "gender": 1, "id": 17}, {"name": "이윤우", "base": 0, "gender": 1, "id": 23}, {"name": "이지수", "base": 1, "gender": 0, "id": 23}, {"name": "이찬슬", "base": 0, "gender": 0, "id": 22}, {"name": "정신영", "base": 0, "gender": 1, "id": 20}, {"name": "최유희", "base": 1, "gender": 0, "id": 21}, {"name": "최정명", "base": 1, "gender": 1, "id": 17}, {"name": "최준용", "base": 1, "gender": 1, "id": 19}, {"name": "최혁재", "base": 1, "gender": 1, "id": 23}]');
    const memcnt = members.length;
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

    document.getElementById("submit").addEventListener("click", function() {
        var count = document.getElementById("count").value;
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

        for(let i = 0; i < count; i++) {
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
            var myweights = [(-1) ** myprofile["base"], (-1) ** myprofile["gender"], (-1) ** (myprofile["id"] > idavg)];

            var wmax = -Infinity;
            var tteam = 0;
            
            for(let j = 0; j < count; j++) {
                if (teams[j].length >= memcnt / count) {
                    continue;
                }
                let tmax = 0;

                for(let k = 0; k < weights.length; k++) {
                    tmax += (-myweights[k]) * tweights[j][k] * weights[k];
                }

                if(wmax < tmax) {
                    wmax = tmax
                    tteam = j;
                }
            }

            for(let k = 0; k < weights.length; k++) {
                tweights[tteam][k] += myweights[k];
            }

            teams[tteam].push(myprofile["name"]);
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
    });
}
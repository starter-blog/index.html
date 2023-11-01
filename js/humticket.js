window.onload=function() {
    const Ctickets = [{"name": "흑기사", "count": 4}, {"name": "조 의리주 넘기기 쿠폰", "count": 4}, {"name": "승리 티켓", "count": 12}, {"name": "옵션 초기화", "count": 2}, {"name": "벌칙 or 벌주", "count": 4}, {"name": "다른조 승리티켓 가져오기 or 없애기", "count": 2}, {"name": "달빛산책", "count": 6}, {"name": "다른 조에서 1명 지목하여 바꾸기", "count": 2}, {"name": "의리주 2배로 만들기", "count": 2}, {"name": "회장 원샷", "count": 4}, {"name": "회장 지목자 원샷", "count": 4}, {"name": "휴머니즘 전체 원샷(걸린 사람 건배사)", "count": 2}];
    const tickets = [];

    Ctickets.forEach(li => {
        let cnt = li["count"];
        for(let i = 0; i < cnt; i++) {
            tickets.push(li['name']);
        }
    });

    document.getElementById("submit").addEventListener("click", function() {
        var max = tickets.length;
        var ran = Math.floor(Math.random() * max);
        var temp = tickets[ran];
        tickets.splice(ran, 1);

        result.innerHTML = "<h3> 남은 황금 열쇠 : " + tickets.length + "<br> 뽑은 황금 열쇠 : " + temp + "</h3>";
    });
}
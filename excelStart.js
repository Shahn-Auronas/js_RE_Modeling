(function () {
    var i,
        row,
        j,
        letter,
        DATA,
        INPUTS,
        value;
    for (i = 0; i < 6; i += 1) {
        row = document.querySelector("table").insertRow(-1);
        for (j = 0; j < 6; j += 1) {
             letter = String.fromCharCode("A".charCodeAt(0) + j - 1);
             row.insertCell(-1).innerHTML = i && j ? "<input id='" + letter + i + "'/>" : i || letter;
        }
    }
    DATA = {}; 
    INPUTS = [].slice.call(document.querySelectorAll("input"));
    INPUTS.forEach(function (elm) {
        elm.onfocus = function (e) {
            e.target.value = localStorage[e.target.id] || "";
        };
        elm.onblur = function (e) {
            localStorage[e.target.id] = e.target.value;
            computeAll();
        };
        function getter() {
            value = localStorage[elm.id] || "";
            if (value.charAt(0) === "=") {
                with (DATA) {
                    return eval(value.substring(1));
                } 
            } else { 
                return isNaN(parseFloat(value)) ? value : parseFloat(value); }
        };
        Object.defineProperty(DATA, elm.id, { get: getter });
        Object.defineProperty(DATA, elm.id.toLowerCase(), { get: getter });
    });
    (window.computeAll = function () {
        INPUTS.forEach(function (elm) {
            try {
                elm.value = DATA[elm.id];
            } catch (e) {}
        });
    })();
})();


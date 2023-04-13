var form1 = document.getElementById('firstForm');
var form2 = document.getElementById('secondForm');
var form3;
var form4 = document.getElementById('fourthForm');
var form5 = document.getElementById('fifthForm');
var form6 = document.getElementById('sixthForm');
var form7;
var minOmage = document.getElementById('minOmage');
var maxOmage = document.getElementById('maxOmage');
var i = 0;
var carVoltage = 0;
var glassColor = 0;
var glassWidth = 0;
var wireCount = 0;
var wireLength = [];
var wireWidth = [];
var sum1_78 = 0;
var sum1_50 = 0;
var sum2_78 = 0;
var sum2_50 = 0;
var current1_78 = 0;
var current1_50 = 0;
var current2_78 = 0;
var current2_50 = 0;
var ww;
var Omage1;
var Omage2;
var selectedOmage;
var circuitCount;
var circuitHeight = [];
var circuitWidth = [];
var interwireDistance = [];
var area = [];
var resistance_t = [];
var resistance_es = [];
var current = [];
var power = [];
var heatPower = [];
var system_resistance = 0;
var system_current = 0;
var sum_area = 0;
var system_power = 0;
var system_heatPower = 0;
var voltage = [];

function updateValues() {
    var omageValue34 = document.getElementById('omageValueBar');
    var selectedOmage34 = document.getElementById('selectedOmage');
    var formattedValue = Number(selectedOmage34.value).toFixed(2);
    omageValue34.textContent = formattedValue;


    var TF1_78rate = document.getElementById('TF1_78rate');
    var TF1_50rate = document.getElementById('TF1_50rate');
    var TF2_78rate = document.getElementById('TF2_78rate');
    var TF2_50rate = document.getElementById('TF2_50rate');
    var weight1_tf1 = (((formattedValue - tf1_50) / (tf1_78 - tf1_50))*100).toFixed(2);
    var weight2_tf1 = (100 - weight1_tf1).toFixed(2);
    var weight1_tf2 = (((formattedValue - tf2_50) / (tf2_78 - tf2_50))*100).toFixed(2);
    var weight2_tf2 = (100 - weight1_tf2).toFixed(2);
    // var weightedAvg = (tf1_78 * weight1) + (tf1_50 * weight2);
    TF1_78rate.textContent = weight1_tf1;
    TF1_50rate.textContent = weight2_tf1;
    TF2_78rate.textContent = weight1_tf2;
    TF2_50rate.textContent = weight2_tf2;
    }



function submitForm(event) {
    event.preventDefault();
    var formData = new FormData(form1);
    carVoltage = parseFloat(formData.get('carVoltage'));
    glassColor = formData.get('glassColor');
    glassWidth = parseInt(formData.get('glassWidth'), 10);

    if (form1.checkValidity()) {
        form1.setAttribute('style', 'display: none !important');
        form2.setAttribute('style', 'display: flex !important');
    }
}

form1.addEventListener("submit", submitForm);





function submitForm2(event) {
    event.preventDefault();
    var formData = new FormData(form2);
    wireCount = parseInt(formData.get('wireCount'), 10);

    if (form2.checkValidity()) {
        form2.setAttribute('style', 'display: none !important');
        formcreated3();
        form2.removeEventListener("submit", submitForm2);
    }
}

form2.addEventListener("submit", submitForm2);



function formcreated3(){
    form3 = document.createElement("form");
    form3.setAttribute("method", "post");
    form3.setAttribute("id", "thirdForm");
    form3.setAttribute("onsubmit", "submitForm3(event)");


    for (i = 0; i < wireCount; i++) {
        var div = document.createElement("div");

        var label1 = document.createElement("label");
        label1.setAttribute("for", "wireLength" + i);
        label1.innerHTML = (i + 1) + ". Tel Uzunluğu";
        div.appendChild(label1);

        var input1 = document.createElement("input");
        input1.setAttribute("type", "number");
        input1.setAttribute("name", "wireLength" + i);
        input1.setAttribute("step", "0.01");
        input1.setAttribute("required", true);
        div.appendChild(input1);

        var label2 = document.createElement("label");
        label2.setAttribute("for", "wireWidth" + i);
        label2.innerHTML = (i + 1) + ". Tel Kalınlığı";
        div.appendChild(label2);

        var input2 = document.createElement("input");
        input2.setAttribute("type", "range");
        input2.setAttribute("name", "wireWidth" + i);
        input2.setAttribute("min", "0.7");
        input2.setAttribute("max", "2");
        input2.setAttribute("value", "0.7");
        input2.setAttribute("step", "0.1");
        input2.setAttribute("oninput", "document.getElementById('wireWidthId" + i + "').innerText = (this.value % 1 === 0) ? `${this.value}.0` : this.value;");
        input2.setAttribute("required", true);
        div.appendChild(input2);

        var span = document.createElement("span");
        span.setAttribute("id", "wireWidthId" + i);
        span.innerHTML = "0.7";
        div.appendChild(span);

        form3.appendChild(div);
    }

    var input4 = document.createElement("input");
    input4.setAttribute("type", "submit");
    input4.setAttribute("name", "thirdSubmit");
    input4.setAttribute("value", "tamam");
    form3.appendChild(input4);

    document.body.appendChild(form3);
}



function submitForm3(event) {
    event.preventDefault();
    var formData = new FormData(form3);
    for (i = 0; i < wireCount; i++) {
        wireLength[i] = parseFloat(formData.get('wireLength'+ i));
        wireWidth[i] = parseFloat(formData.get('wireWidth'+ i));
        ww = Math.round((wireWidth[i] - 0.7) * 10);
        tf1_78 = TF1(glassWidth, glassColor, 78, ww) * wireLength[i];
        tf1_50 = TF1(glassWidth, glassColor, 50, ww) * wireLength[i];
        tf2_78 = TF2(glassWidth, glassColor, 78, ww) * wireLength[i];
        tf2_50 = TF2(glassWidth, glassColor, 50, ww) * wireLength[i];
        sum1_78 = sum1_78 + tf1_78; 
        sum1_50 = sum1_50 + tf1_50;
        sum2_78 = sum2_78 + tf2_78; 
        sum2_50 = sum2_50 + tf2_50; 
    }
    sum1_78 = (sum1_78 / wireCount).toFixed(4);
    sum1_50 = (sum1_50 / wireCount).toFixed(4);
    sum2_78 = (sum2_78 / wireCount).toFixed(4);
    sum2_50 = (sum2_50 / wireCount).toFixed(4);

    current1_78 = (carVoltage / sum1_78).toFixed(4);
    current1_50 = (carVoltage / sum1_50).toFixed(4);
    current2_78 = (carVoltage / sum2_78).toFixed(4);
    current2_50 = (carVoltage / sum2_50).toFixed(4);
    if (form3.checkValidity()) {
        form3.setAttribute('style', 'display: none !important');

        minOmage.placeholder = tf1_78.toFixed(2);
        maxOmage.placeholder = tf1_50.toFixed(2);

        form4.setAttribute('style', 'display: flex !important');
    }
}

form3.addEventListener("submit", submitForm3);


function submitForm4(event) {
    event.preventDefault();
    var formData = new FormData(form4);
    Omage1 = parseFloat(formData.get('selectedAmountOfOmage1'));
    Omage2 = parseFloat(formData.get('selectedAmountOfOmage2'));
    document.getElementById('selectedOmage').min = Omage1;
    document.getElementById('selectedOmage').max = Omage2;

    if (form4.checkValidity()) {
        form4.setAttribute('style', 'display: none !important');
        form5.setAttribute('style', 'display: flex !important');
    }
}

form4.addEventListener("submit", submitForm4);

function submitForm5(event) {
    event.preventDefault();
    var formData = new FormData(form5);
    selectedOmage = parseFloat(formData.get('selectedOmage'));

    if (form5.checkValidity()) {
        form5.setAttribute('style', 'display: none !important');
        form6.setAttribute('style', 'display: flex !important');
    }
}

form5.addEventListener("submit", submitForm5);

function submitForm6(event) {
    event.preventDefault();
    var formData = new FormData(form6);
    circuitCount = parseFloat(formData.get('circuitCount'));

    if (form6.checkValidity()) {
        form6.setAttribute('style', 'display: none !important');
        formcreated7();
        form6.removeEventListener("submit", submitForm6);
    }
}

form6.addEventListener("submit", submitForm6);

function formcreated7(){
    form7 = document.createElement("form");
    form7.setAttribute("id", "seventhForm");
    form7.setAttribute("onsubmit", "submitForm7(event)");


    for (i = 0; i < circuitCount; i++) {
        var div = document.createElement("div");

        var label1 = document.createElement("label");
        label1.setAttribute("for", "circuitWidth" + i);
        label1.innerHTML = (i + 1) + ". Devre Genisligi";
        div.appendChild(label1);

        var input1 = document.createElement("input");
        input1.setAttribute("type", "number");
        input1.setAttribute("name", "circuitWidth" + i);
        input1.setAttribute("step", "0.01");
        input1.setAttribute("required", true);
        div.appendChild(input1);

        var label2 = document.createElement("label");
        label2.setAttribute("for", "circuitHeight" + i);
        label2.innerHTML = (i + 1) + ". Devre Uzunlugu";
        div.appendChild(label2);

        var input1 = document.createElement("input");
        input1.setAttribute("type", "number");
        input1.setAttribute("name", "circuitHeight" + i);
        input1.setAttribute("step", "0.01");
        input1.setAttribute("required", true);
        div.appendChild(input1);

        form7.appendChild(div);
    }

    var input21 = document.createElement("input");
    input21.setAttribute("type", "submit");
    input21.setAttribute("name", "seventhSubmit");
    input21.setAttribute("value", "tamam");
    form7.appendChild(input21);

    document.body.appendChild(form7);
}

function submitForm7(event) {
    event.preventDefault();
    var formData = new FormData(form7);
    
    for (i = 0; i < circuitCount; i++) {
            circuitHeight[i] = parseFloat(formData.get('circuitHeight'+ i));
            circuitWidth[i] = parseFloat(formData.get('circuitWidth'+ i));
            if(wireCount > 1) {
                interwireDistance[i] = parseFloat((circuitWidth[i]/(wireCount - 1)).toFixed(2));
            } else {
                interwireDistance[i] = 0;
            }
            area[i] = parseFloat(((circuitHeight[i] * circuitWidth[i])/10000).toFixed(2));
            resistance_t[i] = parseFloat(((selectedOmage * circuitHeight[i]) / 1000).toFixed(2));
            resistance_es[i] = parseFloat((resistance_t[i] / wireCount).toFixed(2));
    }
    for (i = 0; i < circuitCount; i++) {
        system_resistance = parseFloat((system_resistance + resistance_es[i]).toFixed(2));
        sum_area = parseFloat((sum_area + area[i]).toFixed(2));
    }
        system_current = parseFloat((carVoltage / system_resistance).toFixed(2));
        system_power = parseFloat(((carVoltage * carVoltage) / system_resistance).toFixed(2));
        system_heatPower = parseFloat((system_power / sum_area).toFixed(2));
    for (i = 0; i < circuitCount; i++) {
        voltage[i] = parseFloat((carVoltage /(1/(resistance_es[i] / system_resistance))).toFixed(2));
        current[i] = parseFloat((voltage[i] / resistance_es[i]).toFixed(2));
        power[i] = parseFloat(((voltage[i] * voltage[i]) / resistance_es[i]).toFixed(2));
        heatPower[i] = parseFloat((power[i] / area[i]).toFixed(2));
    }

    if (form7.checkValidity()) {
        form7.setAttribute('style', 'display: none !important');
        table1();
        table2();
        form7.removeEventListener("submit", submitForm7);
    }
}

form7.addEventListener("submit", submitForm7);


function table1(){
    const table = document.createElement("table");
    table.setAttribute("id", "tablo1");

    var headingRow = document.createElement("tr");

    var heading1 = document.createElement("th");
    var heading2 = document.createElement("th");

    heading1.innerHTML = "Sistem degerleri";
    heading2.innerHTML = "";

    headingRow.appendChild(heading1);
    headingRow.appendChild(heading2);

    table.appendChild(headingRow);

    var tablevalues1 = [
    ["Gerilim(volt)", carVoltage],
    ["Sistem direnci(ohm)", system_resistance],
    ["Sistem akımı(A)", system_current],
    ["Toplam alan(dm2)", sum_area],
    ["Güç(w)", system_power],
    ["Isıtma gücü(w/dm2)", system_heatPower] 
    ];

    for (var i = 0; i < tablevalues1.length; i++) {
    var valuerow = document.createElement("tr");
    
    var valuerow1 = document.createElement("td");
    var valuerow2 = document.createElement("td");
    
    valuerow1.innerHTML = tablevalues1[i][0];
    valuerow2.innerHTML = tablevalues1[i][1];
    
    valuerow.appendChild(valuerow1);
    valuerow.appendChild(valuerow2);
    
    table.appendChild(valuerow);
    }

    document.body.appendChild(table);
}

function table2(){

    const table = document.createElement("table");
    table.setAttribute("id", "tablo2");

    const headerRow = document.createElement("tr");

    const header1 = document.createElement("th");
    header1.textContent = "Bölgeler";
    headerRow.appendChild(header1);

    for (let i = 0; i < circuitCount; i++) {
        const th = document.createElement("th");
        th.textContent = "Bölge " + (i + 1);
        headerRow.appendChild(th);
    }

    const thead = document.createElement("thead");
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.textContent = "Gerilim(V)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = voltage[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "ısıtma gücü(W/dm2)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = heatPower[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "Güç(W)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = power[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "Akım(A)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = current[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "Reş(ohm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = resistance_es[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent =  "Rt(ohm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = resistance_t[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "Seçilen tel kalınlığı(mm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = wireWidth[j];   // duzeltilmesi gerekebilir
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "Tel omaj/ 1 mt(ohm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = selectedOmage;
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "alan(dm2)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = area[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "genişlik(mm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = circuitWidth[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "yükseklik(mm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = circuitHeight[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "tel sayısı(adet)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = wireCount;
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = "tel arası(mm)";
    tr.appendChild(td);

    for (let j = 0; j < circuitCount; j++) {
        const td = document.createElement("td");
        td.textContent = interwireDistance[j];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    table.appendChild(tbody);

    document.body.appendChild(table);
}




















































































































function TF1(glassWidth2, color2, rate, wireLength2)
{
    if (rate == 78) {
        if (color2 == "white") {
            if (glassWidth2 == 5) {
                tf1 = [5.97, 4.85, 4.27, 3.82, 3.55, 3.25, 3.05, 2.98, 2.72, 2.56, 2.46, 2.29, 2.14, 2.03];
                return tf1[wireLength2];
            } else {
                tf1 = [5.55, 4.52, 3.98, 3.61, 3.36, 3.6, 2.87, 2.83, 2.6, 2.5, 2.4, 2.25, 2.1, 1.96];
                return tf1[wireLength2];
            }
        }
        if (color2 == "green") {
            if (glassWidth2 == 5) {
                tf1 = [6.09, 5.96, 4.4, 3.91, 3.58, 3.27, 3.09, 3.05, 2.79, 2.64, 2.52, 2.34, 2.16, 2.06];
                return tf1[wireLength2];
            } else {
                tf1 = [6.71, 5.44, 4.73, 4.31, 3.93, 3.55, 3.38, 3.36, 3.08, 2.93, 2.8, 2.61, 2.45, 2.34];
                return tf1[wireLength2];
            }
        }
    }
    if (rate == 50) {
        if (color2 == "white") {
            if (glassWidth == 5) {
                tf1 = [37.37, 30.44, 27.15, 25.24, 22.82, 20.61, 19.08, 18.64, 16.51, 15.36, 14.55, 13.37, 12.49, 12.12];
                return tf1[wireLength2];
            } else {
                tf1 = [44.47, 35.77, 30.98, 29.03, 26.86, 24.22, 22.41, 21.66, 19.4, 18.1, 17.08, 15.7, 14.71, 14.14];
                return tf1[wireLength2];
            }
        }
        if (color2 == "green") {
            if (glassWidth2 == 5) {
                tf1 = [36.38, 29.98, 26.81, 25, 22.6, 20.39, 18.71, 18.13, 16.35, 15.15, 14.34, 13.19, 12.34, 11.79];
                return tf1[wireLength2];
            } else {
                tf1 = [36.74, 30.3, 26.72, 24.85, 22.33, 20.45, 18.8, 18.65, 16.65, 15.51, 14.71, 13.48, 12.52, 12.04];
                return tf1[wireLength2];
            }
        }
    }
}


function TF2(glassWidth2, color2, rate, wireLength2)
{
    if (rate == 78) {
        if (color2 == "white") {
            if (glassWidth2 == 5) {
                tf2 = [5.82, 4.73, 4.17, 3.74, 3.48, 3.17, 2.95, 2.88, 2.64, 2.48, 2.37, 2.2, 2.06, 1.95];
                return tf2[wireLength2];
            } else {
                tf2 = [5.38, 4.39, 3.85, 3.54, 3.26, 2.94, 2.82, 2.78, 2.55, 2.46, 2.35, 2.2, 2.05, 1.92];
                return tf2[wireLength2];
            }
        }
        if (color2 == "green") {
            if (glassWidth2 == 5) {
                tf2 = [5.96, 4.9, 4.32, 3.85, 3.73, 3.2, 3.02, 2.98, 2.72, 2.56, 2.42, 2.27, 2.12, 2.02];
                return tf2[wireLength2];
            } else {
                tf2 = [5.94, 4.93, 4.28, 3.92, 3.65, 3.36, 3.17, 3.12, 2.86, 2.72, 2.57, 2.4, 2.25, 2.15];
                return tf2[wireLength2];
            }
        }
    }
    if (rate == 50) {
        if (color2 == "white") {
            if (glassWidth2 == 5) {
                tf2 = [39.24, 29.98, 26.81, 25, 22.6, 20.39, 18.71, 18.13, 16.35, 15.15, 14.34, 13.19, 12.34, 11.79];
                return tf2[wireLength2];
            } else {
                tf2 = [33.92, 32.27, 28, 26.14, 24.26, 21.95, 20.54, 20.16, 18.1, 16.8, 15.92, 14.61, 13.76, 13.34];
                return tf2[wireLength2];
            }
        }
        if (color2 == "green") {
            if (glassWidth2 == 5) {
                tf2 = [40.41, 33.23, 29.27, 27.15, 24.52, 21.9, 20.22, 19.72, 17.46, 16.33, 15.43, 14, 13.28, 12.69];
                return tf2[wireLength2];
            } else {
                tf2 = [37.95, 31.38, 27.65, 25.76, 23.12, 21, 19.62, 19.32, 17.35, 16.06, 15.14, 14.02, 13, 12.46];
                return tf2[wireLength2];
            }
        }
    }
}

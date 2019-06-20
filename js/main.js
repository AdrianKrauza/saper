$(document).ready(function () {
    document.addEventListener('contextmenu', event => event.preventDefault());
    let brettW = 10;
    let brettH = 10;
    let bombIle = 5;
    let bomb = new Array;
    let brett = new Array
    let czas = 0
    let s = 0
    let m = 0
    let win = false
    let czasStart = false

    let flagName = '<div class="nr icon-flag-empty"></div>'

    let id = 0
    //plansza
    function plansza() {
        for (let i = 0; i < brettH * brettW; i++) {
            brett[i] = i
        }
        for (let i = 0; i < brettH; i++) {
            // let dd = -brettW + 1
            for (let y = 0; y < brettW; y++) {
                $('#brett').append('<div class="animated " id=' + id + '></div>');
                id++
            }
        }
    }
    //bomby
    function bomby() {
        $('#brett').css('width', 50 * brettW);
        $('#brett').css('height', 50 * brettH);
        if(brettH > 15){
            $('#brett div').css('width',  750 / brettH);
            $('#brett div').css('height', 750 / brettH);
            $('#brett').css('width', (750 / brettH) * brettW);
            $('#brett').css('height', (750 / brettH) * brettH);
        }
       
        for (let i = 0; i < bombIle; i++) {
            let bombRand = Math.floor(Math.random() * (brettW * brettH - 0));
            if (bomb != "") {
                let bombN = true;
                while (bombN) {
                    bombN = false;
                    bomb.forEach(b => {
                        if (bombRand == b) {
                            bombRand = Math.floor(Math.random() * (brettW * brettH - 0));
                            bombN = true;
                        }
                    });
                }
                bomb.push(bombRand);
            } else {
                bomb.push(bombRand)
            }
        }
        bomb.forEach(b => {
            brett[b] = 'X'
        });
    }
    //numery
    function numery() {
        brett.forEach(e => {
            let numer = 0
            if (e != 'X') {
                if (((e + 1) % brettW) != 0) {
                    if (brett[e + 1] == 'X') {
                        numer++
                    }
                    if (brett[e - brettW + 1] == 'X') {
                        numer++
                    }
                    if (brett[e + brettW + 1] == 'X') {
                        numer++
                    }
                }
                if ((e % brettW) != 0) {
                    if (brett[e - 1] == 'X') {
                        numer++
                    }
                    if (brett[e - brettW - 1] == 'X') {
                        numer++
                    }
                    if (brett[e + brettW - 1] == 'X') {
                        numer++
                    }
                }
                if (brett[e - brettW] == 'X') {
                    numer++
                }
                if (brett[e + brettW] == 'X') {
                    numer++
                }
                brett[e] = numer
            }
        });
    }


    //Pokasz plansze
    function Pokasz() {
        let showArray = new Array
        let showid = 0
        let show = ""
        for (let i = 0; i < brettH; i++) {
            for (let y = 0; y < brettW; y++) {
                show += brett[showid]
                showid++
            }
            showArray.push(show)
            show = ""
        }
        // for (let i = 0; i < brettH; i++) {
        //     console.log(showArray[i]);
        // }
    }
    //wyłoływanie funcki
    plansza()
    bomby()
    numery()
    Pokasz()
    //click
    // $('#brett .animated').click(function () {


    $(document).on("click", "#brett div", function () {
        if(brettH > 15){
            $('#brett div div').css('width',  750 / brettH);
            $('#brett div div').css('height', 750 / brettH);
        }
        czasStart = false;

        if (s == 0 && m == 0) {
            stoper()
        }
        $(`#brett #${this.id}`).html(brett[this.id])

        if (brett[this.id] == "X") {
            for (let i = 0; i < brettH * brettW; i++) {
                win = true
                $(`#brett #${i}`).html(brett[i])
            }
        }
        if (brett[this.id] == "0") {

            let zero = new Array;
            let thisId = parseFloat(this.id)
            let jeden = true
            do {
                if (jeden == false) {
                    thisId = zero[zero.length - 1]
                    zero.pop()
                }
                if (((thisId + 1) % brettW) != 0) {

                    if (brett[thisId + 1] == '0' && $(`#brett #${thisId + 1}`).html() == "" && $(`#brett #${thisId + 1}`).html() != flagName) {
                        zero.push(thisId + 1)
                    }
                    if (brett[thisId - brettW + 1] == '0' && $(`#brett #${thisId - brettW + 1}`).html() == "" && $(`#brett #${thisId - brettW + 1}`).html() != flagName) {
                        zero.push(thisId - brettW + 1)
                    }
                    if (brett[thisId + brettW + 1] == '0' && $(`#brett #${thisId + brettW + 1}`).html() == "" && $(`#brett #${thisId + brettW + 1}`).html() != flagName) {
                        zero.push(thisId + brettW + 1)
                    }
                    if ($(`#brett #${thisId + 1}`).html() != flagName) {
                        $(`#brett #${thisId + 1}`).html(brett[thisId + 1])
                    }
                    if ($(`#brett #${thisId - brettW + 1}`).html() != flagName) {

                        $(`#brett #${thisId - brettW + 1}`).html(brett[thisId - brettW + 1])
                    }
                    if ($(`#brett #${thisId + brettW + 1}`).html() != flagName) {
                        $(`#brett #${thisId + brettW + 1}`).html(brett[thisId + brettW + 1])
                    }

                }
                if (((thisId) % brettW) != 0) {
                    if (brett[thisId - 1] == '0' && $(`#brett #${thisId - 1}`).html() == "" && $(`#brett #${thisId - 1}`).html() != flagName) {
                        zero.push(thisId - 1)
                    }
                    if (brett[thisId - brettW - 1] == '0' && $(`#brett #${thisId - brettW - 1}`).html() == "" && $(`#brett #${thisId - brettW - 1}`).html() != flagName) {
                        zero.push(thisId - brettW - 1)
                    }
                    if (brett[thisId + brettW - 1] == '0' && $(`#brett #${thisId + brettW - 1}`).html() == "" && $(`#brett #${thisId + brettW - 1}`).html() != flagName) {
                        zero.push(thisId + brettW - 1)
                    }
                    if ($(`#brett #${thisId - 1}`).html() != flagName) {
                        $(`#brett #${thisId - 1}`).html(brett[thisId - 1])
                    }
                    if ($(`#brett #${thisId - brettW - 1}`).html() != flagName) {
                        $(`#brett #${thisId - brettW - 1}`).html(brett[thisId - brettW - 1])
                    }
                    if ($(`#brett #${thisId + brettW - 1}`).html() != flagName) {
                        $(`#brett #${thisId + brettW - 1}`).html(brett[thisId + brettW - 1])
                    }
                }
                if (brett[thisId - brettW] == '0' && $(`#brett #${thisId - brettW}`).html() == "" && $(`#brett #${thisId - brettW}`).html() != flagName) {
                    zero.push(thisId - brettW)
                }
                if (brett[thisId + brettW] == '0' && $(`#brett #${thisId + brettW}`).html() == "" && $(`#brett #${thisId + brettW}`).html() != flagName) {
                    zero.push(thisId + brettW)
                }
                if ($(`#brett #${thisId - brettW}`).html() != flagName) {
                    $(`#brett #${thisId - brettW}`).html(brett[thisId - brettW])
                }
                if ($(`#brett #${thisId + brettW}`).html() != flagName) {
                    $(`#brett #${thisId + brettW}`).html(brett[thisId + brettW])
                }


                jeden = false
            }
            while (zero.length != 0);
        }

        for (let i = 0; i < brettH * brettW; i++) {
            if ($(`#brett #${i}`).html() == '0') {
                $(`#brett #${i}`).html('<div class="nr" id="nr0"></div>')
            }
            if ($(`#brett #${i}`).html() == '1') {

                $(`#brett #${i}`).html('<div class="nr" id="nr1">1</div>')
            }
            if ($(`#brett #${i}`).html() == '2') {

                $(`#brett #${i}`).html('<div class="nr" id="nr2">2</div>')
            }
            if ($(`#brett #${i}`).html() == '3') {

                $(`#brett #${i}`).html('<div class="nr" id="nr3">3</div>')
            }
            if ($(`#brett #${i}`).html() == '4') {

                $(`#brett #${i}`).html('<div class="nr" id="nr4">4</div>')
            }
            if ($(`#brett #${i}`).html() == '5') {

                $(`#brett #${i}`).html('<div class="nr" id="nr5">5</div>')
            }
            if ($(`#brett #${i}`).html() == '6') {

                $(`#brett #${i}`).html('<div class="nr" id="nr6">6</div>')
            }
            if ($(`#brett #${i}`).html() == '7') {
                $(`#brett #${i}`).html('<div class="nr" id="nr7">7</div>')
            }
            if ($(`#brett #${i}`).html() == '8') {
                $(`#brett #${i}`).html('<div class="nr" id="nr8">8</div>')
            }
            if ($(`#brett #${i}`).html() == 'X') {
                $(`#brett #${i}`).html('<div class="nr icon-bomb" id="nrx"></div>')
            }
        }
        //czy wygrałem
        let wygralem = 0
        for (let i = 0; i < brettH * brettW; i++) {
            if ($(`#brett #${i}`).html() != '' && $(`#brett #${i}`).html() != flagName) {
                wygralem++
                console.log('dd');

                console.log($(`#brett #${i}`).html());

            }
        }


        if (wygralem == (brettH * brettW) - bombIle) {
            // alert('wygrałem')
            let numeryWin = new Array
            let animacjatab = new Array
            let dalej = true
            for (let i = 0; i < brettH * brettW; i++) {

                do {
                    dalej = true
                    const numerWin = Math.floor(Math.random() * (brettW * brettH - 0));



                    if (numeryWin[numerWin] != 0) {

                        numeryWin[numerWin] = 0
                        animacjatab[i] = numerWin
                        dalej = false
                    }
                } while (dalej);

            }
            animacjaFun()
            var ii = 0

            function animacjaFun() {
                // alert()
                var timestop
                const animacja = Math.floor((Math.random() * 5) + 1);
                if (animacja == 1) {
                    $('#brett #' + animacjatab[ii]).addClass('rotateOutDownLeft');
                } else if (animacja == 2) {
                    $('#brett #' + animacjatab[ii]).addClass('rotateOut');
                } else if (animacja == 3) {
                    $('#brett #' + animacjatab[ii]).addClass('rotateOutUpRight');
                } else if (animacja == 4) {
                    $('#brett #' + animacjatab[ii]).addClass('rollOut');
                } else if (animacja == 5) {
                    $('#brett #' + animacjatab[ii]).addClass('zoomOut');
                }
                if (ii != brettW * brettH) {
                    ii++
                    setTimeout(() => {
                        animacjaFun()
                    }, 10);
                } else {
                    m = 0
                    s = 0
                    bomb = []
                    brett = []
                    win = false
                    id = 0
                    flaga = 0
                    czasStart = true;
                    $('#tabela span').html('00:00');
                    for (let i = 0; i < brettH * brettW; i++) {
                        $("#brett #" + i).fadeOut();
                        brett[i] = i

                        $("#brett #" + i).children().remove();

                        $("#brett #" + i).removeClass('rotateOutDownLeft');
                        $("#brett #" + i).removeClass('rotateOut');
                        $("#brett #" + i).removeClass('rotateOutUpRight');
                        $("#brett #" + i).removeClass('rollOut');
                        $("#brett #" + i).removeClass('zoomOut');
                        clearTimeout(timestop);

                        $("#brett #" + i).fadeIn();

                    }
                    bomby()
                    numery()
                    Pokasz()
                }



            }

            win = true
            czasStart = true
        }
    });
    //flaga
    let flaga = 0
    let restClick = 0
    // $(`#brett div`).contextmenu(function () {

    $(document).on("contextmenu", "#brett div", function () {
        if(brettH > 15){
            $('#brett div').css('width',  750 / brettH);
            $('#brett div').css('height', 750 / brettH);
            $('#brett').css('width', (750 / brettH) * brettW);
            $('#brett').css('height', (750 / brettH) * brettH);
        }
        if (restClick == 0) {
            if (flaga != bombIle && this != flagName) {
                flaga++
                $(this).html(flagName)
            }
        } else {
            restClick--
        }
        console.log(flaga);
    })
    $(document).on("contextmenu", "#brett div div", function () {
        if(brettH > 15){
            $('#brett div').css('width',  750 / brettH);
            $('#brett div').css('height', 750 / brettH);
            $('#brett').css('width', (750 / brettH) * brettW);
            $('#brett').css('height', (750 / brettH) * brettH);
        }
        $('#brett #' + $(this).parent().attr('id')).html('')
       
        if(bombIle == flaga){
            flaga -= 2
        }else{
            flaga -= 1
        }
        restClick++
        console.log(flaga);
        
    })
    //czas 
    function stoper() {
        setTimeout(() => {
            if (czasStart == false) {
                s++
            }
            if (s >= 60) {
                s = s - 60
                m++
            }
            if (s < 10 && m < 10) {
                czas = `0${m}:0${s}`
            }
            if (s < 10 && m <= 10) {
                czas = `${m}:0${s}`
            }
            if (s >= 10 && m < 10) {
                czas = `0${m}:${s}`
            }
            if (s >= 10 && m >= 10) {
                czas = `${m}:${s}`
            }
            if (s >= 10 && m == 0) {
                czas = `00:${s}`
            }
            if (s < 10 && m == 0) {
                czas = `00:0${s}`
            }
            $('#tabela span').html(czas);
            if (win == false) {
                stoper()
            }
        }, 1000);
    }
    //ustawienia
    $('.icon-cog-1').click(function () {
        $('#tabela').removeClass('zoomInUp');
        $('#ustawienia').removeClass('zoomOut');
        $('#brett').removeClass('zoomIn');
        $('#tabela').addClass('zoomOutDown');
        $('#brett').addClass('zoomOut');
        $('#ustawienia').addClass('zoomIn');
        $('#ustawienia').fadeIn();
        // $('#ustawienia').fadeIn();

    });
    $('#zapis').click(function () {
        $('#tabela').removeClass('zoomOutDown');
        $('#tabela').addClass('zoomInUp');
        $('#ustawienia').removeClass('zoomIn');
        $('#ustawienia').addClass('zoomOut');
        $('#brett').removeClass('zoomOut');
        $('#brett').addClass('zoomIn');
        $('#ustawienia').fadeOut();
        m = 0
        s = 0
        bomb = []
        brett = []
        win = false
        id = 0
        flaga = 0
        czasStart = true;
        $('#tabela span').html('00:00');
        for (let i = 0; i < brettH * brettW; i++) {
            brett[i] = i
            $("#brett #" + i).fadeIn();
            $("#brett #" + i).addClass('bounceOut');
            setTimeout(() => {
                $("#brett #" + i).removeClass('bounceOut');
                $("#brett #" + i).addClass('bounceIn');
                $("#brett #" + i).remove();
             

            }, 1000);
        }
        setTimeout(() => {
        for (let i = 0; i < newBrettH * newBrettW; i++) {
            console.log(newBrettH);
            
        // if (i < newBrettH * newBrettW) {
            $('#brett').append('<div class="animated " id=' + i + '></div>');
        // }
        } }, 1000);
        setTimeout(() => {

            brettW = newBrettW
            brettH = newBrettH;
            bomby()
            numery()
            Pokasz()
        }, 1000);

    });
    //restart 
    $('.icon-spin3').click(function () {
        m = 0
        s = 0
        bomb = []
        brett = []
        win = false
        id = 0
        flaga = 0
        czasStart = true;
        $('#tabela span').html('00:00');
        for (let i = 0; i < brettH * brettW; i++) {
            brett[i] = i
            $("#brett #" + i).fadeIn();
            $("#brett #" + i).addClass('bounceOut');
            setTimeout(() => {
                $("#brett #" + i).removeClass('bounceOut');
                $("#brett #" + i).addClass('bounceIn');
                $("#brett #" + i).children().remove();

            }, 1000);
        }
        setTimeout(() => {
            bomby()
            numery()
            Pokasz()
        }, 1000);

    });

    //suwak
    var newBrettW = brettW
    var newBrettH = brettH;
    $("#szerokosc").html(brettW);
    $("#dlugosc").html(brettH);
    $("#bomb").html(bombIle);
    $("#slider-szerokosc").slider({
        range: "max",
        min: 5,
        max: 20,
        value: brettW,
        slide: function (event, ui) {
            $("#szerokosc").val(ui.value);
            newBrettW = ui.value
            $("#slider-bomb").slider("option", "max", newBrettH * newBrettW - 1);
        }
    });
    $("#szerokosc").val($("#slider-szerokosc").slider("value"));
    //
    $("#slider-dlugosc").slider({
        range: "max",
        min: 5,
        max: 20,
        value: brettH,
        slide: function (event, ui) {
            $("#dlugosc").val(ui.value);

            newBrettH = ui.value
            $("#slider-bomb").slider("option", "max", newBrettH * newBrettW - 1);
        }
    });
    $("#dlugosc").val($("#slider-dlugosc").slider("value"));
    //
     $("#slider-bomb").slider({
        range: "max",
        min: 1,
        max: newBrettH * newBrettW - 1,
        value: bombIle,
        slide: function (event, ui) {
            $("#bomb").val(ui.value);
            bombIle = ui.value
        }
    });
    $("#bomb").val($("#slider-bomb").slider("value"));
    //ustawienia pokaz


});
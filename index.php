<?php include 'Heading.php';
    session_start();
    if(!isset($_POST["submitCount"])){
        echo 
        '<form method="post" id="firstForm">
            <label for="carVoltage">Araç Voltajı</label>
            <input type="number" name="carVoltage" required>
            <label for="glassColor">Cam Rengi</label>
            <div>
                <input type="radio" name="glassColor" value="white" required>
                <span>Beyaz</span>
                <input type="radio" name="glassColor" value="green">
                <span>Yeşil</span>
            </div>
            <label for="glassWidth">Cam Kalınlığı</label>
            <div>
                <input type="radio" name="glassWidth" value="5" required>
                <span>5mm</span>
                <input type="radio" name="glassWidth" value="4">
                <span>4mm</span>
            </div>
            <input type="hidden" name="submitCount" value="1">
            <input type="submit" name="submit" value="Tamam">
        </form>';
    }
    else if($_POST["submitCount"] == 1){

        $_SESSION["carVoltage"] = $_POST["carVoltage"];
        $_SESSION["glassColor"] = $_POST["glassColor"];
        $_SESSION["glassWidth"] = $_POST["glassWidth"];

        echo 
        '<form method="post" id="secondForm">
            <label for="wireCount">Tel sayısı</label>
            <input type="number" name="wireCount" required>
            <input type="hidden" name="submitCount" value="2">
            <input type="submit" name="secondSubmit" value="tamam">
        </form>';
    }
    else if($_POST["submitCount"] == 2){

        $_SESSION["wireCount"] = $_POST["wireCount"];

        echo
        '<form method="post" id="thirdForm">';
        for ($i = 1; $i <= $_SESSION["wireCount"]; $i++) {
        echo
            '<div>
                <label for="wireLength' . $i . '">'. $i . '. Tel Uzunluğu</label>
                <input type="number" name="wireLength' . $i . '" step="0.01" required>
                <label for="wireWidth' . $i . '">' . $i . '. Tel Kalınlığı</label>
                <input type="range" name="wireWidth' . $i . '" min="0.7" max="2" value=1.0 step="0.1" oninput="wireWidthId' . $i . '.innerText = (this.value % 1 === 0) ? `${this.value}.0` : this.value;" required>
                <span id="wireWidthId' . $i . '">1.0</span>
            </div>';
        }
        echo
            '<input type="hidden" name="submitCount" value="3">
            <input type="submit" name="thirdSubmit" value="tamam">
        </form>'; 
    }
    else { // wireLength wireWidth
        include 'Function.php';
        $sum1_78 = 0;
        $sum1_50 = 0;
        $sum2_78 = 0;
        $sum2_50 = 0;
        for ($i = 1; $i <= $_SESSION["wireCount"]; $i++){
            $ww = ($_POST["wireWidth" . $i] - 0.7) * 10;
            $tf1_78 = TF1($_SESSION["glassWidth"], $_SESSION["glassColor"], 78, $ww) * $_POST["wireLength" . $i];
            $tf1_50 = TF1($_SESSION["glassWidth"], $_SESSION["glassColor"], 50, $ww) * $_POST["wireLength" . $i];
            $tf2_78 = TF2($_SESSION["glassWidth"], $_SESSION["glassColor"], 78, $ww) * $_POST["wireLength" . $i];
            $tf2_50 = TF2($_SESSION["glassWidth"], $_SESSION["glassColor"], 50, $ww) * $_POST["wireLength" . $i];
            $sum1_78 = $sum1_78 + $tf1_78; 
            $sum1_50 = $sum1_50 + $tf1_50;
            $sum2_78 = $sum2_78 + $tf2_78; 
            $sum2_50 = $sum2_50 + $tf2_50;  
        }
        $sum1_78 = $sum1_78 / $_SESSION["wireCount"]; $sum1_78 = number_format($sum1_78, 4);
        $sum1_50 = $sum1_50 / $_SESSION["wireCount"]; $sum1_50 = number_format($sum1_50, 4);
        $sum2_78 = $sum2_78 / $_SESSION["wireCount"]; $sum2_78 = number_format($sum2_78, 4);
        $sum2_50 = $sum2_50 / $_SESSION["wireCount"]; $sum2_50 = number_format($sum2_50, 4);
        $current1_78 = $_SESSION["carVoltage"] / $sum1_78; $current1_78 = number_format($current1_78, 4);
        $current1_50 = $_SESSION["carVoltage"] / $sum1_50; $current1_50 = number_format($current1_50, 4);
        $current2_78 = $_SESSION["carVoltage"] / $sum2_78; $current2_78 = number_format($current1_78, 4);
        $current2_50 = $_SESSION["carVoltage"] / $sum2_50; $current2_50 = number_format($current1_50, 4);
        echo '<div class="result">';
        echo '<p> Toplam TF1 %78ohm degeri: ' . $sum1_78 . ' Akım degeri: ' . $current1_78 . '</p>';
        echo '<p> Toplam TF1 %50ohm degeri: ' . $sum1_50 . ' Akım degeri: ' . $current1_50 . '</p>';
        echo '<p> Toplam TF2 %78ohm degeri: ' . $sum2_78 . ' Akım degeri: ' . $current2_78 . '</p>';
        echo '<p> Toplam TF2 %50ohm degeri: ' . $sum2_50 . ' Akım degeri: ' . $current2_50 . '</p>';
        echo '</div>';
    }
    ?>
<?php include 'Heading2.php' ?>
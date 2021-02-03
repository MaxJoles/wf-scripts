<script>

    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });



    // form variables
    $(".z-submit-button").click(function () {
        event.preventDefault();
        var targetEbitda = $('input[name="targetEBITDA"]').val();
        console.log(targetEbitda);
        var acquisitionMultiple = $('input[name="acquisitionMultiple"]').val();
        console.log(acquisitionMultiple);
        var percentageCash = $('input[name="percentageCash"]').val();
        console.log(percentageCash);
        var annualGrowth = $('input[name="annualGrowth"]').val();
        console.log(annualGrowth);
        var dividendYield = $('input[name="dividendYield"]').val();
        console.log(dividendYield);
        var exitPremium = $('input[name="exitPremium"]').val();
        console.log(exitPremium);
        var stockMarketReturns = $('input[name="stockMarketReturns"]').val();
        console.log(stockMarketReturns);
        var realEstateAppreciation = $('input[name="realEstateAppreciation"]').val();
        console.log(realEstateAppreciation);
        var realEstateYield = $('input[name="realEstateYield"]').val();
        console.log(realEstateYield);
        var peHoldbackPercentage = $('input[name="peHoldbackPercentage"]').val();
        console.log(peHoldbackPercentage);
        var peHoldbackYears = $('input[name="peHoldbackYears"]').val();
        console.log(peHoldbackYears);
        var conHoldbackPercetage = $('input[name="conHoldbackPercetage"]').val();
        console.log(conHoldbackPercetage);
        var conHoldbackYears = $('input[name="conHoldbackYears"]').val();
        console.log(conHoldbackYears);


        // Calculated Fields
        var percentageRestrictedEquity = 100 - percentageCash;
        console.log(percentageRestrictedEquity);
        $('input[name="percentageRestrictedEquity"]').val(percentageRestrictedEquity);

        var cashMultiple = acquisitionMultiple * (percentageCash / 100);
        console.log(cashMultiple);
        $('input[name="cashMultiple"]').val(cashMultiple);

        var restrictedEquityMultiple = acquisitionMultiple * (percentageRestrictedEquity / 100);
        console.log(restrictedEquityMultiple);
        $('input[name="restrictedEquityMultiple"]').val(restrictedEquityMultiple);

        var cash = targetEbitda * cashMultiple;
        console.log(cash);
        $('input[name="cash"]').val(cash);

        var restrictedEquity = targetEbitda * restrictedEquityMultiple;
        console.log(restrictedEquity);
        $('input[name="restrictedEquity"]').val(restrictedEquity);



        // restricted equity projects
        var growthRate = 1 + (annualGrowth / 100);
        var dividendRate = dividendYield / 100;
        for (let index = 0; index < 10; index++) {
            let headerLabel = index + 1;
            console.log(headerLabel);
            equityProjection = Math.round(restrictedEquity * (Math.pow(growthRate, index)));
            console.log(equityProjection);
            annualDividend = Math.round(equityProjection * dividendRate);
            console.log(annualDividend);
            $("#restricted-equity-" + headerLabel).text(formatter.format(equityProjection));
            $("#annual-dividend-" + headerLabel).text(formatter.format(annualDividend));

            if (index == 0) {
                let privateExit = annualDividend + cash;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));
            } else if (index == 9) {
                let privateExit = equityProjection + annualDividend;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));

            } else {
                let privateExit = annualDividend;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));

            }


        };

    });

</script>

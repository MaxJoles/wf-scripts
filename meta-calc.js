<script>

    // Create currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    // capture form inputs as variables
    $(".z-submit-button").click(function () {
        event.preventDefault();
        var targetEbitda = $('input[name="targetEBITDA"]').val();
        var acquisitionMultiple = $('input[name="acquisitionMultiple"]').val();
        var percentageCash = $('input[name="percentageCash"]').val();
        var annualGrowth = $('input[name="annualGrowth"]').val();
        var dividendYield = $('input[name="dividendYield"]').val();
        var exitPremium = $('input[name="exitPremium"]').val();
        var stockMarketReturns = $('input[name="stockMarketReturns"]').val();
        var realEstateAppreciation = $('input[name="realEstateAppreciation"]').val();
        var realEstateYield = $('input[name="realEstateYield"]').val();
        var peHoldbackPercentage = $('input[name="peHoldbackPercentage"]').val();
        var peHoldbackYears = $('input[name="peHoldbackYears"]').val();
        var conHoldbackPercetage = $('input[name="conHoldbackPercetage"]').val();
        var conHoldbackYears = $('input[name="conHoldbackYears"]').val();

        // Calculate fields based on inputs
        var percentageRestrictedEquity = 100 - percentageCash;
        $('input[name="percentageRestrictedEquity"]').val(percentageRestrictedEquity);

        var cashMultiple = acquisitionMultiple * (percentageCash / 100);
        $('input[name="cashMultiple"]').val(cashMultiple);

        var restrictedEquityMultiple = acquisitionMultiple * (percentageRestrictedEquity / 100);
        $('input[name="restrictedEquityMultiple"]').val(restrictedEquityMultiple);

        var cash = targetEbitda * cashMultiple;
        $('input[name="cash"]').val(cash);

        var restrictedEquity = targetEbitda * restrictedEquityMultiple;
        $('input[name="restrictedEquity"]').val(restrictedEquity);



        // 10 year restricted equity functions
        var growthRate = 1 + (annualGrowth / 100);
        var dividendRate = dividendYield / 100;
        for (let index = 0; index < 10; index++) {
            let headerLabel = index + 1;
            equityProjection = Math.round(restrictedEquity * (Math.pow(growthRate, index)));
            annualDividend = Math.round(equityProjection * dividendRate);
            $("#restricted-equity-" + headerLabel).text(formatter.format(equityProjection));
            $("#annual-dividend-" + headerLabel).text(formatter.format(annualDividend));

            if (index == 0) {
                let privateExit = annualDividend + cash;
                let publicExit = privateExit;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));
                $("#public-exit-" + headerLabel).text(formatter.format(publicExit));
            } else if (index == 9) {
                let privateExit = equityProjection + annualDividend;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));
                let publicExit = annualDividend + equityProjection * (1 + exitPremium / 100);
                $("#public-exit-" + headerLabel).text(formatter.format(publicExit));

            } else {
                let privateExit = annualDividend;
                $("#private-exit-" + headerLabel).text(formatter.format(privateExit));
                let publicExit = annualDividend;
                $("#public-exit-" + headerLabel).text(formatter.format(publicExit));
            }
        };



        // Cash + Investments
        var allCash = cash + restrictedEquity;
        var stockReturns = 0;
        for (let index = 0; index < 10; index++) {
            let headerLabel = index + 1;
            if (index == 0) {
                $("#all-cash-" + headerLabel).text(formatter.format(allCash));
                $("#cash-stock-" + headerLabel).text(formatter.format(allCash));
                $("#cash-re-" + headerLabel).text(formatter.format(allCash));
            }

            else if (index == 9) {
                $("#all-cash-" + headerLabel).text(formatter.format(0));



            } else {
                stockReturns = (stockReturns + allCash) * stockMarketReturns/100;
                console.log(stockReturns);
                let reReturns = allCash * realEstateYield/100;
                $("#all-cash-" + headerLabel).text(formatter.format(0));
                $("#cash-stock-" + headerLabel).text(formatter.format(stockReturns));
                $("#cash-re-" + headerLabel).text(formatter.format(reReturns));
            }
        };
    });

</script>

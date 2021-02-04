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
        var percentageCash = $('input[name="percentageCash"]').val() / 100;
        var annualGrowth = $('input[name="annualGrowth"]').val() / 100;
        var dividendYield = $('input[name="dividendYield"]').val() / 100;
        var exitPremium = $('input[name="exitPremium"]').val() / 100;
        var stockMarketReturns = $('input[name="stockMarketReturns"]').val() / 100;
        var realEstateAppreciation = $('input[name="realEstateAppreciation"]').val() / 100;
        var realEstateYield = $('input[name="realEstateYield"]').val() / 100;
        var peHoldbackPercentage = $('input[name="peHoldbackPercentage"]').val() / 100;
        var peHoldbackYears = $('input[name="peHoldbackYears"]').val();
        var conHoldbackPercetage = $('input[name="conHoldbackPercetage"]').val() / 100;
        var conHoldbackYears = $('input[name="conHoldbackYears"]').val();

        // Calculate fields based on inputs
        var percentageRestrictedEquity = 1 - percentageCash;
        $('#percent-restricted-equity').text(percentageRestrictedEquity * 100);

        var cashMultiple = acquisitionMultiple * percentageCash;
        $('#cash-multiple').text((cashMultiple).toFixed(2));

        var restrictedEquityMultiple = acquisitionMultiple * percentageRestrictedEquity;
        $('#restricted-equity-multiple').text((restrictedEquityMultiple).toFixed(2));

        var cash = targetEbitda * cashMultiple;
        $('#cash').text(formatter.format(cash));

        var restrictedEquity = targetEbitda * restrictedEquityMultiple;
        $('#restricted-equity').text(formatter.format(restrictedEquity));



        // 10 year restricted equity functions
        var growthRate = 1 + annualGrowth;
        for (let index = 0; index < 10; index++) {
            let headerLabel = index + 1;
            equityProjection = Math.round(restrictedEquity * (Math.pow(growthRate, index)));
            annualDividend = Math.round(equityProjection * dividendYield);
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
                let publicExit = annualDividend + equityProjection * (1 + exitPremium);
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
        let stockReturns = 0;
        var marketRate = stockMarketReturns + 1;
        for (let index = 0; index < 10; index++) {
            let headerLabel = index + 1;
            let pastMonth = index - 1;
            if (index == 0) {
                $("#all-cash-" + headerLabel).text(formatter.format(allCash));
                $("#cash-stock-" + headerLabel).text(formatter.format(allCash));
                $("#cash-re-" + headerLabel).text(formatter.format(allCash));
            }

            else if (index == 9) {
                $("#all-cash-" + headerLabel).text(formatter.format(0));

            } else {
                stockReturns = (stockReturns + allCash) * stockMarketReturns;
                stockInterest = Math.round(allCash * (Math.pow(marketRate, index))-(allCash * (Math.pow(marketRate, pastMonth))));
                console.log(stockReturns);
                let reReturns = allCash * realEstateYield;
                $("#all-cash-" + headerLabel).text(formatter.format(0));
                $("#cash-stock-" + headerLabel).text(formatter.format(stockInterest));
                $("#cash-re-" + headerLabel).text(formatter.format(reReturns));
            }
        };
    });

</script>


    // Create currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
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
        var allCash = cash + restrictedEquity;
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


        // All cash 
        for (let index = 0; index < 10; index++) {
        let headerLabel = index + 1;
            if (index == 0) {
                $("#all-cash-" + headerLabel).text(formatter.format(allCash));
            } else {
                $("#all-cash-" + headerLabel).text(formatter.format(0));
             
            }
            
        }


    });

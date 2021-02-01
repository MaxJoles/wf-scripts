    // form variables
    $(".z-meta-form").click(function () {
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

        var cashMultiple = acquisitionMultiple * (percentageCash/100);
        console.log(cashMultiple);
        $('input[name="cashMultiple"]').val(cashMultiple);

        var restrictedEquityMultiple = acquisitionMultiple * (percentageRestrictedEquity/100);
        console.log(restrictedEquityMultiple);
        $('input[name="restrictedEquityMultiple"]').val(restrictedEquityMultiple);

        var cash = targetEbitda * cashMultiple;
        console.log(cash);
        $('input[name="cash"]').val(cash);

        var restrictedEquity = targetEbitda * restrictedEquityMultiple;
        console.log(restrictedEquity);
        $('input[name="restrictedEquity"]').val(restrictedEquity);



        // restricted equity projects
        for (let index = 1; index < 11; index++) {
            console.log(index);
            let equityProjection = restrictedEquity + (restrictedEquity * (index - 1));
            console.log(equityProjection);
            
        };


    });

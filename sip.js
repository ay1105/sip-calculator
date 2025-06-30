
        document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            const monthlyInvestmentInput = document.getElementById('monthly-investment');
            const monthlyInvestmentRange = document.getElementById('monthly-investment-range');
            const investmentPeriodInput = document.getElementById('investment-period');
            const investmentPeriodRange = document.getElementById('investment-period-range');
            const returnRateInput = document.getElementById('return-rate');
            const returnRateRange = document.getElementById('return-rate-range');
            const calculateBtn = document.getElementById('calculate-btn');
            
            const maturityValueEl = document.getElementById('maturity-value');
            const investedAmountEl = document.getElementById('invested-amount');
            const estimatedReturnsEl = document.getElementById('estimated-returns');
            const totalValueEl = document.getElementById('total-value');
            const chartEl = document.getElementById('returns-chart');
            
            // Sync range and number inputs
            monthlyInvestmentInput.addEventListener('input', function() {
                monthlyInvestmentRange.value = this.value;
                calculateSIP();
            });
            
            monthlyInvestmentRange.addEventListener('input', function() {
                monthlyInvestmentInput.value = this.value;
                calculateSIP();
            });
            
            investmentPeriodInput.addEventListener('input', function() {
                investmentPeriodRange.value = this.value;
                calculateSIP();
            });
            
            investmentPeriodRange.addEventListener('input', function() {
                investmentPeriodInput.value = this.value;
                calculateSIP();
            });
            
            returnRateInput.addEventListener('input', function() {
                returnRateRange.value = this.value;
                calculateSIP();
            });
            
            returnRateRange.addEventListener('input', function() {
                returnRateInput.value = this.value;
                calculateSIP();
            });
            
            calculateBtn.addEventListener('click', calculateSIP);
            
            // Initial calculation
            calculateSIP();
            
            // SIP Calculation function
            function calculateSIP() {
                const P = parseFloat(monthlyInvestmentInput.value);
                const n = parseFloat(investmentPeriodInput.value);
                const r = parseFloat(returnRateInput.value) / 100 / 12; // Monthly rate
                
                const months = n * 12;
                
                // SIP Future Value formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
                const futureValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
                const investedAmount = P * months;
                const estimatedReturns = futureValue - investedAmount;
                
                // Update UI
                maturityValueEl.textContent = '₹' + formatNumber(futureValue.toFixed(0));
                investedAmountEl.textContent = '₹' + formatNumber(investedAmount.toFixed(0));
                estimatedReturnsEl.textContent = '₹' + formatNumber(estimatedReturns.toFixed(0));
                totalValueEl.textContent = '₹' + formatNumber(futureValue.toFixed(0));
                
                // Update chart
                updateChart(investedAmount, estimatedReturns);
            }
            
            // Format number with commas
            function formatNumber(num) {
                return parseFloat(num).toLocaleString('en-IN');
            }
            
            // Update the chart
            function updateChart(investedAmount, estimatedReturns) {
                chartEl.innerHTML = '';
                
                const total = investedAmount + estimatedReturns;
                const investedHeight = (investedAmount / total) * 100;
                const returnsHeight = (estimatedReturns / total) * 100;
                
                // Create invested amount bar
                const investedBar = document.createElement('div');
                investedBar.className = 'chart-bar';
                investedBar.style.height = `${investedHeight}%`;
                
                const investedValue = document.createElement('div');
                investedValue.className = 'chart-value';
                investedValue.textContent = '₹' + formatNumber(investedAmount.toFixed(0));
                
                const investedLabel = document.createElement('div');
                investedLabel.className = 'chart-label';
                investedLabel.textContent = 'Invested';
                
                investedBar.appendChild(investedValue);
                investedBar.appendChild(investedLabel);
                
                // Create returns bar
                const returnsBar = document.createElement('div');
                returnsBar.className = 'chart-bar';
                returnsBar.style.height = `${returnsHeight}%`;
                returnsBar.style.opacity = '0.8';
                
                const returnsValue = document.createElement('div');
                returnsValue.className = 'chart-value';
                returnsValue.textContent = '₹' + formatNumber(estimatedReturns.toFixed(0));
                
                const returnsLabel = document.createElement('div');
                returnsLabel.className = 'chart-label';
                returnsLabel.textContent = 'Returns';
                
                returnsBar.appendChild(returnsValue);
                returnsBar.appendChild(returnsLabel);
                
                // Add bars to chart
                chartEl.appendChild(investedBar);
                chartEl.appendChild(returnsBar);
            }
        });
   
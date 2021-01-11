        function createSummaryTable(){

            let $summaryTable=$('#summaryTable');  

            $summaryTable
                .css({'font-size':'30pt'
                    })
                // .children('th').css('color','purple')
                .children('caption').css('font-size','40pt');

            $summaryTable
            .append('<thead></thead')
                .append('<tr></tr>')
                    .append('<td>Month</td>')
                    .append('<td>Mortgage</td>')
                    .append('<td id="debtsHead"></td>')
                    .append('<td id="billsHead"></td>')                   
                    .append('<td>Left</td>')
            
            var currentMonth=new Date().getMonth();
            let months=3;        
            for(let m=currentMonth; m<currentMonth+months; m++) {    
    
                //Debt data
                let debtTot=0             ;
                let debtName="2020_"+m+"_debtTable";
                $('.'+debtName).filter('td')
                .each(function(){
                    let x=parseFloat(this.innerText);
                        if(!isNaN(x))
                            debtTot += x; 
                });

                //Bills data
                let billName="2020_"+m+"_billsTable";
                
                let billsTot=0  
                $('.'+billName).filter('td').each(function(){
                    let x=parseFloat(this.innerText);
                        if(!isNaN(x))
                            billsTot += x; 
                });
                let leftTot=$('#salary').val()-billsTot-debtTot-(parseFloat($('#rent').val())+parseFloat($('#mortgage').val()));

                $summaryTable
                .append('<tr></tr>')
                    .append('<td>'+GetMonth(m)+'</td>')
                    .append('<td>'+(parseFloat($('#rent').val())+parseFloat($('#mortgage').val()))+'</td>')
                    .append('<td>'+parseFloat(debtTot)+'</td>')
                    .append('<td>'+parseFloat(billsTot.toFixed(2))+'</td>')                 
                    .append('<td>'+parseFloat(leftTot.toFixed(2))+'</td>');                
                               
            }
             $('#billsHead').append('<a href="Bills" id="billViewClick">Bills</a>');
             $('#debtsHead').append('<a href="Debts" id="debtViewClick">Debts</a>');
        }
     
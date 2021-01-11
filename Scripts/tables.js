const billsTableName="#billsTable";
const debtTableName="#debtTable";

    function createTables(){
            
        $debtTable=$(debtTableName);

        $('.myTable')
        .append('<thead> <tr> <td>Month</td> </tr> </thead> <tbody></tbody>')
                
        var currentMonth=new Date().getMonth();
        let months=3;   
        let monthArray=[];        
        
        for(let m=currentMonth; m<currentMonth+months; m++) {    
    
            $('.myTable')                
                .append('<tr><td class=2020_'+m+'>'+GetMonth(m)+'</td></tr>');

            let billArray=LoadFromLocalStorageByKey(m);
            let newBillArray=[];

            //month exists
            if(billArray){
                newBillArray=billArray;
            }        
            //add month
            else{  
                for(let i=0; i<localStorage.length-1; i++) {        
                    let bill=JSON.parse(localStorage.getItem(localStorage.key(i)));   
                    if(!bill.Company) 
                        continue;
                    newBillArray.push({billInfo:bill});
                }
            }
            newBillArray.forEach(function(bi){  
            
                let {Company
                ,Amount
                ,Frequency
                ,url
                ,isDebt} = bi.billInfo;
                var tableForInsert=isDebt?$debtTable:$(billsTableName);

                //Body data
                let tableName=(isDebt?"debtTable":"billsTable");
                let newClassName=("2020_"+m+"_")+tableName;

                let $lastTr=$(tableForInsert.find('tr:last'));                
                $lastTr.attr("data-value",tableName)
                       .append('<td class="'+newClassName+'" data-value='+Company+'>'+Amount+'</td>');
                
                //heading data
                if(m==currentMonth){

                $(tableForInsert).children('thead').find('tr:last')
                    .append('<td> <a id="billUrl" href='+`${url}`+'>'+Company+'</a> </td>');
            
                //add company to dropdown
                $('#billOpt').append('<option value='+Company+'>'+Company+'</option>');       
                }                       
            });    
        
            monthArray.push({month:m,billList:newBillArray});
        }    
        $debtTable
            .append('<tfoot></tfoot>')
            .append('<tr></tr>')
            .append('<td>Total OS</td>');

        SaveToLocalStorageByMonth(monthArray);
        }
    
    
   
   


// function createDebtTable(){
            
//     let debtTable=document.getElementById("debtTable");   
//     var thead =  document.createElement('thead')
//     var headingRow = document.createElement('tr')                 
//     var headingCell1 = document.createElement('td')
//     var headingText1 = document.createTextNode('Month')
//     headingCell1.appendChild(headingText1)
//     headingRow.appendChild(headingCell1)

//     thead.appendChild(headingRow)
//     debtTable.appendChild(thead);

//     var currentMonth=new Date().getMonth();
//     let months=3;                  
//     let monthArray;

    
//     for(let m=currentMonth; m<currentMonth+months; m++) {    
        
//         let newRow= debtTable.appendChild(document.createElement("tr")); 
//         let newCell = newRow.insertCell(-1);            
        
//         newCell.appendChild(document.createTextNode(GetMonth(m)));

//         let existing=LoadFromLocalStorageByKey(m);
//         let debtArray=[];

//         for(let i=0; i<(existing??localStorage).length-1; i++) {            
            
//             if(existing!=null)
//                 debtInfo=existing[i].billInfo;//use existing array based on the month            
//             else
//                 debtInfo=JSON.parse(localStorage.getItem(localStorage.key(i)));//iterate by company
            
//             //Body data
//             var bodyCell = document.createElement('td');   
            
//             var {Company,Amount,isDebt}=debtInfo; 
//             if(!Company ||!isDebt)
//                 continue;

//             var bodyText = document.createTextNode(Amount);
//             bodyCell.appendChild(bodyText);

//             newRow.appendChild(bodyCell);                
            
//             if(!existing)//New entry for month
//                 debtArray.push({debtInfo});                    
            
//             if(m!=currentMonth)
//                 continue;

//             //heading data
//             var headingCell2 = document.createElement('td')      
//             var headingText = document.createTextNode(Company);    
//             headingCell2.appendChild(headingText)                        
//             headingRow.appendChild(headingCell2);
//         }
//         if(debtArray.length>0)
//             monthArray.push({month:m,billList:debtArray});//update LocalStorage based on the month
//     }
//     if(monthArray.length>0)
//         SaveToLocalStorageByMonth(monthArray,false);
// }

    function ToggleDebtForm(month,show=true){                
        let form=document.getElementById('debtForm');
        if(show){
            form.style.display = "block";  
            form.getElementsByTagName("h1")[0].innerHTML ="Edit "+GetMonth(month);
            var monthArr=LoadFromLocalStorageByKey(month);
            var ele=document.getElementById("debtForm");
            
            monthArr.forEach(function(bill) {
                
                var input = document.createElement('input'); 
                input.setAttribute("id",bill.billInfo.Debtor); 
                input.setAttribute("value",bill.billInfo.Amount);

                var label = document.createElement('label');
                label.setAttribute("for",bill.billInfo.Debtor);
                label.innerHTML=bill.billInfo.Debtor;                                        
                
                ele.appendChild(input);
                ele.appendChild(label); 
            });
            let closeButton=document.getElementById('closeDebtEdit');
            closeButton.value=month;
            form.append(closeButton);
        }
        else
            form.style.display = "none"; 
        return false;
    }
    function btnSaveDebtsByMonth(){               
        let button=document.getElementById("closeDebtEdit");  
        let form=button.parentNode;
        let month =button.value;
        let inputs=form.querySelectorAll("input"); 
        
        let monthInfo=LoadFromLocalStorageByKey(month);

        if(!monthInfo)
        {
           alert('check data');
           return;
        }
        
        inputs.forEach(function(ii) {
            monthInfo.find(c=>c.debtInfo.Debtor==ii.id).debtInfo.Amount=ii.value;
        });  
        
        localStorage.setItem(month,JSON.stringify(monthInfo));      

        ToggleBillForm(-1,false);

    }
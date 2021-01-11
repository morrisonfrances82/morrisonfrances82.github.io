function WireEvents(){
    // $('.myTable tbody').on('click','td',function(){
    //     LoadBillForm(GetMonth(month,true),company,tableName);
    // });
    
    $('#login').click(function(){
        $('#billsTable').toggle();
        return false;
    });

    $('#debtViewClick').click(function(){
        $('#debtTable').toggle();
        return false;
    });
    $('#closeMonthEdit').click(function(){        
        $(this).parent().hide();
    });
    $('#billOpt').change(function(){
        //load
        if($('#billOpt').val())
        {
            let billInfo=LoadFromLocalStorageByKey($('#billOpt').val());
                if(!billInfo)
                {
                    alert('check data');
                            return;
                }

            $('#bill').val(billInfo.Amount);
            $('#company').val(billInfo.Company);
            $('#url').val(billInfo.url);
            $('input[name="frequency"]:checked').val(billInfo.Frequency);
            $('#debt').val('checked',billInfo.isDebt);
        }
    });

    $('#companyForm')
        .mouseenter(function(e){
        $(this).children('select')
        .css('background-color','pink');
    });

    //Add update bills
    $('.billButton').click(function(){
        let billInfo={
                    "Company":$('#company').val(),
                    "Amount":$('#bill').val(),
                    "Frequency":$('input[name="frequency"]:checked').val(),
                    "url":$('#url').val(),
                    "isDebt":$('#debt').prop('checked')
                }

        localStorage.setItem($('#company').val(),JSON.stringify(billInfo));
    });
}
    function SaveBillEvent(){
        $('#editBillForm input').on('change',function(){
            let month =$('#closeMonthEdit').val();
            let monthInfo=LoadFromLocalStorageByKey(month)
                           
            if(!monthInfo){
                alert('check data');
                return;
            }
            
            monthInfo.find(c=>c.billInfo.Company== $(this).get(0).id)
                                                          .billInfo.Amount= $(this).get(0).value;
            
            localStorage.setItem(month,JSON.stringify(monthInfo));
        });
        return false;
    }

    function LoadBillForm(month,company,tableName){

        let $form=$('#editBillForm');

        $form.css('display','block');
        $form.children('section')
              .css('display','block');

        $($form).find('input,label').each(function(){
            this.remove();
        })
        let sectionToShow=tableName=="debtTable"?$($form).find("#debtSect"):$($form).find("#billSect");

        $("#form h1").text("Edit "+GetMonth(month));
        var monthArr=LoadFromLocalStorageByKey(month);
        
        sectionToShow.css('display','block');
        monthArr.filter(r=>r.billInfo.isDebt==(tableName=="debtTable"))
            .forEach(function(bill) {
            let htmlInput='<input value='+bill.billInfo.Amount+' id='+bill.billInfo.Company+' name="'+bill.billInfo.Company+'"'+' ></input>';
            let htmllabel='<label for='+bill.billInfo.Company+'>'+bill.billInfo.Company+'</label>';

            sectionToShow.append(htmlInput).append(htmllabel);
            
        });
        let closeButton=$('form #closeMonthEdit').get(0)
        closeButton.value=month;
        $form.append(closeButton);
        $('#editBillForm #'+company+'')
        .css({'background-color':'red'});
        SaveBillEvent();
    }
    function HideBillForm(){
        $('#editBillForm').css('display','none');
        return false;
    };

    function SaveToLocalStorageByMonth(monthArr){
        monthArr.forEach(function(ma) {
            localStorage.setItem(JSON.stringify(ma.month),JSON.stringify(ma.billList));
        });
    };

    function LoadFromLocalStorageByKey(key){
        return JSON.parse(localStorage.getItem(key));
    }

function GetMonth(month){
    if(month>11)
        month-=12
    switch(month)
    {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "Aug";
        case 8:
            return "Sept";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";

        case "January":
            return 0;
        case "February":
            return 1;
        case "March":
            return 2;
        case "April":
            return 3;
        case "May":
            return 4;
        case "June":
            return 5;
        case "July":
            return 6;
        case "Aug":
            return 7;
        case "Sept":
            return 8;
        case "Oct":
            return 9;
        case "Nov":
            return 10;
        case "Dec":
            return 11;
    }
}


function LoadImages(dir,elem){
        
    var fileextension = ".jpg";
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            //List all .png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                var filename = this.href.replace(window.location.host, "").replace("http://", "");
                elem.append("<img src='" +  filename + "'>");
            });
        }});

}

// const billsTableName="#billsTable";
// const debtTableName="#debtTable";

//     function createTables(mArray){

//         //$billTable=$(billsTableName);
//         $debtTable=$(debtTableName);

//         $('.myTable')
//         .append('<thead> <tr> <td>Month</td> </tr> </thead> <tbody></tbody>')

//         var currentMonth=new Date().getMonth();
//         let months=3;
//         let monthArray=[];

//         for(let m=currentMonth; m<currentMonth+months; m++) {

//             $('.myTable')
//                 .append('<tr><td class=2020_'+m+'>'+GetMonth(m)+'</td></tr>');

//             let billArray=[];
//             billArray=(mArray.find( ({ month }) => month === m )?.billList
//              ??LoadFromLocalStorageByKey(m))?? [];

//             for(let i=0; i<localStorage.length-1; i++) {

//                 //Load Data
//                 let bill=JSON.parse(localStorage.getItem(localStorage.key(i)));

//                 let {Company,Amount,isDebt} = bill;

//                 if(!Company)
//                     continue;

//                 var tableForInsert=isDebt?$debtTable:$(billsTableName);
//                 //Body data
//                 let className=isDebt?"debtTable":"billsTable";
//                 $(tableForInsert.find('tr:last'))
//                     .append('<td class='+className+'>'+Amount+'</td>');

//                 //rename to include table
//                 let newClassName=("2020_"+m+"_")+(isDebt?"debtTable":"billsTable");
//                 $(tableForInsert).find('.2020_'+m).prop('className',newClassName);

//                 if(!billArray.find( ({ billInfo }) => billInfo.Company === bill.Company))
//                     billArray.push({billInfo:bill});

//                 if(m!=currentMonth)
//                     continue;
//                 let href=`${bill.url}`;
//                 //heading data
//                 $(tableForInsert).children('thead').find('tr:last')
//                     .append('<td> <a id="billUrl" href='+href+'>'+Company+'</a> </td>');

//                 //add company to dropdown
//                 var billDropDown=document.getElementById("billOpt");
//                 var el = document.createElement("option");
//                 el.textContent = Company;
//                 el.value = Company;
//                 billDropDown.appendChild(el);
//             }
//             //edit button
//             var editCell = document.createElement('td');

//             var editCellButton = document.createElement('button');
//             editCellButton.innerHTML="edit";
//             editCellButton.className="editBillLink";
//             editCellButton.type="button";
//             editCell.appendChild(editCellButton);

//             monthArray.push({month:m,billList:billArray});
//             }
//             $debtTable
//                 .append('<tfoot></tfoot>')
//                 .append('<tr></tr>')
//                 .append('<td>Total OS</td>');

//             $('.myTable')
//                 .find('tbody tr')
//                     .append('<td><button class="editBillLink" type="button">edit</button></td>')
//             return monthArray;
//         }

//             function GetMonth(month){
//                 switch(month)
//                 {
//                     case 0:
//                         return "January";
//                     case 1:
//                         return "February";
//                     case 2:
//                         return "March";
//                     case 3:
//                         return "April";
//                     case 4:
//                         return "May";
//                     case 5:
//                         return "June";
//                     case 6:
//                         return "July";
//                     case 7:
//                         return "Aug";
//                     case 8:
//                         return "Sept";
//                     case 9:
//                         return "Oct";
//                     case 10:
//                         return "Nov";
//                     case 11:
//                         return "Dec";

//                     case "January":
//                         return 0;
//                     case "February":
//                         return 1;
//                     case "March":
//                         return 2;
//                     case "April":
//                         return 3;
//                     case "May":
//                         return 4;
//                     case "June":
//                         return 5;
//                     case "July":
//                         return 6;
//                     case "Aug":
//                         return 7;
//                     case "Sept":
//                         return 8;
//                     case "Oct":
//                         return 9;
//                     case "Nov":
//                         return 10;
//                     case "Dec":
//                         return 11;
//                 }
//     }


// function ToggleTable(table,show){
//     if(show)
//         $(table).toggle();
//     else
//     {
//         $(table).hide();
//         return false;
//     }
// }
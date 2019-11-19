var btnSend = document.querySelector('.btnSend');
var btnStatus = document.querySelector('#btnStatusId');
var smallText = document.querySelector('#smallText');
var btnIconImg = document.querySelector('#btnIconImg');
var btnIcon = document.querySelector('#btnIconId');
var recordsDataList = document.querySelector('.recordsData');
// var recordsDataListDel = document.querySelector('#recordsDelete');
var data = JSON.parse(localStorage.getItem('listData')) || [];

function addData(e){
    e.preventDefault();
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;
    var BMI = weight / [(height/100)*(height/100)];
    BMI = BMI.toFixed(2);
    
    if (height == ''){
        alert('請輸入身高');
        return;
    } else if (weight == ''){
        alert('請輸入體重');
        return;
    } else if ( isNaN(BMI)){
        alert('請輸入正確的數值');
        return;
    }
    btnSend.style.visibility = 'hidden';
    btnIconImg.style.visibility = 'visible';
    // var btnStatus = document.querySelector('#btnStatusId');
    var btnInfo1 = document.querySelector('#btnInfoId1');
    var btnInfo2 = document.querySelector('#btnInfoId2');
    // var btnIcon = document.querySelector('#btnIconId');
    var info2Text= document.querySelector('#info2Text')
    btnInfo1.innerHTML= '<p>'+ BMI +'</p>' + '<small>BMI</small>'


    if(18.5 <= BMI && BMI <24){
        btnStatus.className = 'btnGood';
        btnInfo1.className = 'goodInfo1';
        btnInfo2.className = 'goodInfo2';
        info2Text.textContent = '理想';
        btnIcon.className = 'goodIcon';
        status = '理想';
        recordsColor = 'good';
    }else if(BMI < 18.5){
        btnStatus.className = 'btnThin';
        btnInfo1.className = 'thinInfo1';
        btnInfo2.className = 'thinInfo2';
        info2Text.textContent = '過輕';
        btnIcon.className = 'thinIcon';
        status = '過輕';
        recordsColor = 'thin';
    }else if(24 <= BMI && BMI < 27){
        btnStatus.className = 'btnBad';
        btnInfo1.className = 'badInfo1';
        btnInfo2.className = 'badInfo2';
        info2Text.textContent = '過重';
        btnIcon.className = 'badIcon';
        status = '過重';
        recordsColor = 'bad';
    }else if(27 <= BMI && BMI <30){
        btnStatus.className = 'btnOverLv1';
        btnInfo1.className = 'overLv1Info1';
        btnInfo2.className = 'overLv1Info2';
        info2Text.textContent = '輕度肥胖';
        btnIcon.className = 'overLv1Icon';
        status = '輕度肥胖';
        recordsColor = 'overLv1';
    }else if(30 <= BMI && BMI <35){
        btnStatus.className = 'btnOverLv2';
        btnInfo1.className = 'overLv2Info1';
        btnInfo2.className = 'overLv2Info2';
        info2Text.textContent = '中度肥胖';
        btnIcon.className = 'overLv2Icon';
        status = '中度肥胖';
        recordsColor = 'overLv2';
    }else if(BMI >= 35){
        btnStatus.className = 'btnOverLv3';
        btnInfo1.className = 'overLv3Info1';
        btnInfo2.className = 'overLv3Info2';
        info2Text.textContent = '重度肥胖';
        btnIcon.className = 'overLv3Icon';
        status = '重度肥胖';
        recordsColor = 'overLv3';
    }

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day  = date.getDate();
    var hours = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var time = year +'-'+ month +'-'+ day +'  '+ hours +':'+ min;

    var recordsData = {
        Height: height,
        Weight: weight,
        BMI: BMI,
        Status: status,
        RecordsColor: recordsColor,
        Time: time,
    }


    // console.log(recordsData);
    // data.push(recordsData);
    data.unshift(recordsData);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));
}

function updateList(){
    var str = '';
    var len = data.length;
    for(var i=0; i<len; i++){
        str += '<div data-num="'+ i +'" class="'+ data[i].RecordsColor +'">';
        str += '<h2>'+ data[i].Status +'</h2>';
        str += '<div><small>BMI</small>'+ data[i].BMI +'</div>';
        str += '<div><small>體重</small>'+ data[i].Weight +'kg</div>';
        str += '<div><small>身高</small>'+ data[i].Height +'cm</div>';
        str+= '<div><small>'+ data[i].Time +'</small></div>'
        str += '<div><img data-num="'+ i +'" id="recordsDelete" src="img/forbidden-mark.svg"></div>';
        str += '</div>';
    }
    recordsDataList.innerHTML = str;
    // console.log('update');
}

function refresh(){
    window.location.reload();
}

function deleteList(e) {
    // console.log(e);
    var del = event.target.id;
    var str = event.target.dataset.num;
    console.log(event.target.dataset);
    if (del !== 'recordsDelete') {return;}
    data.splice(str,1);
    localStorage.setItem('listData',JSON.stringify(data));
    updateList();
  }

btnSend.addEventListener('click',addData);
btnIcon.addEventListener('click',refresh);
recordsDataList.addEventListener('click',deleteList);
updateList();
// refresh();

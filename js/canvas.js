/**
 * Created by airing on 15/7/15.
 */

function drawHeader(cxt){
    cxt.beginPath();
    cxt.rect(0, 0, 750, 128);
    
    var my_gradient=cxt.createLinearGradient(0, 0, 0, 128);
    my_gradient.addColorStop(0,"#0571CB");
    my_gradient.addColorStop(1,"#1891CA");
    cxt.fillStyle=my_gradient;
    cxt.fill();

    //运营商
    cxt.beginPath();
    var statusBar = new Image();
    statusBar.src = "./images/service.png";
    statusBar.onload = function(){
        cxt.drawImage(statusBar, 0, 0);
    };

    //跑步图标
    cxt.beginPath();
    var runningBtn = new Image();
    runningBtn.src = "./images/running.png";
    runningBtn.onload = function(){
        cxt.drawImage(runningBtn, 580, 348);
    };

    //电池
    cxt.beginPath();
    var battery = new Image();
    battery.src = "./images/battery.png";
    battery.onload = function(){
        cxt.drawImage(battery, 630, 0);
    };


    //退出按钮
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.strokeStyle = '#ffffff';
    cxt.moveTo(46, 66);
    cxt.lineTo(32, 81);
    cxt.lineTo(46, 96);
    cxt.stroke();

    //左箭头
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.strokeStyle = '#929292';
    cxt.moveTo(224, 196);
    cxt.lineTo(211, 210);
    cxt.lineTo(224, 223);
    cxt.stroke();

    //右箭头
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.strokeStyle = '#929292';
    cxt.moveTo(512, 196);
    cxt.lineTo(526, 210);
    cxt.lineTo(512, 223);
    cxt.stroke();

    //年月
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    cxt.font ="38px STHeitiSC-Medium";  //TODO
    cxt.fillStyle = "rgb(13,13,13)";
    cxt.textAlign = "left";
    cxt.textBaseline = "top";
    cxt.fillText(year+"-"+month+"月",295, 185);


    cxt.beginPath();
    cxt.font ="24px STHeitiSC-Medium"; // iOS
//    cxt.font ="lighter 22px Helvetica Neue";  //TODO
    cxt.fillStyle = "white";
    cxt.textAlign = "left";
    cxt.textBaseline = "top";
    cxt.fillText("16:59", 330, 2);
    

    cxt.beginPath();
//    cxt.font ="lighter 22px _H_HelveticaNeue"; // iOS
    cxt.font ="32px STHeitiSC-Medium";  //TODO
    cxt.fillStyle = "white";
    cxt.textAlign = "left";
    cxt.textBaseline = "top";
    cxt.fillText("月统计", 313, 60);

}

function genRandomStepData(num){
    var lowBound = 4333;
    var highBound = 23333;
    var stepNumArray = new Array(num);

    for (var i=0; i<num; i++)
    {
        var stepNum = lowBound + Math.random()*(highBound - lowBound);
        stepNumArray[i] = parseInt(stepNum, 10);
    }

    return stepNumArray;
}

function getDayNum(){
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var dayNum = 31;
    if (month == '1'||month == '3'||month == '5'||month == '7'||month == '8'||month == '10'||month == '12'){
        dayNum = 31;
    }else if(month == '4'||month == '6'||month == '9'||month == '11'){
        dayNum = 30;
    }else{
        if(((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)){
            dayNum = 29;
        }else{
            dayNum = 28;
        }
    }
    return dayNum;
}

function drawStepChart(cxt){
    var barColor = "#FF6185";
    var barWidth = 9;
    var barInterval = 16;
    var barStartX = 123;
    var barMaxY = 495;
    var barBaseY = 675;

    var dayNum = getDayNum();

    var stepNumArray = genRandomStepData(dayNum);
//    var stepNumArray = new Array();
    var maxStep = 0;
    var maxStepIndex = -1;
    var avgStep = 0;
    for (var i=0; i<dayNum; i++)
    {
        if (stepNumArray[i] > maxStep){
            maxStep = stepNumArray[i];
            maxStepIndex = i;
        }
        avgStep += stepNumArray[i];
    }
    avgStep = parseInt(avgStep / dayNum, 10);

    //步数
    cxt.beginPath();
    var stepsBar = new Image();
    stepsBar.src = "./images/stepsbar.png";
    stepsBar.onload = function(){
        cxt.drawImage(stepsBar, 0, 280);
//    cxt.font ="lighter 22px _H_HelveticaNeue"; // iOS
        cxt.font ="30px STHeitiSC-Medium";  //TODO
        cxt.fillStyle = "rgb(110,110,110)";
        cxt.textAlign = "right";
        cxt.textBaseline = "top";
        cxt.fillText("平均值 "+avgStep+"步",720,295);
    };

    //步数
    cxt.beginPath();
    var stepTitle = new Image();
    stepTitle.src = "./images/steptitle.png";
    stepTitle.onload = function(){
        cxt.drawImage(stepTitle, 0, 348);
    };

    //步数直方图
    cxt.beginPath();
    var stepsAxis = new Image();
    stepsAxis.src = "./images/xaxis.png";
    stepsAxis.onload = function(){
        cxt.drawImage(stepsAxis, 0, 675);
    };

    for (var i=0; i<dayNum; i++)
    {
        cxt.beginPath();
        var realStartX = barStartX+barInterval*i
        var realHeight = (stepNumArray[i] / maxStep) * (barBaseY - barMaxY);
        realHeight = parseInt(realHeight, 10);
        cxt.rect(realStartX, barBaseY - realHeight, barWidth, realHeight);

        cxt.fillStyle = "rgb(255, 94, 131)";
        cxt.fill();
    }

    //平均的虚线
    var dashLineY = barBaseY - (avgStep / maxStep) * (barBaseY - barMaxY);
    drawDashLine(cxt, dashLineY);

    
    //跑步最大值的小圆圈
    cxt.beginPath();
    cxt.arc(barStartX + maxStepIndex*barInterval + 4, barMaxY, 4, 0, Math.PI*2, false);
    cxt.fillStyle = "#FFFFFF";
    cxt.fill();
    cxt.arc(barStartX + maxStepIndex*barInterval + 5, barMaxY, 4, 0, Math.PI*2, false);
    cxt.lineWidth = 2;
    cxt.strokeStyle = "rgb(188,60,93)";
    cxt.stroke();

    //跑步最大值
    cxt.beginPath();
    cxt.font ="24px STHeitiSC-Light";  //TODO
    cxt.fillStyle = "rgb(82,82,82)";
    cxt.textAlign = "left";
    cxt.textBaseline = "top";
    cxt.fillText(maxStep+"步",barStartX + maxStepIndex*barInterval - 40,450);
}

function drawDashLine(cxt, y){
    //虚线
    var beginX = 30;
    var dashWidth = 4;
    var dashInterval=5;
    var endX = 720;
/*
    cxt.beginPath();
    var leftNode = new Image();
    leftNode.src = "./images/dashleftnode.png";
    leftNode.onload = function(){
        cxt.drawImage(leftNode, 30, y-3);
    };
    */
/*
    cxt.beginPath();
    var dashline = new Image();
    dashline.src = "./images/dashline.png";
    dashline.onload = function(){
        cxt.save();
        cxt.globalAlpha = 0.6;
        cxt.drawImage(dashline, 40, y);
        cxt.restore();
    };
    */

    for(var x=beginX;x<endX;x=x+dashInterval){
        cxt.beginPath();
        cxt.lineWidth = 1;
        cxt.strokeStyle = "rgb(220,220,220)";
        cxt.moveTo(x, y);
        cxt.lineTo(x+dashWidth, y);
        cxt.stroke();
    }
/*
    cxt.beginPath();
    var rightNode = new Image();
    rightNode.src = "./images/dashrightnode.png";
    rightNode.onload = function(){
        cxt.drawImage(rightNode, 713, y-3);
    };
    */
}
/*
function drawDashLine(cxt, y){
    //虚线
    var beginX = 35;
    var dashWidht = 4;
    var dashSpace = 1;
    var endX = 713;

    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.strokeStyle = "rgb(218,218,218)";

    for (var x=beginX; x<=endX; x=x+dashWidht+dashSpace)
    {
        cxt.moveTo(x, y);
        cxt.lineTo(x+dashWidht, y);
        cxt.stroke();
    }
}
*/

function genRandomSleepData(num){
    var lowBound = 360; //minutes
    var highBound = 500; //minutes
    var sleepNumArray = new Array(num);

    for (var i=0; i<num; i++)
    {
        var sleepNum = lowBound + Math.random()*(highBound - lowBound);
        sleepNumArray[i] = parseInt(sleepNum, 10);
    }

    return sleepNumArray;
}

function drawSleepChart(cxt){
    var barColor = "#DCCFE9";
    var circleColor = "#705393";
//    var barWidth = 9;
    var barInterval = 16;
    var barStartX = 130;
    var barMaxY = 910;
    var barBaseY = 1040;

    var dayNum = getDayNum();

/*
    //睡觉时间
    cxt.beginPath();
    var sleepbar = new Image();
    sleepbar.src = "./images/sleepbar.png";
    sleepbar.onload = function(){
        cxt.drawImage(sleepbar, 0, 768);
//    cxt.font ="lighter 22px _H_HelveticaNeue"; // iOS
        cxt.font ="28px STHeitiSC-Light";  //TODO
        cxt.fillStyle = "rgb(82,82,82)";
        cxt.textAlign = "right";
        cxt.textBaseline = "top";
        cxt.fillText("平均值"+0+"小时"+"分钟",720,790);
    };
    */

    var sleepNumArray = genRandomSleepData(dayNum);
    var maxSleep = 0;
    var maxSleepIndex = -1;
    var avgSleep = 0;
    for (var i=0; i<dayNum; i++)
    {
        if (sleepNumArray[i] > maxSleep){
            maxSleep = sleepNumArray[i];
            maxSleepIndex = i;
        }
        avgSleep += sleepNumArray[i];
    }
    avgSleep = parseInt(avgSleep / dayNum, 10);
    var avgSleepHour = parseInt(avgSleep/60, 10);
    var avgSleepMin = Math.round(avgSleep%60);
    var maxSleepHour = parseInt(maxSleep/60, 10);
    var maxSleepMin = Math.round(maxSleep%60);

    //睡觉时间
    cxt.beginPath();
    var sleepsBar = new Image();
    sleepsBar.src = "./images/sleepbar.png";
    sleepsBar.onload = function(){
        cxt.drawImage(sleepsBar, 0, 768);
//    cxt.font ="lighter 22px _H_HelveticaNeue"; // iOS
        cxt.font ="30px STHeitiSC-Medium";  //TODO
        cxt.fillStyle = "rgb(110,110,110)";
        cxt.textAlign = "right";
        cxt.textBaseline = "top";
        cxt.fillText("平均值 "+avgSleepHour+"小时"+avgSleepMin+"分钟",720,782);
    };


    //睡眠直方图
    cxt.beginPath();
    var sleepsAxis = new Image();
    sleepsAxis.src = "./images/xaxis.png";
    sleepsAxis.onload = function(){
        cxt.drawImage(sleepsAxis, 0, 1039);
    };

    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.strokeStyle = barColor;
    cxt.moveTo(barStartX, barBaseY);
    
    for (var i=0; i<dayNum; i++)
    {
        var realStartX = barStartX+barInterval*i
        var realHeight = (sleepNumArray[i] / maxSleep) * (barBaseY - barMaxY);
        realHeight = parseInt(realHeight, 10);
//        cxt.rect(realStartX, barBaseY - realHeight, barWidth, realHeight);

//        cxt.beginPath();
        cxt.lineTo(realStartX, barBaseY - realHeight);
        cxt.stroke();
    }
    cxt.lineWidth = 1;
    cxt.strokeStyle = barColor;
    cxt.lineTo(barStartX + (dayNum-1)*barInterval, barBaseY);
    cxt.stroke();

    cxt.closePath();
    cxt.fillStyle = barColor;
    cxt.fill();

    //纵向虚线
    for (var i=0; i<dayNum; i++)
    {
        genVerticalDashline(cxt, i);
    }

    //平均的虚线
    var dashLineY = barBaseY - (avgSleep / maxSleep) * (barBaseY - barMaxY);
    drawDashLine(cxt, dashLineY);

    //睡觉圆圈之间的粗线
    cxt.beginPath();
    cxt.lineWidth = 3;
    cxt.strokeStyle = circleColor;
    var X0 = barStartX;
    var Y0 = barBaseY - (sleepNumArray[0] / maxSleep) * (barBaseY - barMaxY);
    Y0 = parseInt(Y0, 10);

    cxt.moveTo(X0, Y0);
    for (var i=1; i<dayNum; i++)
    {
        var realStartX = barStartX+barInterval*i
        var realHeight = (sleepNumArray[i] / maxSleep) * (barBaseY - barMaxY);
        realHeight = parseInt(realHeight, 10);
        cxt.lineWidth = 3;
        cxt.strokeStyle = circleColor;
        cxt.lineTo(realStartX, barBaseY - realHeight);
        cxt.stroke();
    }

    //睡觉每天的圆圈
    for (var i=0; i<dayNum; i++)
    {
        cxt.beginPath();
        var realStartX = barStartX+barInterval*i
        var realHeight = (sleepNumArray[i] / maxSleep) * (barBaseY - barMaxY);
        realHeight = parseInt(realHeight, 10);

        cxt.arc(realStartX - 1, barBaseY - realHeight, 4, 0, Math.PI*2, false);
        cxt.fillStyle = "#FFFFFF";
        cxt.fill();
        cxt.arc(realStartX - 1, barBaseY - realHeight, 5, 0, Math.PI*2, false);
        cxt.lineWidth = 2;
        cxt.strokeStyle = circleColor;
        cxt.stroke();
    }

    //睡觉最大值的圆圈
    cxt.beginPath();
    cxt.arc(barStartX + maxSleepIndex*barInterval - 1, barMaxY, 5, 0, Math.PI*2, false);
    cxt.fillStyle = circleColor;
    cxt.fill();
    
    //睡觉最大值
    cxt.beginPath();
    cxt.font ="24px STHeitiSC-Light";  //TODO
    cxt.fillStyle = "rgb(82,82,82)";
    cxt.textAlign = "left";
    cxt.textBaseline = "top";
    cxt.fillText(maxSleepHour+"小时"+maxSleepMin+"分钟",barStartX + maxSleepIndex*barInterval - 40,865);


}

function genVerticalDashline(cxt,i){
    var beginX=130;
    var baseY=1039;
    var endY=910;
    var width=16;
    var dashInterval=3;
    var dashLength=2;
    for(var y=baseY;y>endY;y=y-dashInterval){
        cxt.beginPath();
        cxt.strokeStyle = "rgb(171,171,171)";
        cxt.moveTo(beginX+i*width, y);
        cxt.lineTo(beginX+i*width, y-dashLength);
        cxt.stroke();
    }
}


function putContentView(cxt){
//    alert("呀");
//    mainView(cxt);
    drawHeader(cxt);
    drawStepChart(cxt);
    drawSleepChart(cxt);
}

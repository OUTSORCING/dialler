$(document).ready(function() {
	$('.cupAction-start-button').click(function(){fcStartCalck();});
	$('#calcModalClose').click(function(){fcClearModal($(this).attr('id'));});
	$('.cupAction-calcModal').click(function(){fcShowModal($(this).attr('buttonCalcModal'));});
	$('.cupAction-calculate').click(function(){fcCalculate();});
	$('#step1_DB_v1').click(function(){fcShowDBcalc('none');});
	$('#step1_DB_v2').click(function(){fcShowDBcalc('none');});
	$('#step1_DB_v3').click(function(){fcShowDBcalc('block');});
	$('#step3_ivr_v2').click(function(){fcShowIVRcalc('block');});
	$('#step3_ivr_v1').click(function(){fcShowIVRcalc('none');});
	$('.cupAction-navi').click(function(){fcGoToStep(null,$(this).attr('id'));});
	$('.cupAction-calculate').change(function(){fcCalculate();});
	$('.cupAction-calculate').keyup(function(){fcCalculate();});
	$('#step10_tel').mask('+38(000) 000-00-00, +38(000) 000-00-00, +38(000) 000-00-00');
	$('#send_order').click(function(){fcSentOrder();});
	$('.cupAction-getPack').click(function(){fcSentPricePack($(this).attr('id'));});
	$('#upToPrice').click(function(){
		$('#start_button').css({'display': 'block'});
		$('#headerTitle').css({'display': 'none'});
	});
});

function fcStartCalck(){
	let myLog='run fcStartCalc';
	console.log(myLog);
	//$('#start_button').css({'display': 'none'});
	$('.cupAction-calc-start-block').css({'display': 'block'});
	$('.cupAction-navi-title').css({'display': 'block'});
	$('#upToPrice').css({'display': 'block'});
	fcGoToStep(1); 
};

function fcGoToStep(currentStepNum,buttonID){
	console.log('run fcGoToStep');
	
	var myStepsArray = []; var j=0; var nextStepNum=0;
	
	//get steps list
	$('.cupAction-calc-step-block').each(function(i){
		j++; myStepsArray[i]=j; console.log('i='+i+' j='+j+' myStepsArray='+j);
	});
	var countSteps = Math.max.apply(null, myStepsArray);
	
	nextStepNum=fcGoToStep_GetStepNumber(currentStepNum,buttonID,myStepsArray,countSteps);
	
	console.log('currentStepNum='+currentStepNum+' | nextStepNum='+nextStepNum+' | countSteps='+countSteps);
	
	if(fcCalculate()){
		fcGoToStep_ChangeProgressbar(nextStepNum,countSteps);
		fcGoToStep_ViewCurrentStep(nextStepNum,countSteps);
		fcGoToStep_ViewCurrentNaigation(nextStepNum,countSteps);
	};
	
	$('#start_button').css({'display': 'none'});
	$('#headerTitle').css({'display': 'none'});
	//$("html,body").scrollTop($('#nav_panel').offset().top -245);
};

function fcGoToStep_GetStepNumber(currentStepNum,buttonID,myStepsArray,countSteps){
	console.log('run fcGoToStep_GetStepNumber');
	var nextStepNum=0;
	
	//get next step
	if (currentStepNum && $.inArray(currentStepNum, myStepsArray) !== -1) {
		console.log('input currentStepNum='+currentStepNum+" currentStepNum correct.");
		nextStepNum=currentStepNum;
	} else {
		currentStepNum=$('#currentStepNum').val();
		console.log("currentStepNum get from  DOM = "+currentStepNum+' | buttonID='+buttonID);
		if(buttonID == 'btn_back'){
			console.log('run step_back');
			nextStepNum=currentStepNum*1 - 1;
		};
		if(buttonID == 'btn_next'){
			console.log('run step_next');
			nextStepNum=currentStepNum*1 + 1;
		};
	};
	if(nextStepNum*1 < 1 ){nextStepNum=1;};
	if(nextStepNum*1 > countSteps*1 ){nextStepNum=countSteps*1;};
	
	console.log('set currentStepNum='+nextStepNum);
	$('#currentStepNum').val(nextStepNum);
	
	return nextStepNum;
}

function fcGoToStep_ChangeProgressbar(currentStepNum,countSteps){
	console.log("run fcGoToStep_ChangeProgressbar");
	let stepTitle=$('#step'+currentStepNum).attr('mytitle');
	$('#step_name').html('Крок '+currentStepNum+' із '+countSteps+': '+stepTitle+'.');
	let progresProcent=	((currentStepNum *100 / countSteps).toFixed(0));
	console.log("progresProcent= "+progresProcent);
	$('#step_progres').css({'width': progresProcent+'%'});
	$('#step_progres').html(progresProcent+'%');
};

function fcGoToStep_ViewCurrentStep(currentStepNum,countSteps){
	console.log("run fcGoToStep_ViewCurrentStep");
	$('.cupAction-calc-step-block').css({'display': 'none'});
	$('#step'+currentStepNum).css({'display': 'block'});
};

function fcGoToStep_ViewCurrentNaigation(currentStepNum,countSteps){
	console.log("run fcGoToStep_ViewCurrentNaigation");
	if(currentStepNum*1 < 2){
		console.log("currentStepNum*1 < 2");
		$('#step_back').css({'display': 'none'});
		$('#step_next').css({'display': 'block'});
		$('#send_order').css({'display': 'none'});
	};
	if(currentStepNum*1 > 1 && currentStepNum*1 < countSteps*1){
		console.log("currentStepNum*1 > 1 && currentStepNum*1 < countSteps*1");
		$('#step_back').css({'display': 'block'});
		$('#step_next').css({'display': 'block'});
		$('#send_order').css({'display': 'none'});
	};	
	if(currentStepNum*1 == countSteps*1){
		console.log("currentStepNum*1 == countSteps*1");
		$('#step_back').css({'display': 'block'});
		$('#step_next').css({'display': 'none'});
		$('#send_order').css({'display': 'block'});
	};
};

function fcClearModal(modalID){
	console.log("run fcGoToStep_ViewCurrentStep");
	console.log("modalID="+modalID);
	if(modalID=='calcModalClose'){
		$('#calcModalTitle').html('');
		$('#calcModalBody').html('');
	};
};

function fcShowModal(buttonCalcModal,secondArgument){
	console.log("run fcShowModal");
	console.log("buttonCalcModal="+buttonCalcModal);
	if(buttonCalcModal=='basket-list'){
		fcShowModal_BasketList();
	};
	if(buttonCalcModal=='error-allert'){
		fcShowModal_ErrorAllert(secondArgument);
	};
	if(buttonCalcModal=='order-respons'){
		fcShowModal_OrderRespons(secondArgument);
	};
};

function fcShowModal_BasketList(){
	console.log("run fcShowModal_BasketList");
	if(fcCalculate()){
		$('#calcModalTitle').html('Кошик');
		let bodyBasketList=$('#bodyBasketList').html();
		//alert (bodyBasketList);
		$('#calcModalBody').html(bodyBasketList);
	}else{
		return false;
	};
	
};

function fcShowModal_ErrorAllert(ErrorAllert){
	console.log("run fcShowModal_ErrorAllert");
	$('#calcModalTitle').html('Помилка');
	$('#calcModalBody').html(ErrorAllert);
	$('#calcModal').modal('show');
};

function fcShowModal_OrderRespons(secondArgument){
	console.log("run fcShowModal_OrderRespons="+secondArgument);
	if(secondArgument.length > 3 ){
		console.log("length fcShowModal_OrderRespons > 3");
		$('#calcModalTitle').html('Заявку надіслано');
		$('#calcModalBody').html(secondArgument);
		$('#calcModal').modal('show');
	}else{
		console.log("length fcShowModal_OrderRespons <=3");
		$('#calcModalTitle').html('Заявку надіслано');
		$('#calcModalBody').html('На вашу скриньку було надіслано копію замовлення. Наш менеджер зв\'яжеться з вам найближчим часом');
		$('#calcModal').modal('show');
	};		
};

function fcShowDBcalc(action){
	console.log("run fcShowDBcalc");
	if(action=='block'){
		console.log("show block DBcalc");
		$('#blockDBcalc').css({'display': 'block'});
	};
	if(action=='none'){
		console.log("colaps block DBcalc");
		$('#blockDBcalc').css({'display': 'none'});
	};
};

function fcShowIVRcalc(action){
	console.log("run fcShowIVRcalc");
	if(action=='block'){
		console.log("show block IVRcalc");
		$('#blockIVR').css({'display': 'block'});
	};
	if(action=='none'){
		console.log("colaps block IVRcalc");
		$('#blockIVR').css({'display': 'none'});
	};
};

function fcCalculate(){
	console.log("run fcCalculate");
	const minAllPrice=4500; const minPriceOneMsg=0.3; const minDiallCount=3; const minListenTime=1;  
		
	var priceDB=fcCalculate_OneDB(); console.log("priceDB="+priceDB);
	if(priceDB =='error'){
		priceList=['???', '???', '???'];
		fcSetPriceInBasket(priceList);
		return false;
	};
	
	var paymentFor=0;
	if($('input[name=paymentFor]:checked').val()==='delivered'){paymentFor=0.54;};
	
	var priceIVR=fcCalculate_OneIVR(); console.log("priceIVR="+priceIVR);
	if(priceIVR =='error'){
		priceList=['???', '???', '???'];
		fcSetPriceInBasket(priceList);
		return false;
	};
	
	var DiallCount=minDiallCount; var procentDiallCount=0;
	if(1*($('#step4_diallCount').val()) > 1*minDiallCount){
		DiallCount=1 * $('#step4_diallCount').val(); 
		procentDiallCount=((1*DiallCount - 1*minDiallCount)*0.25 +1).toFixed(2);
	}else{$('#step4_diallCount').val(minDiallCount);};
	console.log("DiallCount="+DiallCount+" | procentDiallCount="+procentDiallCount);
	
	var ListenTime=minListenTime; var procentListenTime=0;
	var kfListenTime=[0,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,2,2.3,2.6,3,3.5,4,4.5,5,5.5,6,6.5,7,10,15,20,25,50,75,100,1000,10000,100000,1000000];
	if(1*($('#step4_listenTime').val()) > minListenTime){
		ListenTime=(1*$('#step4_listenTime').val()).toFixed(0); 
		if(ListenTime > 31){ListenTime=31;};
		procentListenTime=(kfListenTime[(1*ListenTime)]).toFixed(2);
	}else{$('#step4_listenTime').val(minListenTime);};
	console.log("ListenTime="+ListenTime+" | procentListenTime="+procentListenTime);
	
	if(priceDB==0 || paymentFor==0){
		DiallCount=minDiallCount; procentDiallCount=0; ListenTime=0; procentListenTime=0;
		$("#step4_diallCount").val(minDiallCount);
		$("#step4_listenTime").val(0);
		$("#step4_diallCount").prop("disabled", true);
		$("#step4_listenTime").prop("disabled", true);
	};
	
    var countCharsInTextMSG = $('#step5_textMSG').val().length;
    var countBlocksInTextMSG = Math.ceil(countCharsInTextMSG/100);
	if(countBlocksInTextMSG < 1){countBlocksInTextMSG = 1;};
    $('#step5_countCharsInTextMSG').html(countCharsInTextMSG); 
	$('#step5_countBlocksInTextMSG').html(countBlocksInTextMSG);
	
	var basePriceOneMsg=1*((minPriceOneMsg*countBlocksInTextMSG*1 + paymentFor*1).toFixed(2)) ;
	var priceDiallCount=1*((1*procentDiallCount*basePriceOneMsg).toFixed(2));
	var priceListenTime=1*((1*procentListenTime*basePriceOneMsg).toFixed(2));
		
	var priceOneMsg=basePriceOneMsg*1 + priceDB*1 + priceIVR*1 + priceDiallCount*1 + priceListenTime*1;	
	priceOneMsg=1*(priceOneMsg.toFixed(2));
	console.log('priceOneMsg='+priceOneMsg);
	
	const voice=$('input[name=voice]:checked').val();
	var priceVoice=0; if(voice == 2){priceVoice=240;}; if(voice == 3){priceVoice=730;};
	console.log("voice="+voice+" | priceVoice="+priceVoice);
	
	const channel=$('input[name=channel]:checked').val();
	var priceChannel=500; if(channel == 2){priceChannel=1000;}; if(channel == 3){priceChannel=1500;};
	console.log("channel="+channel+" | priceChannel="+priceChannel); 
	
	const calendar=$('input[name=calendar]:checked').val();
	var priceCalendar=0; if(calendar == 2){priceCalendar=1800;};
	console.log("calendar="+calendar+" | priceCalendar="+priceCalendar);
	
	const CRM=$('input[name=CRM]:checked').val();
	var priceCRM=0; if(CRM == 2){priceCRM=1200;};
	console.log("CRM="+CRM+" | priceCRM="+priceCRM);
	
	console.log('countMsg'+$('#step5_countMSG').val());
	var countMsg=(1*$('#step5_countMSG').val()).toFixed(0);
	var priceAllMsg=(1*priceOneMsg*countMsg + 1*priceVoice + 1*priceChannel + 1*priceCRM + 1*priceCalendar).toFixed(2);
	if(priceAllMsg < minAllPrice){
		priceAllMsg=minAllPrice;
		/*
		countMsg=Math.ceil((minAllPrice*1 - priceVoice*1 - priceChannel*1 - priceCRM*1 - priceCalendar*1)/priceOneMsg*1);
		priceAllMsg=1*((countMsg*priceOneMsg*1 + 1*priceVoice + 1*priceChannel + 1*priceCRM + 1*priceCalendar).toFixed(2));
		$('#step5_countMSG').val(countMsg);
		$('#step5_countMSG').attr('min',countMsg);
		*/
	}else{$('#step5_countMSG').attr('min',1);};
	
	var priceList=[priceOneMsg, countMsg, priceAllMsg, basePriceOneMsg, priceDB, paymentFor, priceIVR, DiallCount, ListenTime, countBlocksInTextMSG, priceVoice, priceChannel, priceCalendar, priceCRM];
	fcSetPriceInBasket(priceList);
	
	return true;
	alert('ШО???');
};

function fcCalculate_OneDB(){
	console.log("run fcCalculate_OneDB");
	var priceDB='error';
	const minPriceForOneDBCreatedHuman=26;
	const database=$('input[name=database]:checked').val();
	console.log('database='+database);
	if(database!=1 && database!=2 && database!=3){
		fcShowModal('error-allert','Не вибрано способу формування бази');
		return 'error';
	};
	
	if(database==1){priceDB=0;
		$("#step2_paymentFor_v1").prop("disabled", true);
		$("#step2_paymentFor_v1").prop("checked", true);
		$("#step4_diallCount").prop("disabled", true);
		$("#step4_listenTime").prop("disabled", true);
	};
	if(database==2){priceDB=3.99; 
		$("#step2_paymentFor_v1").prop("disabled", false);
		$("#step4_diallCount").prop("disabled", false);
		$("#step4_listenTime").prop("disabled", false);
	};
	if(database==3){fcShowDBcalc('block');
		$("#step2_paymentFor_v1").prop("disabled", false);
		$("#step4_diallCount").prop("disabled", false);
		$("#step4_listenTime").prop("disabled", false);
		priceDB=0;
		var company=1; var phone=1; var email=0; var lide=0; var person=0;
		if(!($('#blockDBcalc_company').is(':checked'))){
			fcShowModal('error-allert','Поле "Назва компанії" є обов\'язковим');
		};
		if(!($('#blockDBcalc_phone').is(':checked'))){
			fcShowModal('error-allert','Поле "Телефон" є обов\'язковим');
		};
		if($('#blockDBcalc_email').is(':checked')){email=1;};
		if($('#blockDBcalc_lide').is(':checked')){lide=1;};
		if($('#blockDBcalc_person').is(':checked')){person=1;};
	
		console.log("company="+company+" | phone="+phone+" | email="+email+" | lide="+lide+" | person="+person);
		priceDB=25*company + 4.9*phone + 3.6*email + 22*lide + 55.7*person;
		
		if(priceDB < minPriceForOneDBCreatedHuman){
			fcShowModal('error-allert','Невірне значення ціни формування однієї компанії='+priceDB);
			return 'error';
		};
	};
	
	return priceDB;
};

function fcCalculate_OneIVR(){
	console.log("run fcCalculate_OneIVR");
	var priceIVR='error';
	const minPriceForIVR=0.25;
	const IVR=$('input[name=IVR]:checked').val();
	console.log('IVR='+IVR);
	if(IVR!=1 && IVR!=2){
		fcShowModal('error-allert','Як опрацьовувати відгук');
		return 'error';
	};
	
	if(IVR==1){priceIVR=0;};
	if(IVR==2){fcShowIVRcalc('block');
		priceIVR=0; 
		var actionFix=1; var sentSMS=0; var andDiall=0; var countIVR=1; 
		if(!($('#blockIVR_actionFix').is(':checked'))){
			fcShowModal('error-allert','Поле "Зафіксувати у звіті." є обов\'язковим');
		};
		
		if(($('#blockIVR_count').val())*1 < countIVR){
			fcShowModal('error-allert','Поле "Кількість рівнів IVR" не може бути менше '+countIVR);
			$('#blockIVR_count').val(1)
		}else{
			countIVR=($('#blockIVR_count').val())*1;
		};
		
		if($('#blockIVR_sentSMS').is(':checked')){sentSMS=1;};
		if($('#blockIVR_andDiall').is(':checked')){andDiall=1;};
	
		console.log("actionFix="+actionFix+" | sentSMS="+sentSMS+" | andDiall="+andDiall);
		priceIVR=1*(((0.25*actionFix + 0.1*sentSMS + 1*andDiall)*countIVR).toFixed(2));
		
		if(priceIVR < minPriceForIVR){
			fcShowModal('error-allert','Опрацювання одного відгуку '+priceIVR+'- не може бути менше='+minPriceForIVR);
			return 'error';
		};
	};
	
	return priceIVR;
};

function fcSetPriceInBasket(priceList){
	console.log("run fcSetPriceInBasket");
	console.log("p0="+priceList[0]+" p1="+priceList[1]+" p2="+priceList[2]+" p3="+priceList[3]+" p4="+priceList[4]+" p5="+priceList[5]+" p6="+priceList[6]+" p7="+priceList[7]+" p8="+priceList[8]+" p9="+priceList[9]+" p10="+priceList[10]+" p11="+priceList[11]+" p12="+priceList[12]+" p13="+priceList[13]);
	
	$('.cupAction-priceOneMsg').html(priceList[0]);
	$('.cupAction-countMsg').html(priceList[1]);
	$('.cupAction-allPrice').html(priceList[2]);
	
	if(priceList[3]*1 == 0){priceList[3]='Ні'}else{priceList[3]=priceList[3]+'грн.'};
	$('#bodyBasketList_basePriceOneMsg').html(priceList[3]);
	
	if(priceList[4]*1 == 0){priceList[4]='Ні'}else{priceList[4]=priceList[4]+'грн.'};
	$('#bodyBasketList_priceDB').html(priceList[4]);
	
	if(priceList[5]*1 == 0){priceList[5]='Ні'}else{priceList[5]=priceList[5]+'грн.'};
	$('#bodyBasketList_paymentFor').html(priceList[5]);
	
	if(priceList[6]*1 == 0){priceList[6]='Ні'}else{priceList[6]=priceList[6]+'грн.'};
	$('#bodyBasketList_priceIVR').html(priceList[6]);
	
	if(priceList[7]*1 == 0){priceList[7]='Ні'}else{priceList[7]=priceList[7]+'шт.'};
	$('#bodyBasketList_priceDiallCount').html(priceList[7]);
	
	if(priceList[8]*1 == 0){priceList[8]='Ні'}else{priceList[8]=priceList[8]+'с.'};
	$('#bodyBasketList_priceListenTime').html(priceList[8]);
	
	if(priceList[9]*1 == 0){priceList[9]='Ні'}else{priceList[9]=priceList[9]+'блоків'};
	$('#bodyBasketList_countCharsInTextMSG').html(priceList[9]);
	
	if(priceList[10]*1 == 0){priceList[10]='Ні'}else{priceList[10]=priceList[10]+'грн.'};;
	$('#bodyBasketList_priceVoice').html(priceList[10]);
	
	if(priceList[11]*1 == 0){priceList[11]='Ні'}else{priceList[11]=priceList[11]+'грн.'};
	$('#bodyBasketList_priceChannel').html(priceList[11]);
	
	if(priceList[12]*1 == 0){priceList[12]='Ні'}else{priceList[12]=priceList[12]+'грн.'};
	$('#bodyBasketList_priceCalendar').html(priceList[12]);
	
	if(priceList[13]*1 == 0){priceList[13]='Ні'}else{priceList[13]=priceList[13]+'грн.'};
	$('#bodyBasketList_priceCRM').html(priceList[13]);
	
	var clientname=$('#step10_clientname').val();
	$('#bodyBasketList_clientname').html(clientname);
	
	var phone=$('#step10_tel').val();
	$('#bodyBasketList_tel').html(phone);
	
	var email=$('#step10_email').val();
	$('#bodyBasketList_email').html(email);
	
	var textInMSG = $('#step5_textMSG').val();
	$('#bodyBasketList_textInMSG').html(textInMSG);
};

function fcSentOrder(){
	console.log("run fcSentOrder");
	if(fcCalculate()){
		var name = $('#step10_clientname').val();
        var phone = $('#step10_tel').val();
        var email = $('#step10_email').val();

        var nameRegex = /^[a-zA-Zа-яА-ЯЁёіІїЇєЄ' ]+$/;
        var phoneRegex = /\d/g;
        var emailRegex = /^\S+@\S+\.\S+$/;

        if (!nameRegex.test(name)) {
			fcShowModal('error-allert','Будь ласка, введіть правильне ім\'я');
			return false;
        } else if (phone.match(phoneRegex).length < 12) {
			fcShowModal('error-allert','Будь ласка, введіть  правильний номер телефону');
			return false;
        } else if (!emailRegex.test(email)) {
			fcShowModal('error-allert','Будь ласка, введіть правильну електронну пошту');
			return false;
        } else {
      var order=$('#bodyBasketList').html();
			var data = {
        company: name,
				email: email,
				phone: phone,
                order: order
            };
			var url="https://z.osd24.com/calc_dialler/apiCalckDialler.php";
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                success: function(response) {
                    console.log("Успішне відправлення POST-запиту="+response);
                    fcShowModal('order-respons',response);
					return false;
                },
                error: function(error) {
                    console.log("Помилка під час відправлення POST-запиту");
                    fcShowModal('error-allert','Помилка під час відправлення POST-запиту:'+error);
					return false;
                }
            });
        };
		/*
		
		*/	
	}
};

function fcSentPricePack(pricePack){
	console.log("run fcSentPricePack =>"+pricePack);
	if(pricePack==='PackStart'){
		console.log("run fcSentPricePack PackStart=>"+pricePack);
		$('#step5_countMSG').val(5000);
		$('#step1_DB_v1').prop("checked", true);
		$('#step3_ivr_v1').prop("checked", true);
		$('#step5_textMSG').val('Текст повідомлення до 100 символів надішліть будь ласка на  dialler@osd24.com');
		$('#step6_voice_v2').prop("checked", true);
		$('#step7_channel_v1').prop("checked", true);
		$('#step8_Calendar_v1').prop("checked", true);
		$('#step9_CRM_v1').prop("checked", true);
	};
	if(pricePack==='PackStandart'){
		console.log("run fcSentPricePack PackStandart=>"+pricePack);
		$('#step5_countMSG').val(1000);
		$('#step1_DB_v2').prop("checked", true);
		$('#step2_paymentFor_v2').prop("checked", true);
		$('#step3_ivr_v2').prop("checked", true);
		$('#blockIVR_sentSMS').prop("checked", true);
		$('#blockIVR_andDiall').prop("checked", false);
		$('#blockIVR_count').val(1);
		$('#step4_diallCount').val(3);
		$('#step4_listenTime').val(1);
		$('#step5_textMSG').val('Текст повідомлення до 200 символів надішліть будь ласка на  dialler@osd24.com або аудіо файл тривалістю до 20 секунд');
		$('#step6_voice_v2').prop("checked", true);
		$('#step7_channel_v1').prop("checked", true);
		$('#step8_Calendar_v1').prop("checked", true);
		$('#step9_CRM_v2').prop("checked", true);
	};
	if(pricePack==='PackPower'){
		console.log("run fcSentPricePack PackPower=>"+pricePack);
		$('#step5_countMSG').val(2000);
		$('#step1_DB_v2').prop("checked", true);
		$('#step2_paymentFor_v2').prop("checked", true);
		$('#step3_ivr_v2').prop("checked", true);
		$('#blockIVR_sentSMS').prop("checked", true);
		$('#blockIVR_andDiall').prop("checked", true);
		$('#blockIVR_count').val(1);
		$('#step4_diallCount').val(3);
		$('#step4_listenTime').val(5);
		$('#step5_textMSG').val('Текст повідомлення до 200 символів надішліть будь ласка на  dialler@osd24.com або аудіо файл тривалістю до 20 секунд');
		$('#step6_voice_v2').prop("checked", true);
		$('#step7_channel_v1').prop("checked", true);
		$('#step8_Calendar_v1').prop("checked", true);
		$('#step9_CRM_v1').prop("checked", true);
	};
	if(fcCalculate()){ 
		console.log("run fcSentPricePack =>"+pricePack);
		fcGoToStep(10);
		$('.cupAction-navi-title').css({'display': 'none'});
		$('#step_back').css({'display': 'none'});
		$('#step_next').css({'display': 'none'});
		$('.cupAction-calc-start-block').css({'display': 'none'});
		$('#upToPrice').css({'display': 'block'});
		$('#send_order').css({'display': 'block'});
	}else{return false;};
};

/**/
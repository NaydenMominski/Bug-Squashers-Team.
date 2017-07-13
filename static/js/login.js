var is_advanced=false;
function AdvancedSearch()
{
	if(!is_advanced)
	{
		
		document.getElementById("left_panel").className="text-left col-md-12 no-left-padding";
		document.getElementById("main_panel").style.display="none";
		document.getElementById("extra_fields").style.display="block";
		//document.getElementById("ptype-tooltip").style.display="block";
		
		 $('.control-label').removeClass('col-sm-5').addClass('col-sm-1');
		 $('.control-field ').removeClass('col-sm-7').addClass('col-sm-3');
	
		document.getElementById("expand_search_img").src = document.getElementById("expand_search_img").src.replace("_o", "_c");
		is_advanced=true;
		
		document.getElementById("more_button").innerHTML="- Less";
		
	}
	else
	{
		document.getElementById("left_panel").className="text-left col-md-3 no-left-padding";
		document.getElementById("main_panel").style.display="block";
		document.getElementById("extra_fields").style.display="none";
		document.getElementById("ptype-tooltip").style.display="none";
		$('.control-label').removeClass('col-sm-2').addClass('col-sm-5');
		$('.control-field ').removeClass('col-sm-4').addClass('col-sm-7');
		document.getElementById("expand_search_img").src = document.getElementById("expand_search_img").src.replace("_c", "_o");
		
		is_advanced=false;
		
		document.getElementById("more_button").innerHTML="+ More";
	}
}


var AnimationStep = 25; 
var AnimationInterval = 10; 
var LoginHeight = 240;
var c_step=0;

function ShowLogin() 
{
	var oDiv = document.getElementById("main-login-form");
		
	if (c_step < (LoginHeight / AnimationInterval))
	{
		oDiv.style.display = "block";
	 
		Animate(oDiv);
	}
	else
	{
		HideAnimate(oDiv);
	}
}

function HideLogin() 
{
	
	var oDiv = document.getElementById("main-login-form");
	HideAnimate(oDiv);
}

function HideAnimate(element) 
{
   
    if (c_step <= 0)
	{
		element.style.display = "none";
		return true;
	}
        
	
	c_step--;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        HideAnimate(element);
    }, AnimationInterval);
    return false;
}


function Animate(element) 
{
   
    if (c_step >= (LoginHeight / AnimationInterval))
        return true;
	
	c_step++;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        Animate(element);
    }, AnimationInterval);
    return false;
}

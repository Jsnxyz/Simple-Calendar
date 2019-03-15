//Declaring global vars.

var dayObj,date,day,month,year,gap;

//Map number to Month name.
var month_def = {"0" : "January", "1" : "February", "2" : "March", "3" : "April", "4" : "May", "5" : "June", "6" : "July" , "7" : "August" , "8" : "September", "9" : "October",  "10" : "November" , "11" : "December"};

$(function(){
	// Generate table cols and rows.

	var html = '<tr><td data-day="0"></td><td data-day="1"></td>'
	html = html + '<td data-day="2"></td>';
	html = html + '<td data-day="3"></td>';
	html = html + '<td data-day="4"></td>';
	html = html + '<td data-day="5"></td>';
	html = html + '<td data-day="6"></td></tr>';

	for(var i=0;i<6;i++){
		$("tbody").append(html);
	}

	// Get current date


	dayObj = new Date();
	date = dayObj.getDate();
	day = dayObj.getDay();
	month = dayObj.getMonth();
	year = dayObj.getFullYear();

	// Function to find leap year

	function findleap(y){
		if ( y%400 == 0) {return true;}
    	else if ( y%100 == 0) {return false;}
  		else if ( y%4 == 0 ) {return true;}
  		else {return false;}
	}

	// Function to find number of days in month

	function findmonthlimit(m,y){
		if(m < 7 ){
			if(m % 2 == 0){
				return 31;
			} else {
				if(m == 1){
					var isLeap = findleap(y);
					if(isLeap){
						return 29;
					} else {
						return 28;
					}
				}
				return 30;
			}
		} else {
			if(m % 2 == 1){
				return 31;
			} else {
				return 30;
			}
		}
	}

	//Function to generate calendar
	function generate(){
		// Check which col will have 1st date and fill grids accordingly. 
		var grid = 0;
		var date1 = date;
		while(date1 > 7){
			date1 = date1 - 7;
			grid++;
		}
		var grid1 = 0;
		//Check the gap between date1 and 1st
		gap = Math.abs(date1 - 1); 
		gap = day - gap;
		if(gap < 0){
			gap = 7 + gap;
		}
		var gap1 = gap;
		// The gap1 will be the column where the date 1st is and obviously 1st row has to have the date 1st.
		//Find number of days in the particular month
		var limit = findmonthlimit(month,year);
		//Fill the table cells with blank spaces for proper alignment of the table.
		$("tbody tr td").html("&nbsp;");
		// Limit = Number of days. Grid = Rows in the table. gap1 = Column of the table.
		for(var i=1;i<=limit;i++){
			$("tbody tr").eq(grid1).find("td[data-day=" + gap1 + "]").html(i);
			gap1++;
			if(gap1 % 7 == 0){
				gap1 = 0;
				grid1++;
			}
		}

		// Set the month - year header.
		$(".month-year").html( month_def[month] + " " + year );
	}

	// Initialize the calendar.

	generate();


	$(".left").click(function(){
		// Reduce the month.
		month--;
		// If month is lesser than jan - Reset to December and previous year
		if(month == -1){
			month = 11;
			year--;
		}
		//Find number of previous in next month
		var ml = findmonthlimit(month,year); 
		//Set the last day as current date for reference.
		date = ml;
		//Current gap value is 1st of the next month. Reducing it's gap by 1 would give the day of 31st of previous month
		gap--;
		if(gap == -1){
			gap = 6;
		}
		//Send the day of 31st of the current month.
		day = gap;
		//Generate the table
		generate();
	});
	$(".right").click(function(){
		//Increase the month value
		month++;
		var m;
		//If month > Dec ... reset to Jan and next year
		if(month == 12){
			month = 0;
			year++;
		}
		//Check if previous month was december.
		m = month - 1;
		if(m == -1){
			m = 11;
		}
		//Find the day of the last date of the current month that you want to view.
		gap = gap + findmonthlimit(m,year) + findmonthlimit(month,year) - 1;
		while(gap>7){
			gap = gap - 7;
		}
		date = findmonthlimit(month,year);
		//Send the day of 31st of the current month.
		day = gap;
		//Generate the table.
		generate();
	});	

	$("tbody td").click(function(){
		var cur = $(this);
		if($(this).html() == "&nbsp;"){
			//If table cell is empty. Do nothing
			return false;
		} else {
			//Else display the date selected.
			$(".popup-info").html(cur.html() + " / " + month_def[month] + " / " + year);
			$(".popup").css("display","block");
		}
	});
	$(".close").click(function(){
		//Close the popup on pressing OK
		$(".popup").css("display","none");
	});
});
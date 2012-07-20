// My app code

var mountainView = Titanium.Map.createAnnotation({
    latitude:37.390749,
    longitude:-122.081651,
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:Titanium.Map.ANNOTATION_RED,
    animate:true,
    leftButton: '../images/appcelerator_small.png',
    myid:1 // Custom property to uniquely identify this annotation.
});

var lacPhilippeBass = Titanium.Map.createAnnotation({
    latitude:45.605910,
    longitude:-75.999010,
    title:"Lac Philippe Bass",
    subtitle:'Parc de la gatineau, QC',
    image: '../../images/largemouth_bass-small.png',
    pincolor:Titanium.Map.ANNOTATION_GREEN,
    animate:true,
    leftButton: '../../images/lacPhilippeBass.jpeg',
    myid:2 // Custom property to uniquely identify this annotation.
});


var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.SATELLITE_TYPE,
    region: {latitude:lacPhilippeBass.latitude, longitude:lacPhilippeBass.longitude, 
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[mountainView, lacPhilippeBass]
});

//win.add(mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {

    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
});


function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new Window(L('home')),
		win2 = new Window(L('settings'));
	
	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	win1.buttonWindow = Ti.UI.createWindow({
		title: L('map'),
		backgroundColor: 'white'
	});
	win1.buttonWindow.add(mapview);
	
	var tab2 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;


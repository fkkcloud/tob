
var levelSelectScreenJSON = {
	id: 'levelSelectScreen',
	component: 'Window',
	padding: 4,
	position: { x: 0, y: 0 },
	width: 200,
	height: 200,


	layout: [1, 6],
	children: [

	{
	    text: 'Stage Screen',
	    font: {
	        size: '42px',
	        family: 'Skranji',
	        color: '#fff'
	    },
	    component: 'Footer',
	    
	    position: 'center',
	  
	    width: 400,
	    height: 80,
	    layout: [3, 1],
	    z: 1,
	    children: [
			null,
			null,
			{ id: 'backbutton1', component: 'Button', position: 'left', width: 160, height: 120, skin: 'backBtn' },
	    ]
	},

	{
		id: 'levelsList',
		component: 'List',
		dragX:false,
		padding: 3,
		position: {x:0, y:0},
		width: 200,
		height: 200,
		layout: [4, 2],
		children: [
			{ id: 'lvl1', text: '1', userData: 'level 1', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl2', text: '2', userData: 'level 2', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl3', text: '3', userData: 'level 3', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl4', text: '4', userData: 'level 4', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl5', text: '5', userData: 'level 5', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl6', text: '6', userData: 'level 6', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl7', text: '7', userData: 'level 7', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
			{ id: 'lvl8', text: '8', userData: 'level 8', component: 'Button', position: 'center', width: 120, height: 120, skin: 'levelBtn' },
		]
	}

	]
}

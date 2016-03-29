BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: false,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    globalGameWidth:0,

    globalGameHeight:0,

    reloadStageScreenUI: undefined,

    blockSize: 0,
    preStageUnits: 0,

    mapData: [],

    blockSpriteScale: 1,

    isGameInit: false,

    mapspeed: 1,

    jumpscale: 1,

    ui_level_screen: undefined,
    ui_dialog_complete: undefined,

    stageProgress:[],

    currentStage: 0,

    stageData:[
    // 0
        {
            mapData:[[0,0,0,0,0,0,0,1],[0,0,0,0,0,4,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,0,2,0],[0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,3,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0],[0,0,0,0,2,0,0,0],[0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,3,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,3,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,3,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,1],[0,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,3,0,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,3,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,1],[0,0,0,0,0,2,0,1],[0,0,0,0,0,0,2,1],[0,0,0,3,0,2,0,1],[0,0,0,0,0,0,2,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0],[2,0,0,3,0,0,0,0],[0,2,0,0,0,0,0,0],[2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,4,0,0,1],[0,0,0,0,0,0,0,1]],
            mapSpeed:1.2,
            jumpScale:1.0,
            mapTitle:'Stage 1'
        },
        {
            mapData:[[0,0,0,0,0,0,0,1],[0,0,0,0,0,4,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,2],[0,0,0,0,0,1,0,2],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,2,0],[0,0,0,0,1,0,2,0],[0,0,0,0,0,0,2,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[3,0,0,0,0,3,0,0],[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[3,0,0,0,0,0,0,0],[0,0,0,0,0,3,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[3,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,3,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,1],[3,1,0,0,0,0,0,0],[0,1,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[2,0,0,0,0,0,0,0],[2,0,0,0,0,2,0,0],[2,0,0,3,0,2,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[3,1,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[2,0,0,0,0,0,0,1],[2,0,0,0,0,3,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[3,1,0,0,3,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,1,1,1,1,1],[0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,0,3,0,0],[1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,1,1,1,1,1],[0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,0,3,0,0],[1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,1,1,1,1,1],[0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,0,3,0,0],[1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,1,1,1,1,1],[0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,0,3,0,1,1,1],[1,1,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,0,3,0,1,1,1],[1,1,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,0,3,0,1,1,1],[1,1,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1],[1,1,0,0,4,0,0,1],[0,1,1,0,0,0,1,1],[0,0,1,1,0,1,1,0],[0,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
            mapSpeed:1.2,
            jumpScale:1.0,
            mapTitle:'Stage 2'
        },
        {
            mapData:[[0,0,0,0,0,0,0,1],[0,0,0,0,0,4,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,3,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,3,0,0,0,0,1],[0,0,0,0,1,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,3,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,0,0,0,0,1,1,1],[1,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,1],[1,1,1,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,2],[3,1,0,0,0,0,0,2],[0,1,0,0,0,0,0,0],[3,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[3,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,2],[0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,3,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[3,0,1,0,0,0,1,2],[0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0],[3,0,1,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[3,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,1,0,0,0,1,0],[3,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,3,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,1],[0,0,0,0,0,1,1,1],[0,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,1],[0,0,0,0,1,1,1,1],[0,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0],[0,0,0,0,1,1,1,1],[0,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,4,0,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
            mapSpeed:1.2,
            jumpScale:1.0,
            mapTitle:'Stage 3'
        }
    ],

};

BasicGame.Boot = function(game){

};
  
BasicGame.Boot.prototype = {

	init: function(){
		this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(375, 667, 750, 1334);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(667, 375, 1334, 750);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

	},

	preload: function(){
        this.load.image('loadingBar', 'assets/bar.png');
        
        if(window.devicePixelRatio >= 3)
            this.load.image('kingsl_logo', 'assets/kingsl_logo@3.png');
        else if(window.devicePixelRatio >= 2)
            this.load.image('kingsl_logo', 'assets/kingsl_logo@2.png');
        else
            this.load.image('kingsl_logo', 'assets/kingsl_logo.png');

        if(window.devicePixelRatio >= 3)
        {
            this.load.image('bg_sky', 'assets/bg_sky@3.png');
            this.load.image('bg_castle', 'assets/bg_castle@3.png');

            this.load.image('title', 'assets/title@3.png');
            this.load.image('title_gameOver', 'assets/gameover@3.png');

            this.load.image('copyrights', 'assets/copyrights@3.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp@3.png', 50*3, 75*3, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat@3.png', 225, 250, 3);

            this.load.image('btn_story', 'assets/btn_storymode@3.png');
            this.load.image('btn_maplist', 'assets/btn_maplist@3.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor@3.png');
            this.load.image('btn_option', 'assets/btn_option@3.png');

            this.load.image('btn_menu', 'assets/btn_menu@3.png');
            this.load.image('btn_replay', 'assets/btn_replay@3.png');

            this.load.image('blood', 'assets/blood@3.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat@3.png', 141, 141, 4);
            this.load.spritesheet('blood_fill', 'assets/blood_fill@3.png', 110, 110, 12);

            this.load.image('blood_highlight', 'assets/bloodhighlight@3.png');
            this.load.image('blood_guage', 'assets/bloodguage@3.png');
            this.load.image('blood_bar', 'assets/bloodbar@3.png');

            this.load.image('endpoint', 'assets/endpoint@3.png');

            this.load.image('trap', 'assets/trap@3.png');

            this.load.spritesheet('transform', 'assets/transform@3.png', 200, 200, 6);

            this.load.image('open_all', 'assets/open_all@3.png');
            this.load.image('open_none', 'assets/open_none@3.png');

            this.load.image('open_down', 'assets/open_down@3.png');
            this.load.image('open_down_left', 'assets/open_down_left@3.png');
            this.load.image('open_down_right', 'assets/open_down_right@3.png');
            this.load.image('open_down_left_right', 'assets/open_down_left_right@3.png');

            this.load.image('open_left', 'assets/open_left@3.png');
            this.load.image('open_right', 'assets/open_right@3.png');
            this.load.image('open_left_right', 'assets/open_left_right@3.png');

            this.load.image('open_up', 'assets/open_up@3.png');
            this.load.image('open_up_down', 'assets/open_up_down@3.png');
            this.load.image('open_up_down_left', 'assets/open_up_down_left@3.png');
            this.load.image('open_up_down_right', 'assets/open_up_down_right@3.png');
            this.load.image('open_up_left_right', 'assets/open_up_left_right@3.png');
            this.load.image('open_up_left', 'assets/open_up_left@3.png');
            this.load.image('open_up_right', 'assets/open_up_right@3.png');

            this.load.spritesheet('fx_death', 'assets/fx_death@3.png', 330, 330, 16);
            this.load.spritesheet('fx_spawn', 'assets/FX_spawn@3.png', 300, 563, 13);
            this.load.spritesheet('fx_run', 'assets/FX_run@3.png', 150, 75, 8);

        }
        else if(window.devicePixelRatio == 2)
        {

            this.load.image('bg_sky', 'assets/bg_sky@2.png');
            this.load.image('bg_castle', 'assets/bg_castle@2.png');

            this.load.image('title', 'assets/title@2.png');
            this.load.image('title_gameOver', 'assets/gameover@2.png');

            this.load.image('copyrights', 'assets/copyrights@2.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp@2.png', 50*2, 75*2, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat@2.png', 149, 166, 3);

            this.load.image('btn_story', 'assets/btn_storymode@2.png');
            this.load.image('btn_maplist', 'assets/btn_maplist@2.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor@2.png');
            this.load.image('btn_option', 'assets/btn_option@2.png');

            this.load.image('btn_menu', 'assets/btn_menu@2.png');
            this.load.image('btn_replay', 'assets/btn_replay@2.png');

            this.load.image('blood', 'assets/blood@2.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat@2.png', 94, 94, 4);
            this.load.spritesheet('blood_fill', 'assets/blood_fill@2.png', 73, 73, 12);

            this.load.image('blood_highlight', 'assets/bloodhighlight@2.png');
            this.load.image('blood_guage', 'assets/bloodgauge@2.png');
            this.load.image('blood_bar', 'assets/bloodbar@2.png');

            this.load.image('endpoint', 'assets/endpoint@2.png');

            this.load.image('trap', 'assets/trap@2.png');

            this.load.spritesheet('transform', 'assets/transform@2.png', 133, 133, 6);

            this.load.image('open_all', 'assets/open_all@2.png');
            this.load.image('open_none', 'assets/open_none@2.png');

            this.load.image('open_down', 'assets/open_down@2.png');
            this.load.image('open_down_left', 'assets/open_down_left@2.png');
            this.load.image('open_down_right', 'assets/open_down_right@2.png');
            this.load.image('open_down_left_right', 'assets/open_down_left_right@2.png');
            
            this.load.image('open_left', 'assets/open_left@2.png');
            this.load.image('open_right', 'assets/open_right@2.png');
            this.load.image('open_left_right', 'assets/open_left_right@2.png');

            this.load.image('open_up', 'assets/open_up@2.png');
            this.load.image('open_up_down', 'assets/open_up_down@2.png');
            this.load.image('open_up_down_left', 'assets/open_up_down_left@2.png');
            this.load.image('open_up_down_right', 'assets/open_up_down_right@2.png');
            this.load.image('open_up_left_right', 'assets/open_up_left_right@2.png');
            this.load.image('open_up_left', 'assets/open_up_left@2.png');
            this.load.image('open_up_right', 'assets/open_up_right@2.png');

            this.load.spritesheet('fx_death', 'assets/fx_death@2.png', 220, 220, 16);
            this.load.spritesheet('fx_spawn', 'assets/FX_spawn@2.png', 200, 375, 13);
            this.load.spritesheet('fx_run', 'assets/FX_run@2.png', 100, 50, 8);

        }
        else 
        {
            this.load.image('bg_sky', 'assets/bg_sky.png');
            this.load.image('bg_castle', 'assets/bg_castle.png');
            //this.load.image('bg_sky_bat', 'assets/bg_ground_bat.png');

            this.load.image('title', 'assets/title.png');
            this.load.image('title_gameOver', 'assets/gameover.png');

            this.load.image('copyrights', 'assets/copyrights.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp.png', 50, 75, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat.png', 74, 83, 3);

            this.load.image('btn_story', 'assets/btn_storymode.png');
            this.load.image('btn_maplist', 'assets/btn_maplist.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor.png');
            this.load.image('btn_option', 'assets/btn_option.png');

            this.load.image('btn_menu', 'assets/btn_menu.png');
            this.load.image('btn_replay', 'assets/btn_replay.png');

            this.load.image('blood', 'assets/blood.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat.png', 47, 47, 4);
            this.load.spritesheet('blood_fill', 'assets/blood_fill.png', 36, 36, 12);

            this.load.image('blood_highlight', 'assets/bloodhighlight.png');
            this.load.image('blood_guage', 'assets/bloodgauge.png');
            this.load.image('blood_bar', 'assets/bloodbar.png');

            this.load.image('endpoint', 'assets/endpoint.png');

            this.load.image('trap', 'assets/trap.png');

            this.load.spritesheet('transform', 'assets/transform.png', 66, 66, 6);

            this.load.image('open_all', 'assets/open_all.png');
            this.load.image('open_none', 'assets/open_none.png');

            this.load.image('open_down', 'assets/open_down.png');
            this.load.image('open_down_left', 'assets/open_down_left.png');
            this.load.image('open_down_right', 'assets/open_down_right.png');
            this.load.image('open_down_left_right', 'assets/open_down_left_right.png');
            
            this.load.image('open_left', 'assets/open_left.png');
            this.load.image('open_right', 'assets/open_right.png');
            this.load.image('open_left_right', 'assets/open_left_right.png');

            this.load.image('open_up', 'assets/open_up.png');
            this.load.image('open_up_down', 'assets/open_up_down.png');
            this.load.image('open_up_down_left', 'assets/open_up_down_left.png');
            this.load.image('open_up_down_right', 'assets/open_up_down_right.png');
            this.load.image('open_up_left_right', 'assets/open_up_left_right.png');
            this.load.image('open_up_left', 'assets/open_up_left.png');
            this.load.image('open_up_right', 'assets/open_up_right.png');

            this.load.spritesheet('fx_death', 'assets/fx_death.png', 110, 110, 16);
            this.load.spritesheet('fx_spawn', 'assets/FX_spawn.png', 100, 188, 13);
            this.load.spritesheet('fx_run', 'assets/FX_run.png', 50, 25, 8);

        } 

        // UI resources
        //this.load.image('assets/img/level-box.png', 'assets/img/level-box.png');
        this.load.image('level-box', 'assets/level_button.png');
        this.load.image('level-box-locked', 'assets/level_button_locked.png');

        //Note that you need to call fixCache here to fix compatibility issue
        //this is temporary fix, it will be replaced with a specific EZGUI Loader
        this.load.onLoadComplete.add(EZGUI.Compatibility.fixCache, this.load, null, null);
	},
	
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.game.state.start("Preload");
	},

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
        
    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
    }

}
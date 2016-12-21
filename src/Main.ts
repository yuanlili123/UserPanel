//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private user : User;
    private hero : Hero;
    private sword : Weapon;
    private helment : Armor;
    private lightArmor : Armor;
    private shoes : Armor;
    private weaponJewel : Jewel;
    private armorJewel : Jewel;
    private userPanel : UserPanel;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var sky:egret.Bitmap = this.createBitmapByName("bg1_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        this.user = new User(100, 1000, 1, 1000, "Player01");
        this.hero = new Hero("01", "02_png", "Hero01", 1000, 1000, 100, 50, 1, 30, 200, 500);
        this.sword = new Weapon("001", "Weapon_jpg", 20, "sword", WeaponsType.sword);
        this.helment = new Armor("101", "Helment_jpg", 50, "helment", ArmorsType.lightarmor);
        this.lightArmor = new Armor("102", "LightArmor_jpg", 50, "lightArmor", ArmorsType.lightarmor);
        this.shoes = new Armor("103", "Shoes_jpg", 50, "shoes", ArmorsType.lightarmor);
        this.weaponJewel = new Jewel(jewelLevel.one, 20, 50, 15);
        this.armorJewel = new Jewel(jewelLevel.three, 50, 20, 10);
         
        this.sword.addJewel(this.weaponJewel);
        this.helment.addJewel(this.armorJewel);
        this.lightArmor.addJewel(this.armorJewel);
        this.shoes.addJewel(this.armorJewel);
        /*this.hero.addWeaponsEquipment(this.sword);
        this.hero.addArmorEquipment(this.helment);
        this.hero.addArmorEquipment(this.lightArmor);
        this.hero.addArmorEquipment(this.shoes);*/
        this.hero.addWeapon(this.sword);
        this.hero.addHelment(this.helment);
        this.hero.addLightarmor(this.lightArmor);
        this.hero.addShoes(this.shoes);
        this.user.addHero(this.hero);

        /*console.log("hero attack :" + this.hero.getAttack());
        console.log("hero defence :" + this.hero.getDefence());
        console.log("hero speed :" + this.hero.getSpeed());
        console.log("hero maxHp :" + this.hero.getMaxHp());
        console.log("weaponJewel fightpower :" + this.weaponJewel.getFightPower());
        console.log("armorJewel fightpower :" + this.armorJewel.getFightPower());
        console.log("sword fightpower :" + this.sword.getFightPower());
        console.log("lightArmor fightpower :" + this.lightArmor.getFightPower());
        console.log("hero fightpower :" + this.hero.getFightPower());*/

        this.userPanel = new UserPanel();
        this.addChild(this.userPanel);
        this.userPanel.showHeroInformation(this.hero);
        this.userPanel.x = (this.stage.width - this.userPanel.width) / 2;
        this.userPanel.y = (this.stage.height - this.userPanel.height) / 2;
        this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.sword);
        /*this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.helment);
        this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.lightArmor);
        this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.shoes);*/
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }    

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}



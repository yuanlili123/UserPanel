var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        var _this = this;
        _super.call(this);
        this.width = 480;
        this.height = 800;
        this.background = this.createBitmapByName("Informationbg1_png");
        this.addChild(this.background);
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 480;
        this.background.height = 800;
        this.background.touchEnabled = true;
        this.background.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.equipmentInformationPanel.alpha = 0;
        }, this);
        this.weaponIconPicture = new egret.Bitmap();
        this.weaponIconPicture.width = 75;
        this.weaponIconPicture.height = 75;
        this.addChild(this.weaponIconPicture);
        this.weaponIconPicture.x = this.width * 1 / 5 - this.weaponIconPicture.width;
        this.weaponIconPicture.y = this.height * 2 / 5;
        this.weaponIconPicture.touchEnabled = true;
        this.weaponIconPicture.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.weaponsEquipment[0].getEquipmentInformations();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.weaponsEquipment[0]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.helmentIconPicture = new egret.Bitmap();
        this.helmentIconPicture.width = 75;
        this.helmentIconPicture.height = 75;
        this.addChild(this.helmentIconPicture);
        this.helmentIconPicture.x = this.width * 4 / 5;
        this.helmentIconPicture.y = this.height * 2 / 5;
        //this.helmentIconPicture.y = this.helmentIconPicture.y + this.height / 6;
        this.helmentIconPicture.touchEnabled = true;
        this.helmentIconPicture.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.armorEquipment[0].getEquipmentInformations();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.armorEquipment[0]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.lightarmorIconPicture = new egret.Bitmap();
        //this.lightarmorIconPicture = this.createBitmapByName("LightArmor_jpg");
        this.lightarmorIconPicture.width = 75;
        this.lightarmorIconPicture.height = 75;
        this.addChild(this.lightarmorIconPicture);
        this.lightarmorIconPicture.x = this.width * 4 / 5;
        this.lightarmorIconPicture.y = this.helmentIconPicture.y + this.height / 6;
        //this.lightarmorIconPicture.y = this.height * 2 / 5;
        this.lightarmorIconPicture.touchEnabled = true;
        this.lightarmorIconPicture.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            //this.hero.armorEquipment[1].getEquipmentInformations();
            _this.hero.armorEquipment[1].getDefence();
            _this.hero.armorEquipment[1].getSpeed();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.armorEquipment[1]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.shoesIconPicture = new egret.Bitmap();
        this.shoesIconPicture.width = 75;
        this.shoesIconPicture.height = 75;
        this.addChild(this.shoesIconPicture);
        this.shoesIconPicture.x = this.width * 4 / 5;
        this.shoesIconPicture.y = this.lightarmorIconPicture.y + this.height / 6;
        this.shoesIconPicture.touchEnabled = true;
        this.shoesIconPicture.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            //this.hero.armorEquipment[2].getEquipmentInformations();
            _this.hero.armorEquipment[2].getDefence();
            _this.hero.armorEquipment[2].getSpeed();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.armorEquipment[2]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.heroPicture = new egret.Bitmap();
        this.heroPicture.width = 300;
        this.heroPicture.height = 400;
        this.addChild(this.heroPicture);
        this.heroPicture.x = this.width / 5;
        this.heroPicture.y = this.height / 3;
        this.heroInformationText = "";
        this.heroInformationTextField = new egret.TextField();
        this.heroInformationTextField.width = 400;
        this.heroInformationTextField.height = 170;
        this.addChild(this.heroInformationTextField);
        this.heroInformationTextField.x = 30;
        this.heroInformationTextField.y = 128;
        this.heroInformationTextField.size = 28;
        this.equipmentInformationPanel = new EquipmentInformationPanel();
        this.addChild(this.equipmentInformationPanel);
        this.equipmentInformationPanel.x = (this.width - this.equipmentInformationPanel.width) / 2;
        this.equipmentInformationPanel.y = (this.height - this.equipmentInformationPanel.height) / 2;
        this.equipmentInformationPanel.alpha = 0;
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.showHeroInformation = function (hero) {
        this.hero = hero;
        this.getHeroInformations(hero);
        this.heroPicture.texture = RES.getRes(hero.heroPictureID);
        this.weaponIconPicture.texture = RES.getRes(hero.weaponsEquipment[0].equipmentPictureID);
        this.helmentIconPicture.texture = RES.getRes(hero.armorEquipment[0].equipmentPictureID);
        this.lightarmorIconPicture.texture = RES.getRes(hero.armorEquipment[1].equipmentPictureID);
        this.shoesIconPicture.texture = RES.getRes(hero.armorEquipment[2].equipmentPictureID);
        //this.heroInformationTextField.textColor = hero.color;
    };
    p.getHeroInformations = function (hero) {
        this.heroInformationText = "";
        this.heroInformationText = "英雄 : " + hero.heroName + "\n";
        hero.getDefence();
        hero.getAttack();
        hero.getMaxHp();
        hero.getSpeed();
        for (var i = 0; i < hero.properties.length; i++) {
            this.heroInformationText = this.heroInformationText + hero.properties[i].name + " : " + hero.properties[i].value.toFixed(0) + "\n";
        }
        this.heroInformationText = this.heroInformationText + "战斗力 : " + hero.getFightPower().toFixed(0);
        this.heroInformationTextField.text = this.heroInformationText;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
var EquipmentInformationPanel = (function (_super) {
    __extends(EquipmentInformationPanel, _super);
    function EquipmentInformationPanel() {
        _super.call(this);
        this.width = 250;
        this.height = 250;
        this.backGround = new egret.Bitmap();
        this.backGround.texture = RES.getRes("Detailbg_png");
        this.backGround.width = 250;
        this.backGround.height = 250;
        this.addChild(this.backGround);
        this.backGround.x = 0;
        this.backGround.y = 90;
        this.backGround.alpha = 0.6;
        this.equipmentIconPicture = new egret.Bitmap();
        this.equipmentIconPicture.width = 60;
        this.equipmentIconPicture.height = 60;
        this.addChild(this.equipmentIconPicture);
        this.equipmentIconPicture.x = 30;
        this.equipmentIconPicture.y = 120;
        this.nameText = new egret.TextField();
        this.nameText.width = 200;
        this.nameText.height = 50;
        this.addChild(this.nameText);
        this.nameText.size = 24;
        this.nameText.x = 30;
        this.nameText.y = this.equipmentIconPicture.y + this.equipmentIconPicture.height + 10;
        this.propertiesText = new egret.TextField();
        this.propertiesText.width = 200;
        this.propertiesText.height = 300;
        this.addChild(this.propertiesText);
        this.propertiesText.textColor = 0xffffff;
        this.propertiesText.size = 20;
        this.propertiesText.x = 30;
        this.propertiesText.y = this.nameText.y + 35;
    }
    var d = __define,c=EquipmentInformationPanel,p=c.prototype;
    p.showEquipmentInformation = function (equipment) {
        this.nameText.text = equipment.equipmentName;
        this.equipmentIconPicture.texture = RES.getRes(equipment.equipmentPictureID);
        var information = "";
        for (var i = 0; i < equipment.properties.length; i++) {
            information = information + equipment.properties[i].name + " : " + equipment.properties[i].value.toFixed(0) + "\n" + "\n";
        }
        //information = information + equipment.properties[0].name + " : " + equipment.properties[0].value.toFixed(0) + "\n" + "\n" + "\n";
        this.propertiesText.text = information;
    };
    return EquipmentInformationPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(EquipmentInformationPanel,'EquipmentInformationPanel');
//# sourceMappingURL=UserPanel.js.map
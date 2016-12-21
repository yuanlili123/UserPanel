var Cache: MethodDecorator = (target : any,propertyKey,descriptor : PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function(){
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
}

class User{
    currentExp : number = 0;
    totalExp : number = 0;
    level : number = 1;
    gold : number = 0;
    heroes : Hero[] = [];
    heroesInTeam:Hero[] = [];
    userName : string = "";

    constructor(currentExp : number, totalExp : number, level : number, gold : number, userName : string){
        this.currentExp = currentExp;
        this.totalExp = totalExp;
        this.level = level;
        this.gold = gold;
        this.userName = userName;
    }

    @Cache
    getTotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

    public addHero(hero : Hero){
        this.heroes.push(hero);
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.heroesInTeam.forEach(hero => result += hero.getFightPower());
        return result;
    }
}
enum WeaponsType {
    katana = 1,
    sword = 1,
    halberd = 2,
    gun = 3
}

enum ArmorsType{
    helment = 1,
    lightarmor = 2,
    shoes = 3,
    armour = 4,
    heavyarmor = 5,
}

enum equipmentQuality{
    green = 1,
    blue = 2,
    purple = 3,
    gold = 4
}

enum JewelPromote{
    attackpromote = 1,
    defencepromote = 2,
    speedpromot = 3,
}

enum jewelLevel{
    one = 1,
    two = 2,
    three = 3
}

class Hero{
    heroID : string;
    isInTeam : boolean = false;
    heroName : string = "";
    maxHp = 0;
    currentHp = 0;
    attack = 0;    
    defence = 0;
    level = 1;
    speed = 0;
    currentExp = 0;
    totalExp = 0;
    weaponsEquipment : Weapon[] = [];
    armorEquipment : Armor[] = [];
    properties : Property[] = [];
    heroPictureID : string;

    constructor(heroID : string, heroPictureID : string, heroName : string, maxHp : number, currentHp : number,attack : number, defence : number, level : number, speed : number, currentExp : number, totalExp : number){
        this.heroID = heroID;
        this.heroPictureID = heroPictureID;
        this.heroName = heroName;
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.attack = attack;
        this.defence = defence;
        this.level = level;
        this.speed = speed;
        this.currentExp = currentExp;
        this.totalExp = totalExp;
    }

    @Cache
    getMaxHp(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getFightPower() * 0.3);
        this.armorEquipment.forEach(armor => result += armor.getFightPower() * 0.8);
        result += this.level * 100;
        this.properties[0]=new Property("最大生命值",result,false);
        return result;
    }

    @Cache
     getTotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

     public addWeapon(weapon : Weapon){
       this.weaponsEquipment[0] = weapon;
    }

    public addHelment(helment : Armor){
       this.armorEquipment[0] = helment;
    }

    public addLightarmor(lightarmor : Armor){
       this.armorEquipment[1] = lightarmor;
    }

    public addShoes(shoes : Armor){
        this.armorEquipment[2] = shoes;
    }

    @Cache
    getAttack(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getAttack() * 0.8);
        result += this.level * 10;
        this.properties[1]=new Property("攻击力",result,false);
        return result;
    }

    @Cache
    getDefence(){
        var result = 0;
        this.armorEquipment.forEach(armor => result += armor.getDefence() * 0.6);
        result += this.level * 2;
        this.properties[2]=new Property("防御力",result,false);
        return result;
    }

    @Cache
    getSpeed(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getSpeed() * 0.4);
        this.armorEquipment.forEach(armor => result += armor.getSpeed() * 0.4);
        result += this.level * 5;
        this.properties[3]=new Property("速度",result,false);
        return result;
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getFightPower());
        this.armorEquipment.forEach(armor => result += armor.getFightPower());
        result += (this.getAttack() * 10 + this.getDefence() * 8 + this.getSpeed() * 6) * this.level;
        return result;
    }
}

class Equipment{
    equipmentID :string;
    quality = equipmentQuality;
    currentExp = 0;
    isWeapon = false;
    equipmentName : string = "";
    jewelsEquipment : Jewel[] = [];
    equipmentPictureID : string;
    properties : Property[] = [];

    constructor(currentExp : number, equipmentName : string){
        this.currentExp = currentExp;
        this.equipmentName = equipmentName;
    }

    get attackBoost(){
        return 0;
    }

    @Cache
    getFightPower(){
        return 0;
    }

    public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
    }
}

class Weapon extends Equipment{
     static weaponNum = 0;
     weaponID : string;
     isWeapon = true;
     weaponType = 0;

     constructor(equipmentID :string, weaponNameId : string, currentExp : number, equipmentName : string, weaponType : WeaponsType){
         super(currentExp, equipmentName);
         this.equipmentID = equipmentID;
         this.equipmentPictureID = weaponNameId;
         this.weaponID = Weapon.weaponNum.toString();
         this.weaponType = weaponType;
         Weapon.weaponNum++;
     }

     @Cache
     getAttack(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.8 * jewel.level);
         result += 10 * this.weaponType; 
         this.properties[0]=new Property("攻击力",result,false);
         return result;
     }

     @Cache
     getSpeed(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.8 * jewel.level / this.weaponType);
         this.properties[1]=new Property("速度",result,false);
         return result;
     }

     //@Cache
     get attackBoost(){
        var result = 0;
        this.jewelsEquipment.forEach(e => result += e.attackBoost);
        return result;//
     }

     @Cache
     getFightPower(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower());
         result += this.getAttack() * 10 + this.getSpeed() * 5;
         return result;
     }

     getEquipmentInformations(){
         this.getAttack();
         this.getSpeed();
         //this.attackBoost();
     }

     public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
     }
}

class Armor extends Equipment{
     static armorNum = 0;
     armorID : string;
     isWeapon = false;
     armorType = 0;

     constructor(equipmentID : string, armorNameId : string, currentExp : number, equipmentName : string, armorType : ArmorsType){
         super(currentExp, equipmentName);
         this.equipmentID = equipmentID;
         this.equipmentPictureID = armorNameId;
         this.armorID = Armor.armorNum.toString();
         Armor.armorNum++;
         this.armorType = armorType;
     }

     @Cache
     getDefence(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.4 * jewel.level);
         result += 2 * this.armorType; 
         this.properties[0]=new Property("防御力",result,false);
         return result;
     }

     @Cache
     getSpeed(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.4 * jewel.level / this.armorType);
         this.properties[1]=new Property("速度",result,false);
         return result;
     }

    @Cache
     getFightPower(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower());
         result += this.getDefence() * 10 + this.getSpeed() * 5;
         return result;
     }

     getEquipmentInformations(){
         this.getDefence();
         this.getSpeed();
     }

     public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
    }
}

class Jewel{
    //quality  = 0;
    level : jewelLevel;
    defencePromote = 0;
    speedPromote = 0
    attackBoost = 0;
    //promotionType = 0;

    constructor(level : jewelLevel, defencePromote : number, attackBoost : number, speedPromote : number){
        this.level = level;
        this.defencePromote = defencePromote;
        this.speedPromote = speedPromote;
        this.attackBoost = attackBoost;
    }

    get DefencePromote(){

        return this.defencePromote * this.level * 0.2;
    }

    get SpeedPromote(){

        return this.speedPromote * this.level * 0.3;
    }

    get AttackBoost(){

        return this.attackBoost * this.level * 0.5;
    }

    @Cache
    getFightPower(){
        var result = 0;
        result = this.DefencePromote * 3 + this.AttackBoost * 5 + this.SpeedPromote * 2;
        return result;
    }
}


class Properties{
    public all:string[] = [
        "攻击力",
        "防御力",
        "速度"
    ]

    public getpropertiesName(){

    }
}


class Property{
    name : string;
    value : number;
    isRate : boolean;
    constructor(name : string, value : number,isRate:boolean){
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }

    getDescription(){
        if(this.isRate){
            return this.name + ": +" +(this.value / 10).toFixed(2) + "%";
        }else{
            return this.name + ": +" + this.value;
        }
    }
}
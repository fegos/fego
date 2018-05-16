'use strict';

exports.__esModule = true;
/**
 * 常用的校验
 * 1. 正则表达式
 * 2. 校验函数
 */
var simplePassword = ['123456', '123456789', '12345678', '123123', '5201314', '1234567', '7758521', '654321', '1314520', '123321', '1234567890', '147258369', '123654', '5211314', 'woaini', '1230123', '987654321', '147258', '123123123', '7758258', '520520', '789456', '456789', '159357', '112233', '1314521', '456123', '110110', '521521', 'zxcvbnm', '789456123', '0123456789', '0123456', '123465', '159753', 'qwertyuiop', '987654', '115415', '1234560', '123000', '123789', '100200', '963852741', '121212', '111222', '123654789', '12301230', '456456', '741852963', 'asdasd', 'asdfghjkl', '369258', '863786', '258369', '8718693', '666888', '5845201314', '741852', '168168', 'iloveyou', '852963', '4655321', '102030', '147852369', '321321'],

/**
 * 密码强度检查函数
 * level级别
 * 0    不符合基本的长度要求
 * 1    仅满足长度要求
 * 2    包含两类字符
 * 3    包含三类字符（数字、字母、特殊字符）
 */
getPswLevel = function getPswLevel(psw) {
	var level = 0;
	psw = (psw || "") + "";
	//长度判断
	if (psw.length < 6) {
		return level;
	}
	//字符混淆判断
	/[a-zA-Z]+/.test(psw) && level++;
	/\d+/.test(psw) && level++;
	/[^a-zA-Z\d]+/.test(psw) && level++;
	return level;
};
exports.default = {
	phone: /^1\d{10}$/,
	/*
    * 是否是手机号码
    */
	isPhone: function isPhone(phone) {
		return this.phone.test(phone);
	},
	cnName: /^[\u0391-\uFFE5]{1}[\u0391-\uFFE5|·]{0,18}[\u0391-\uFFE5\·]{1}$/,
	/*
  * 是否是中文姓名
  */
	isCnName: function isCnName(name) {
		return this.cnName.test(name);
	},
	mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	simpleMail: /^.+@.+$/,
	/*
  * 是否是电子邮件
  */
	isMail: function isMail(mail) {
		return this.mail.test(mail);
	},
	qq: /^[1-9][0-9]{4,}$/,
	/*
  * 是否QQ号码
  */
	isQQ: function isQQ(qq) {
		return this.qq.test(qq);
	},
	/*
  * 是否是闰年
  */
	isLeapYear: function isLeapYear(year) {
		var year = +year;
		return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0);
	},
	/*
  * 是否是身份证号
  */
	isIDcard: function isIDcard(id) {
		//先转化为小写字符串
		id = (id + "").toLowerCase();
		//长度校验
		if (!/^\d{17}(?:\d|x)$/i.test(id) && !/^\d{15}$/.test(id)) {
			return false;
		}
		//城市校验
		var citys = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91".split(","),
		    myCity = id.substr(0, 2),
		    len = id.length,
		    inKnownCity = false;
		for (var i = 0, n = citys.length; i < n; i++) {
			if (myCity === citys[i]) {
				inKnownCity = true;
				break;
			}
		}
		if (!inKnownCity) {
			return false;
		}
		//生日校验
		var info = len == 18 ? [id.substr(6, 4), +id.substr(10, 2), +id.substr(12, 2)] : ["19" + id.substr(6, 2), +id.substr(8, 2), +id.substr(10, 2)],
		    birthday = new Date(info.join("/")),
		    birthStr = [birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate()].join("");
		if (info.join("") !== birthStr) {
			return false;
		}
		//机器码校验
		if (len == 18) {
			id = id.replace(/x$/i, "a");
			var iSum = 0,
			    i = 17;
			for (; i >= 0; i--) {
				iSum += Math.pow(2, i) % 11 * parseInt(id.charAt(17 - i), 11);
			}
			if (iSum % 11 != 1) {
				return false;
			}
		}
		return true;
	},
	isSimplePassword: function isSimplePassword(psw) {
		var isSimple = false;
		psw = psw + "";
		for (var i = 0, n = simplePassword.length; i < n; i++) {
			if (simplePassword[i] === psw) {
				return tisSimple = true;
			}
		}
		return isSimple;
	},
	isOKPassword: function isOKPassword(psw, baseLevel) {
		var ref = baseLevel === undefined ? 3 : +baseLevel;
		return getPswLevel(psw) >= ref;
	},
	getPasswordLevel: function getPasswordLevel(psw) {
		return getPswLevel(psw);
	}
};
# JS 校验工具集合  #
---

### API

```js
Verify.isQQ( qq );
Verify.isIDcard( id );
Verify.isCnName( cnName );
Verify.isPhone( phone );
Verify.isMail( mail [,loose] )
Verify.isLeapYear( year );
```

## password
此外，还包括对密码以及等级进行校验。密码等级设计为：

- 0 不符合基本的长度要求(>=6)
- 1 仅满足长度要求并仅有一类字符
- 2 包含两类字符
- 3 包含三类字符（数字、字母、特殊字符）

```js
Verify.isSimplePassword( psw );
Verify.isOKPassword( psw [,baseLevel] );
Verify.getPasswordLevel( psw );
```


